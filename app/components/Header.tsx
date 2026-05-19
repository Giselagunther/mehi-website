import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full pt-14 pb-4 md:pt-24 md:pb-6">
      <Logo className="h-24 md:h-36 w-auto" />
    </header>
  );
}
