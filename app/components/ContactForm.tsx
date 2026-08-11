"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import { submitContactForm, type ContactFormPayload } from "../contact";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: ContactFormPayload = {
      full_name: String(formData.get("full_name") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      job_title: String(formData.get("job_title") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      operation: String(formData.get("operation") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    setSubmissionState("submitting");
    try {
      const message = await submitContactForm(payload);
      form.reset();
      setSuccessMessage(message);
      setSubmissionState("success");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form
      data-testid="contact-form"
      data-transport="https"
      onSubmit={handleSubmit}
      className="relative rounded-md border border-mehi-border bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-mehi-text">
          Nombre y apellido
          <input required maxLength={120} autoComplete="name" name="full_name" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
        </label>
        <label className="text-sm font-medium text-mehi-text">
          Organización
          <input required maxLength={160} autoComplete="organization" name="organization" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
        </label>
        <label className="text-sm font-medium text-mehi-text">
          Cargo
          <input required maxLength={120} autoComplete="organization-title" name="job_title" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
        </label>
        <label className="text-sm font-medium text-mehi-text">
          Correo
          <input required type="email" maxLength={254} autoComplete="email" name="email" className="mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-mehi-text">
        Operación que querés mejorar
        <textarea required minLength={10} maxLength={2000} name="operation" rows={4} className="mt-2 w-full resize-y rounded-md border border-mehi-input-border bg-white px-3.5 py-3 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
      </label>
      <label className="sr-only" aria-hidden="true">
        Sitio web
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button data-testid="contact-submit" type="submit" disabled={submissionState === "submitting"} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-60 sm:w-auto">
        {submissionState === "submitting" ? "Enviando..." : "Solicitar una demo"}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {submissionState === "success" && (
        <p role="status" className="mt-4 rounded-md border border-mehi-slate/30 bg-mehi-slate/10 px-4 py-3 text-sm font-medium text-mehi-text">
          {successMessage}
        </p>
      )}
      {submissionState === "error" && (
        <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          No pudimos enviar la solicitud. Intentá nuevamente en unos minutos.
        </p>
      )}
      <p className="mt-4 text-xs leading-5 text-mehi-text-secondary">
        Usaremos estos datos únicamente para responder tu solicitud.
      </p>
    </form>
  );
}
