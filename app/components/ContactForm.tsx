"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

import {
  CONTACT_FORM_LIMITS,
  ContactSubmissionError,
  submitContactForm,
  validateContactFormPayload,
  type ContactFormPayload,
} from "../contact";
import { ui, type Locale } from "../ui-text";

type SubmissionState = "idle" | "submitting" | "success" | "error";

const FIELD_CLASS =
  "mt-2 min-h-11 w-full rounded-md border border-mehi-input-border bg-white px-3.5 py-2.5 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20";

export function ContactForm({
  locale,
  heading,
  intro,
  secondary = false,
}: {
  locale: Locale;
  heading?: string;
  intro?: string;
  /** Botón de envío secundario: al lado de «Hablá con nuestra asesora virtual», que es la vía que se fomenta. */
  secondary?: boolean;
}) {
  const t = ui[locale].form;
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload: ContactFormPayload = {
      full_name: String(formData.get("full_name") ?? "").trim(),
      organization: String(formData.get("organization") ?? "").trim(),
      // El cargo dejó de pedirse en el formulario corto; el contrato lo admite vacío.
      job_title: "",
      email: String(formData.get("email") ?? "").trim(),
      operation: String(formData.get("operation") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
    };

    setErrorMessage("");
    const validationError = validateContactFormPayload(payload, locale);
    if (validationError) {
      setErrorMessage(validationError.message);
      setSubmissionState("error");
      const invalidField = form.elements.namedItem(validationError.field ?? "");
      if (
        invalidField instanceof HTMLInputElement ||
        invalidField instanceof HTMLTextAreaElement
      ) {
        invalidField.focus();
      }
      return;
    }

    setSubmissionState("submitting");
    try {
      const message = await submitContactForm(payload, fetch, locale);
      form.reset();
      setSuccessMessage(message);
      setSubmissionState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof ContactSubmissionError
          ? error.message
          : locale === "en"
            ? "We couldn't send your request. Please try again in a few minutes."
            : "No pudimos enviar la solicitud. Intentá nuevamente en unos minutos.",
      );
      setSubmissionState("error");

      if (error instanceof ContactSubmissionError && error.field) {
        const field = form.elements.namedItem(error.field);
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
          field.focus();
        }
      }
    }
  }

  return (
    <form
      id="formulario"
      data-testid="contact-form"
      data-transport="https"
      onSubmit={handleSubmit}
      className="relative rounded-md border border-mehi-border bg-white p-6 sm:p-8"
    >
      {heading && (
        <div className="mb-6">
          <p className="text-2xl font-semibold tracking-tight text-mehi-text">{heading}</p>
          {intro && <p className="mt-2 leading-7 text-mehi-text-secondary">{intro}</p>}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-mehi-text">
          {t.fullName}
          <input required minLength={CONTACT_FORM_LIMITS.full_name.minLength} maxLength={CONTACT_FORM_LIMITS.full_name.maxLength} autoComplete="name" name="full_name" className={FIELD_CLASS} />
        </label>
        <label className="text-sm font-medium text-mehi-text">
          {t.organization}
          <input required minLength={CONTACT_FORM_LIMITS.organization.minLength} maxLength={CONTACT_FORM_LIMITS.organization.maxLength} autoComplete="organization" name="organization" className={FIELD_CLASS} />
        </label>
      </div>
      <label className="mt-5 block text-sm font-medium text-mehi-text">
        {t.email}
        <input required type="email" minLength={CONTACT_FORM_LIMITS.email.minLength} maxLength={CONTACT_FORM_LIMITS.email.maxLength} autoComplete="email" name="email" className={FIELD_CLASS} />
      </label>
      <label className="mt-5 block text-sm font-medium text-mehi-text">
        {t.operation}{" "}
        <span className="font-normal text-mehi-text-secondary">{t.optional}</span>
        <textarea maxLength={CONTACT_FORM_LIMITS.operation.maxLength} name="operation" rows={3} placeholder={t.operationPlaceholder} className="mt-2 w-full resize-y rounded-md border border-mehi-input-border bg-white px-3.5 py-3 text-base text-mehi-text outline-none transition-colors placeholder:text-gray-400 focus:border-mehi-slate focus:ring-2 focus:ring-mehi-slate/20" />
      </label>
      <label className="sr-only" aria-hidden="true">
        {t.honeypot}
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button data-testid="contact-submit" type="submit" disabled={submissionState === "submitting"} className={
          secondary
            ? "mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-mehi-text transition-colors border border-mehi-slate hover:border-mehi-plum hover:text-mehi-plum focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-slate focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            : "mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md bg-mehi-plum px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-mehi-plum-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehi-plum focus-visible:ring-offset-4 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
        }>
        {submissionState === "submitting" ? t.submitting : t.submit}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
      {submissionState === "success" && (
        <p role="status" className="mt-4 rounded-md border border-mehi-slate/30 bg-mehi-slate/10 px-4 py-3 text-sm font-medium text-mehi-text">
          {successMessage}
        </p>
      )}
      {submissionState === "error" && (
        <p role="alert" className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}
      <p className="mt-4 text-xs leading-5 text-mehi-text-secondary">
        {t.privacy}
      </p>
    </form>
  );
}
