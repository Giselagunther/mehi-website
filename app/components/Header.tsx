import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full pt-8 pb-2 md:pt-10 md:pb-4">
      <Logo className="h-12 md:h-14 w-auto" />
    </header>
  );
}
