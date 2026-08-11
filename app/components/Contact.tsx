import { CONTACT_EMAIL, CONTACT_MAILTO } from "../contact";

export default function Contact() {
  return (
    <section className="py-10 md:py-16 max-w-3xl">
      <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
        Contacto
      </h3>
      <p className="mt-5 md:mt-6 text-lg md:text-xl break-words">
        <a
          href={CONTACT_MAILTO}
          className="text-ciruela hover:underline underline-offset-4"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
      <p className="mt-3 text-sm text-muted">Buenos Aires, Argentina.</p>
    </section>
  );
}
