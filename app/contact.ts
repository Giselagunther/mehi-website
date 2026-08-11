export type ContactFormPayload = {
  full_name: string;
  organization: string;
  job_title: string;
  email: string;
  operation: string;
  website: string;
};

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
  const timeoutId = window.setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetcher(CONTACT_FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error("contact_delivery_failed");
    }
    const data = (await response.json()) as { message?: unknown };
    return typeof data.message === "string"
      ? data.message
      : "Gracias. Recibimos tu solicitud y te vamos a contactar.";
  } finally {
    window.clearTimeout(timeoutId);
  }
}
