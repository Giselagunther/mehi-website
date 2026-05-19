import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Clients from "./components/Clients";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-6 md:px-10 mehi-fade-in">
        <Header />
        <Hero />
        <Portfolio />
        <Clients />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
