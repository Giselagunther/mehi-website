/**
 * Lógica de la línea de demo que no depende de React: mensajes, errores y el
 * pedido del micrófono. Vive en un `.ts` para poder probarla con `node --test`
 * (el runner no compila JSX) — mismo patrón que `contact.ts` / `ContactForm.tsx`.
 *
 * Regla: la persona NUNCA ve texto crudo del SDK de voz ni del navegador
 * («Error starting call», «Permission denied»). Todo error se traduce a una
 * frase en el idioma de la página que dice qué hacer; si no se reconoce, va la
 * frase genérica.
 */

export const DEMO_CALL_ENDPOINT =
  process.env.NEXT_PUBLIC_DEMO_CALL_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://api.mehi.ar/api/v1/public/demo-call"
    : "http://127.0.0.1:8000/api/v1/public/demo-call");

export const DEMO_CALL_MESSAGES = {
  generic: "No pudimos iniciar la conversación. Probá de nuevo en unos minutos.",
  micDenied:
    "Necesitamos permiso para usar el micrófono. Revisá el candado del navegador y volvé a intentar.",
  micMissing:
    "No encontramos un micrófono en este dispositivo. Conectá uno o probá desde el celular.",
  micBusy:
    "El micrófono está en uso por otra aplicación. Cerrala y volvé a intentar.",
  micUnsupported:
    "Este navegador no permite usar el micrófono acá. Probá con Chrome, Safari o Firefox actualizados.",
} as const;

export const DEMO_CALL_MESSAGES_EN: Record<keyof typeof DEMO_CALL_MESSAGES | "busy" | "unavailable", string> = {
  generic: "We couldn't start the conversation. Please try again in a few minutes.",
  micDenied:
    "We need permission to use your microphone. Check the padlock icon in your browser and try again.",
  micMissing:
    "We couldn't find a microphone on this device. Connect one or try from your phone.",
  micBusy:
    "Your microphone is being used by another app. Close it and try again.",
  micUnsupported:
    "This browser doesn't allow microphone access here. Try an up-to-date Chrome, Safari or Firefox.",
  busy: "The demo line is very busy right now. Please try again in a few minutes.",
  unavailable:
    "The demo line isn't available right now. Leave your details below and we'll contact you.",
};

export type DemoCallLocale = "es" | "en";

/**
 * Mensaje humano que devolvió la API de MEHI. Viene en español: en la página en
 * español se muestra tal cual; en inglés se elige el equivalente por `status`.
 */
export class DemoCallApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "DemoCallApiError";
    this.status = status;
  }
}

/** El navegador no expone `getUserMedia` (contexto inseguro, navegador viejo o embebido). */
export class MicrophoneUnsupportedError extends Error {
  constructor() {
    super("El navegador no expone el micrófono");
    this.name = "MicrophoneUnsupportedError";
  }
}

type MediaDevicesLike = {
  getUserMedia?: (constraints: { audio: boolean }) => Promise<{
    getTracks(): Array<{ stop(): void }>;
  }>;
};

function errorText(error: unknown): string {
  if (error instanceof Error) return `${error.name} ${error.message}`;
  if (error && typeof error === "object") {
    const { name, message } = error as { name?: unknown; message?: unknown };
    return `${String(name ?? "")} ${String(message ?? "")}`;
  }
  return String(error ?? "");
}

/**
 * Traduce cualquier error del arranque de la conversación a una frase para la persona.
 * Los nombres (`NotAllowedError`, `NotFoundError`, …) son los que define el estándar de
 * `getUserMedia`; se reconocen por nombre y por las frases típicas de cada navegador.
 */
export function describeDemoCallError(error: unknown, locale: DemoCallLocale = "es"): string {
  const messages = locale === "en" ? DEMO_CALL_MESSAGES_EN : DEMO_CALL_MESSAGES;
  if (error instanceof DemoCallApiError) {
    if (locale === "en") {
      if (error.status === 429) return DEMO_CALL_MESSAGES_EN.busy;
      if (error.status === 503) return DEMO_CALL_MESSAGES_EN.unavailable;
      return messages.generic;
    }
    return error.message.trim() || messages.generic;
  }
  if (error instanceof MicrophoneUnsupportedError) {
    return messages.micUnsupported;
  }
  const text = errorText(error);
  if (/NotAllowedError|PermissionDeniedError|SecurityError|Permission denied|permission dismissed/i.test(text)) {
    return messages.micDenied;
  }
  if (/NotFoundError|DevicesNotFoundError|OverconstrainedError|device not found/i.test(text)) {
    return messages.micMissing;
  }
  if (/NotReadableError|TrackStartError|AbortError|Could not start audio source/i.test(text)) {
    return messages.micBusy;
  }
  return messages.generic;
}

/**
 * Pide el micrófono ANTES de crear la llamada: si la persona lo niega, no se registra
 * ninguna llamada en el motor de voz ni se consume el cupo del visitante. Suelta las
 * pistas enseguida; el cliente de voz vuelve a tomar el micrófono cuando arranca.
 */
export async function requestMicrophone(
  mediaDevices: MediaDevicesLike | undefined = globalThis.navigator?.mediaDevices,
): Promise<void> {
  if (!mediaDevices || typeof mediaDevices.getUserMedia !== "function") {
    throw new MicrophoneUnsupportedError();
  }
  const stream = await mediaDevices.getUserMedia({ audio: true });
  for (const track of stream.getTracks()) {
    track.stop();
  }
}
