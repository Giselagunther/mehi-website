type Product = { name: string; description: string };

const products: Product[] = [
  {
    name: "MEHI",
    description:
      "Plataforma omnicanal de atención ciudadana con agentes de voz e inteligencia artificial, integrada con el stack de telefonía y operadores humanos.",
  },
  {
    name: "KORENUS",
    description:
      "Sistema de gestión de casos y CRM para organismos públicos. Registra, deriva y resuelve cada gestión ciudadana con trazabilidad de extremo a extremo.",
  },
];

export default function Portfolio() {
  return (
    <section className="py-10 md:py-16">
      <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
        Nuestro portfolio
      </h3>
      <div className="mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <article
            key={p.name}
            className="bg-surface rounded-md p-8 md:p-10 border border-black/[0.04]"
          >
            <h4 className="font-display text-2xl md:text-3xl text-ink">{p.name}</h4>
            <p className="mt-4 text-muted text-base leading-relaxed break-words">{p.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
