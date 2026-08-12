import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTACT_FORM_LIMITS,
  ContactSubmissionError,
  submitContactForm,
  validateContactFormPayload,
  type ContactFormPayload,
} from "../app/contact.ts";

const payload: ContactFormPayload = {
  full_name: "Persona de Prueba",
  organization: "Organización de Prueba",
  job_title: "Responsable de atención",
  email: "persona@example.com",
  operation: "Queremos mejorar la atención de consultas complejas.",
  website: "",
};

test("el formulario replica los mínimos exigidos por el backend", () => {
  assert.equal(CONTACT_FORM_LIMITS.full_name.minLength, 2);
  assert.equal(CONTACT_FORM_LIMITS.organization.minLength, 2);
  assert.equal(CONTACT_FORM_LIMITS.job_title.minLength, 2);
  assert.equal(CONTACT_FORM_LIMITS.email.minLength, 5);
  assert.equal(CONTACT_FORM_LIMITS.operation.minLength, 10);
});

test("rechaza localmente el mismo dato corto de la captura", () => {
  const error = validateContactFormPayload({
    ...payload,
    organization: "g",
    job_title: "g",
  });

  assert.ok(error instanceof ContactSubmissionError);
  assert.equal(error.field, "organization");
  assert.match(error.message, /2 caracteres.*Organización/);
});

test("devuelve el mensaje de éxito del servicio", async () => {
  const fetcher = async () =>
    new Response(JSON.stringify({ ok: true, message: "Solicitud recibida" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  await assert.doesNotReject(async () => {
    const message = await submitContactForm(payload, fetcher as typeof fetch);
    assert.equal(message, "Solicitud recibida");
  });
});

test("traduce el 422 del backend al campo que debe corregirse", async () => {
  const fetcher = async () =>
    new Response(
      JSON.stringify({
        detail: [
          {
            type: "string_too_short",
            loc: ["body", "organization"],
            msg: "String should have at least 2 characters",
            ctx: { min_length: 3 },
          },
        ],
      }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );

  await assert.rejects(
    submitContactForm(payload, fetcher as typeof fetch),
    (error: unknown) => {
      assert.ok(error instanceof ContactSubmissionError);
      assert.equal(error.field, "organization");
      assert.match(error.message, /3 caracteres.*Organización/);
      return true;
    },
  );
});

test("conserva los errores operativos humanos enviados por el backend", async () => {
  const fetcher = async () =>
    new Response(
      JSON.stringify({ detail: "Recibimos varios intentos. Esperá unos minutos." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );

  await assert.rejects(
    submitContactForm(payload, fetcher as typeof fetch),
    /Recibimos varios intentos/,
  );
});
