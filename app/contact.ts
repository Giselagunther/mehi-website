export type ContactFormPayload = {
  full_name: string;
  organization: string;
  job_title: string;
  email: string;
  operation: string;
  website: string;
};

export type ContactFormField = Exclude<keyof ContactFormPayload, "website">;

// Los mínimos rigen cuando el campo viene con contenido; los opcionales pueden
// ir vacíos (formulario corto: nombre, organización y correo alcanzan).
export const CONTACT_FORM_LIMITS = {
  full_name: { minLength: 2, maxLength: 120, optional: false },
  organization: { minLength: 2, maxLength: 160, optional: false },
  job_title: { minLength: 2, maxLength: 120, optional: true },
  email: { minLength: 5, maxLength: 254, optional: false },
  operation: { minLength: 10, maxLength: 2000, optional: true },
} as const;

type ContactLocale = "es" | "en";

const CONTACT_FIELD_ERRORS: Record<ContactLocale, Record<ContactFormField, string>> = {
  es: {
    full_name: "Escribí al menos 2 caracteres en Nombre y apellido.",
    organization: "Escribí al menos 2 caracteres en Organización.",
    job_title: "Escribí al menos 2 caracteres en Cargo.",
    email: "Revisá que el correo esté completo y sea válido.",
    operation: "Si nos contás qué querés mejorar, escribí al menos 10 caracteres.",
  },
  en: {
    full_name: "Enter at least 2 characters in Full name.",
    organization: "Enter at least 2 characters in Organization.",
    job_title: "Enter at least 2 characters in Job title.",
    email: "Check that the email address is complete and valid.",
    operation: "If you tell us what you want to improve, write at least 10 characters.",
  },
};

const CONTACT_FIELD_LABELS: Record<ContactLocale, Record<ContactFormField, string>> = {
  es: {
    full_name: "Nombre y apellido",
    organization: "Organización",
    job_title: "Cargo",
    email: "Correo",
    operation: "Operación que querés mejorar",
  },
  en: {
    full_name: "Full name",
    organization: "Organization",
    job_title: "Job title",
    email: "Email",
    operation: "Operation you want to improve",
  },
};

const CONTACT_MESSAGES: Record<
  ContactLocale,
  { failed: string; timeout: string; tooMany: string; success: string }
> = {
  es: {
    failed: "No pudimos enviar la solicitud. Intentá nuevamente en unos minutos.",
    timeout: "La solicitud tardó más de lo esperado. Intentá nuevamente.",
    tooMany: "Recibimos varios intentos. Esperá unos minutos y volvé a probar.",
    success: "Gracias. Recibimos tu solicitud y te vamos a contactar.",
  },
  en: {
    failed: "We couldn't send your request. Please try again in a few minutes.",
    timeout: "The request took longer than expected. Please try again.",
    tooMany: "We received several attempts. Please wait a few minutes and try again.",
    success: "Thank you. We received your request and will be in touch.",
  },
};

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
  locale: ContactLocale = "es",
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
    if (limits.optional && value.length === 0) continue;
    if (value.length < limits.minLength || value.length > limits.maxLength) {
      return new ContactSubmissionError(CONTACT_FIELD_ERRORS[locale][field], field);
    }
  }

  if (!EMAIL_PATTERN.test(payload.email)) {
    return new ContactSubmissionError(CONTACT_FIELD_ERRORS[locale].email, "email");
  }

  return undefined;
}

async function responseError(
  response: Response,
  locale: ContactLocale,
): Promise<ContactSubmissionError> {
  const messages = CONTACT_MESSAGES[locale];
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return new ContactSubmissionError(messages.failed);
  }

  if (!body || typeof body !== "object" || !("detail" in body)) {
    return new ContactSubmissionError(messages.failed);
  }

  const detail = body.detail;
  if (typeof detail === "string" && detail.trim()) {
    // El backend redacta sus mensajes en español: en inglés se usa el equivalente
    // según el código de respuesta, nunca el texto en otro idioma.
    if (locale === "es") return new ContactSubmissionError(detail);
    return new ContactSubmissionError(
      response.status === 429 ? messages.tooMany : messages.failed,
    );
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
        ? locale === "en"
          ? `Enter at least ${firstIssue.minLength} characters in ${CONTACT_FIELD_LABELS.en[firstIssue.field]}.`
          : `Escribí al menos ${firstIssue.minLength} caracteres en ${CONTACT_FIELD_LABELS.es[firstIssue.field]}.`
        : CONTACT_FIELD_ERRORS[locale][firstIssue.field];
      return new ContactSubmissionError(
        message,
        firstIssue.field,
      );
    }
  }

  return new ContactSubmissionError(messages.failed);
}

export const CONTACT_FORM_ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://api.mehi.ar/api/v1/public/contact"
    : "http://127.0.0.1:8000/api/v1/public/contact");

export async function submitContactForm(
  payload: ContactFormPayload,
  fetcher: typeof fetch = fetch,
  locale: ContactLocale = "es",
): Promise<string> {
  const messages = CONTACT_MESSAGES[locale];
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
      throw await responseError(response, locale);
    }
    const data = (await response.json()) as { message?: unknown };
    return locale === "es" && typeof data.message === "string"
      ? data.message
      : messages.success;
  } catch (error) {
    if (error instanceof ContactSubmissionError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new ContactSubmissionError(messages.timeout);
    }
    throw new ContactSubmissionError(messages.failed);
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}
