"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mic, PhoneOff } from "lucide-react";

type Phase = "idle" | "connecting" | "live" | "ended" | "error";

type DemoCallConnection = {
  access_token: string;
  call_id?: string;
  transport?: string;
  ice_servers?: unknown;
};

type VoiceClient = {
  on(event: string, handler: (...args: unknown[]) => void): void;
  startCall(options: Record<string, unknown>): Promise<void>;
  stopCall(): void;
};

export const DEMO_CALL_ENDPOINT =
  process.env.NEXT_PUBLIC_DEMO_CALL_API_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://api.mehi.ar/api/v1/public/demo-call"
    : "http://127.0.0.1:8000/api/v1/public/demo-call");

const GENERIC_ERROR =
  "No pudimos iniciar la conversación. Probá de nuevo en unos minutos.";

function describeError(error: unknown): string {
  const text = error instanceof Error ? error.message : String(error ?? "");
  if (/NotAllowed|Permission|permiso|denied|micr/i.test(text)) {
    return "Necesitamos permiso para usar el micrófono. Revisá el candado del navegador y volvé a intentar.";
  }
  return text.trim() || GENERIC_ERROR;
}

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function DemoCall({ phone }: { phone?: string }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [agentTalking, setAgentTalking] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const clientRef = useRef<VoiceClient | null>(null);

  useEffect(() => {
    if (phase !== "live") return;
    const id = globalThis.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => globalThis.clearInterval(id);
  }, [phase]);

  useEffect(() => {
    return () => {
      clientRef.current?.stopCall();
    };
  }, []);

  async function start() {
    setErrorMessage("");
    setSeconds(0);
    setAgentTalking(false);
    setPhase("connecting");
    try {
      const response = await fetch(DEMO_CALL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { detail?: unknown };
        throw new Error(typeof body.detail === "string" ? body.detail : GENERIC_ERROR);
      }
      const connection = (await response.json()) as DemoCallConnection;
      const { RetellWebClient } = await import("retell-client-js-sdk");
      const client = new RetellWebClient() as unknown as VoiceClient;
      clientRef.current = client;
      client.on("call_started", () => setPhase("live"));
      client.on("call_ended", () => {
        setAgentTalking(false);
        setPhase((current) => (current === "error" ? current : "ended"));
      });
      client.on("agent_start_talking", () => setAgentTalking(true));
      client.on("agent_stop_talking", () => setAgentTalking(false));
      client.on("error", (error) => {
        setErrorMessage(describeError(error));
        setPhase("error");
        client.stopCall();
      });
      await client.startCall({
        accessToken: connection.access_token,
        callId: connection.call_id,
        ...(connection.transport ? { transport: connection.transport } : {}),
        ...(connection.ice_servers ? { iceServers: connection.ice_servers } : {}),
      });
    } catch (error) {
      setErrorMessage(describeError(error));
      setPhase("error");
    }
  }

  function stop() {
    clientRef.current?.stopCall();
    setAgentTalking(false);
    setPhase("ended");
  }

  const live = phase === "live";
  const connecting = phase === "connecting";

  return (
    <div
      data-testid="demo-call"
      className="rounded-md border border-mehi-border bg-white p-6 sm:p-8"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <button
          type="button"
          onClick={live ? stop : start}
          disabled={connecting}
          aria-live="polite"
          className={
            live
              ? "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-mehi-border bg-white px-6 py-3 text-sm font-semibold text-mehi-text transition-colors hover:border-mehi-slate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4"
              : "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-60"
          }
        >
          {live ? (
            <PhoneOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Mic className="h-4 w-4" aria-hidden="true" />
          )}
          {live
            ? "Terminar la conversación"
            : connecting
              ? "Conectando..."
              : phase === "ended"
                ? "Hablar de nuevo"
                : "Hablá con MEHI ahora"}
        </button>

        {live && (
          <div className="flex items-center gap-3 text-sm font-medium text-mehi-text">
            <span
              className={
                agentTalking
                  ? "h-3 w-3 animate-pulse rounded-full bg-mehi-plum"
                  : "h-3 w-3 rounded-full bg-mehi-slate"
              }
              aria-hidden="true"
            />
            {agentTalking ? "MEHI está hablando" : "MEHI te escucha"}
            <span className="tabular-nums text-mehi-text-secondary">
              {formatSeconds(seconds)}
            </span>
          </div>
        )}

        {phase === "ended" && (
          <p role="status" className="max-w-md text-sm leading-6 text-mehi-text-secondary">
            Gracias por probar. Si querés que el equipo te contacte, dejá tus
            datos abajo o pedíselos a MEHI en la próxima conversación.
          </p>
        )}

        {phase === "error" && (
          <p role="alert" className="max-w-md rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        )}

        {phone && (
          <p className="text-sm text-mehi-text-secondary">
            ¿Preferís llamar por teléfono?{" "}
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="font-semibold text-mehi-text underline decoration-mehi-lavender underline-offset-4"
            >
              {phone}
            </a>
          </p>
        )}

        <p className="max-w-md text-xs leading-5 text-mehi-text-secondary">
          Es una línea de demostración, no una línea de atención real. La
          conversación queda registrada para poder responderte.
        </p>

        {phase === "ended" && (
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mehi-text"
          >
            Quiero que me contacten
            <ArrowRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
