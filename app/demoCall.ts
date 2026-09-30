/**
 * Lógica de la línea de demo que no depende de React: mensajes, errores y el
 * pedido del micrófono. Vive en un `.ts` para poder probarla con `node --test`
 * (el runner no compila JSX) — mismo patrón que `contact.ts` / `ContactForm.tsx`.
 *
 * Regla: la persona NUNCA ve texto crudo del SDK de voz ni del navegador
 * («Error starting call», «Permission denied»). Todo error se traduce a una
 * frase en español que dice qué hacer; si no se reconoce, va la frase genérica.
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

/** Mensaje humano que devolvió la API de MEHI (ya viene en español): se muestra tal cual. */
export class DemoCallApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DemoCallApiError";
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
export function describeDemoCallError(error: unknown): string {
  if (error instanceof DemoCallApiError) {
    return error.message.trim() || DEMO_CALL_MESSAGES.generic;
  }
  if (error instanceof MicrophoneUnsupportedError) {
    return DEMO_CALL_MESSAGES.micUnsupported;
  }
  const text = errorText(error);
  if (/NotAllowedError|PermissionDeniedError|SecurityError|Permission denied|permission dismissed/i.test(text)) {
    return DEMO_CALL_MESSAGES.micDenied;
  }
  if (/NotFoundError|DevicesNotFoundError|OverconstrainedError|device not found/i.test(text)) {
    return DEMO_CALL_MESSAGES.micMissing;
  }
  if (/NotReadableError|TrackStartError|AbortError|Could not start audio source/i.test(text)) {
    return DEMO_CALL_MESSAGES.micBusy;
  }
  return DEMO_CALL_MESSAGES.generic;
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
