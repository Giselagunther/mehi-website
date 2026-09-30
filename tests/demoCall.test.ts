import assert from "node:assert/strict";
import test from "node:test";

import {
  DEMO_CALL_MESSAGES,
  DemoCallApiError,
  MicrophoneUnsupportedError,
  describeDemoCallError,
  requestMicrophone,
} from "../app/demoCall.ts";

test("el mensaje del SDK de voz nunca llega crudo a la persona", () => {
  // El SDK emite exactamente este string cuando falla el arranque (y loguea la causa aparte).
  const message = describeDemoCallError("Error starting call");
  assert.equal(message, DEMO_CALL_MESSAGES.generic);
  assert.doesNotMatch(message, /Error starting call/);
});

test("micrófono negado: se explica en español qué hacer", () => {
  const denied = Object.assign(new Error("Permission denied"), { name: "NotAllowedError" });
  assert.equal(describeDemoCallError(denied), DEMO_CALL_MESSAGES.micDenied);
  // Safari y navegadores viejos usan otros nombres para lo mismo.
  assert.equal(
    describeDemoCallError({ name: "PermissionDeniedError", message: "" }),
    DEMO_CALL_MESSAGES.micDenied,
  );
});

test("sin micrófono o micrófono ocupado: mensajes propios", () => {
  assert.equal(
    describeDemoCallError(Object.assign(new Error("Requested device not found"), { name: "NotFoundError" })),
    DEMO_CALL_MESSAGES.micMissing,
  );
  assert.equal(
    describeDemoCallError(Object.assign(new Error("Could not start audio source"), { name: "NotReadableError" })),
    DEMO_CALL_MESSAGES.micBusy,
  );
  assert.equal(describeDemoCallError(new MicrophoneUnsupportedError()), DEMO_CALL_MESSAGES.micUnsupported);
});

test("el mensaje humano de la API de MEHI se muestra tal cual", () => {
  const detail = "La línea de demo está muy solicitada. Probá de nuevo en unos minutos.";
  assert.equal(describeDemoCallError(new DemoCallApiError(detail)), detail);
  assert.equal(describeDemoCallError(new DemoCallApiError("   ")), DEMO_CALL_MESSAGES.generic);
});

test("un error desconocido cae en la frase genérica, nunca en su texto", () => {
  assert.equal(describeDemoCallError(new Error("WebSocket closed 1006")), DEMO_CALL_MESSAGES.generic);
  assert.equal(describeDemoCallError(undefined), DEMO_CALL_MESSAGES.generic);
});

test("todos los mensajes están en español y no nombran al proveedor", () => {
  for (const message of Object.values(DEMO_CALL_MESSAGES)) {
    assert.match(message, /[áéíóúñ]/, message);
    assert.doesNotMatch(message, /retell|error starting|permission/i, message);
  }
});

test("requestMicrophone suelta las pistas apenas las obtiene", async () => {
  let stopped = 0;
  const mediaDevices = {
    getUserMedia: async () => ({ getTracks: () => [{ stop: () => void stopped++ }, { stop: () => void stopped++ }] }),
  };
  await requestMicrophone(mediaDevices);
  assert.equal(stopped, 2);
});

test("requestMicrophone propaga la negativa del navegador sin crear la llamada", async () => {
  const denied = Object.assign(new Error("Permission denied"), { name: "NotAllowedError" });
  await assert.rejects(requestMicrophone({ getUserMedia: async () => { throw denied; } }), denied);
  await assert.rejects(requestMicrophone(undefined), MicrophoneUnsupportedError);
});
