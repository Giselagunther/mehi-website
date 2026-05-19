import Logo from "./Logo";

export default function Header() {
  return (
    <header className="w-full pt-14 pb-4 md:pt-24 md:pb-6 flex justify-start">
      <Logo className="text-5xl md:text-7xl" />
    </header>
  );
}
