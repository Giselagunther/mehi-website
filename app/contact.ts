export type ContactFormPayload = {
  full_name: string;
  organization: string;
  job_title: string;
  email: string;
  operation: string;
  website: string;
};

export type ContactFormField = Exclude<keyof ContactFormPayload, "website">;

export const CONTACT_FORM_LIMITS = {
  full_name: { minLength: 2, maxLength: 120 },
  organization: { minLength: 2, maxLength: 160 },
  job_title: { minLength: 2, maxLength: 120 },
  email: { minLength: 5, maxLength: 254 },
  operation: { minLength: 10, maxLength: 2000 },
} as const;

const CONTACT_FIELD_ERRORS: Record<ContactFormField, string> = {
  full_name: "Escribí al menos 2 caracteres en Nombre y apellido.",
  organization: "Escribí al menos 2 caracteres en Organización.",
  job_title: "Escribí al menos 2 caracteres en Cargo.",
  email: "Revisá que el correo esté completo y sea válido.",
  operation: "Contanos la operación que querés mejorar en al menos 10 caracteres.",
};

const CONTACT_FIELD_LABELS: Record<ContactFormField, string> = {
  full_name: "Nombre y apellido",
  organization: "Organización",
  job_title: "Cargo",
  email: "Correo",
  operation: "Operación que querés mejorar",
};

const DEFAULT_CONTACT_ERROR =
  "No pudimos enviar la solicitud. Intentá nuevamente en unos minutos.";
const CONTACT_TIMEOUT_MS = 30_000;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export class ContactSubmissionError extends Error {
  readonly field?: ContactFormField;

  constructor(message: string, field?: ContactFormField) {
    super(message);
    this.name = "ContactSubmissionError";
    this.field = field;
  }
}

function isContactFormField(value: unknown): value is ContactFormField {
  return typeof value === "string" && value in CONTACT_FORM_LIMITS;
}

export function validateContactFormPayload(
  payload: ContactFormPayload,
): ContactSubmissionError | undefined {
  const orderedFields: ContactFormField[] = [
    "full_name",
    "organization",
    "job_title",
    "email",
    "operation",
  ];

  for (const field of orderedFields) {
    const value = payload[field];
    const limits = CONTACT_FORM_LIMITS[field];
    if (value.length < limits.minLength || value.length > limits.maxLength) {
      return new ContactSubmissionError(CONTACT_FIELD_ERRORS[field], field);
    }
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return new ContactSubmissionError(CONTACT_FIELD_ERRORS.email, "email");
  }

  return undefined;
}

async function responseError(response: Response): Promise<ContactSubmissionError> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return new ContactSubmissionError(DEFAULT_CONTACT_ERROR);
  }

  if (!body || typeof body !== "object" || !("detail" in body)) {
    return new ContactSubmissionError(DEFAULT_CONTACT_ERROR);
  }

  const detail = body.detail;
  if (typeof detail === "string" && detail.trim()) {
    return new ContactSubmissionError(detail);
  }

  if (Array.isArray(detail)) {
    const firstIssue = detail
      .map((item) => {
        if (!item || typeof item !== "object" || !("loc" in item)) return undefined;
        const location = item.loc;
        const field = Array.isArray(location) ? location.at(-1) : undefined;
        if (!isContactFormField(field)) return undefined;

        const context = "ctx" in item ? item.ctx : undefined;
        const minLength =
          context &&
          typeof context === "object" &&
          "min_length" in context &&
          typeof context.min_length === "number"
            ? context.min_length
            : undefined;
        return { field, minLength };
      })
      .find(Boolean);

    if (firstIssue) {
      const message = firstIssue.minLength
        ? `Escribí al menos ${firstIssue.minLength} caracteres en ${CONTACT_FIELD_LABELS[firstIssue.field]}.`
        : CONTACT_FIELD_ERRORS[firstIssue.field];
      return new ContactSubmissionError(
        message,
        firstIssue.field,
      );
    }
  }

  return new ContactSubmissionError(DEFAULT_CONTACT_ERROR);
}

export const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://api.mehi.ar/api/v1/public/contact"
    : "http://127.0.0.1:8000/api/v1/public/contact");

export async function submitContactForm(
  payload: ContactFormPayload,
  fetcher: typeof fetch = fetch,
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(
    () => controller.abort(),
    CONTACT_TIMEOUT_MS,
  );

  try {
    const response = await fetcher(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw await responseError(response);
    }
    const data = (await response.json()) as { message?: unknown };
    return typeof data.message === "string"
      ? data.message
      : "Gracias. Recibimos tu solicitud y te vamos a contactar.";
  } catch (error) {
    if (error instanceof ContactSubmissionError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new ContactSubmissionError(
        "La solicitud tardó más de lo esperado. Intentá nuevamente.",
      );
    }
    throw new ContactSubmissionError(DEFAULT_CONTACT_ERROR);
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}
