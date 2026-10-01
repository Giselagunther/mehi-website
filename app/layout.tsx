// Layout raíz de paso: el <html> lo arma el layout de cada idioma
// (app/(es)/layout.tsx y app/(en)/layout.tsx) para declarar el idioma real.
// Tiene que existir: sin un layout raíz único no hay app/not-found.tsx, y las
// direcciones inexistentes mostraban el 404 genérico del framework (o una
// página en blanco hasta cargar JavaScript) en lugar de la página de MEHI.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
