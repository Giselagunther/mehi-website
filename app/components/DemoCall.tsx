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

import {
  DEMO_CALL_ENDPOINT,
  DEMO_CALL_MESSAGES,
  DemoCallApiError,
  describeDemoCallError,
  requestMicrophone,
} from "../demoCall";
import { ui, type Locale } from "../ui-text";

export { DEMO_CALL_ENDPOINT };

function formatSeconds(total: number): string {
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function DemoCall({ phone, locale }: { phone?: string; locale: Locale }) {
  const t = ui[locale].demo;
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
      // Primero el micrófono: si la persona lo niega, no se crea ninguna llamada
      // (ni en el motor de voz ni contra el cupo del visitante) y el mensaje dice
      // exactamente qué pasó. El SDK, en cambio, sólo avisa «Error starting call».
      await requestMicrophone();
      const response = await fetch(DEMO_CALL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { detail?: unknown };
        throw new DemoCallApiError(
          typeof body.detail === "string" ? body.detail : DEMO_CALL_MESSAGES.generic,
          response.status,
        );
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
        setErrorMessage(describeDemoCallError(error, locale));
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
      setErrorMessage(describeDemoCallError(error, locale));
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
        {/* Las ondas de la voz de MEHI, como en el video. Decorativas. */}
        <div
          aria-hidden="true"
          className="relative flex h-28 w-28 items-center justify-center"
        >
          <span
            className={`absolute inset-0 rounded-full border border-mehi-lavender ${live && agentTalking ? "animate-pulse" : ""}`}
          />
          <span className="absolute inset-3 rounded-full border border-mehi-slate/40" />
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mehi-neutral text-mehi-plum">
            <Mic className="h-6 w-6" />
          </span>
        </div>

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
            ? t.stop
            : connecting
              ? t.connecting
              : phase === "ended"
                ? t.again
                : t.start}
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
            {agentTalking ? t.agentTalking : t.agentListening}
            <span className="tabular-nums text-mehi-text-secondary">
              {formatSeconds(seconds)}
            </span>
          </div>
        )}

        {phase === "ended" && (
          <p role="status" className="max-w-md text-sm leading-6 text-mehi-text-secondary">
            {t.thanks}
          </p>
        )}

        {phase === "error" && (
          <p role="alert" className="max-w-md rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        )}

        {phase !== "live" && (
          <div className="w-full max-w-md border-t border-mehi-border pt-5 text-left">
            <p className="text-sm font-semibold text-mehi-text">{t.suggestionsTitle}</p>
            <ul className="mt-3 space-y-2">
              {t.suggestions.map((suggestion) => (
                <li
                  key={suggestion.say}
                  className="rounded-md bg-mehi-neutral px-4 py-3 text-sm leading-6 text-mehi-text"
                >
                  <span lang="es">«{suggestion.say}»</span>
                  {"gloss" in suggestion && suggestion.gloss && (
                    <span className="block text-xs text-mehi-text-secondary">
                      {suggestion.gloss}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {phone && (
          <p className="text-sm text-mehi-text-secondary">
            {t.preferPhone}{" "}
            <a
              href={`tel:${phone.replace(/[^+\d]/g, "")}`}
              className="font-semibold text-mehi-text underline decoration-mehi-lavender underline-offset-4"
            >
              {phone}
            </a>
          </p>
        )}

        <p className="max-w-md text-xs leading-5 text-mehi-text-secondary">
          {t.disclaimer}
        </p>

        {phase === "ended" && (
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-sm font-semibold text-mehi-text"
          >
            {t.contactMe}
            <ArrowRight className="h-4 w-4 text-mehi-slate" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  );
}
