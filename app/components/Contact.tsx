export default function Contact() {
  return (
    <section className="py-16 md:py-24 max-w-3xl">
      <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
        Contacto
      </h3>
      <p className="mt-6 md:mt-8 text-lg md:text-xl">
        <a
          href="mailto:contacto@mehi.ar"
          className="text-ciruela hover:underline underline-offset-4"
        >
          contacto@mehi.ar
        </a>
      </p>
      <p className="mt-3 text-sm text-muted">Buenos Aires, Argentina.</p>
    </section>
  );
}
