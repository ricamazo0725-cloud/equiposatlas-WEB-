import { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import WhatsAppButton from "@/components/WhatsAppButton";

const NAV = [
  { to: "#machinery", label: "Maquinaria" },
  { to: "#gallery", label: "Galería" },
  { to: "#training", label: "Capacitación" },
  { to: "#contact", label: "Contacto" },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`sticky top-0 z-40 transition-colors ${
          scrolled ? "bg-background/95 backdrop-blur border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 py-3 flex items-center justify-between">
          <a href="#top" className="block">
            <Logo className="h-11 w-auto" showTagline={false} />
          </a>
          <nav className="hidden md:flex items-center gap-8 font-display text-sm tracking-wide text-muted">
            {NAV.map((item) => (
              <a
                key={item.to}
                href={item.to}
                className="hover:text-foreground transition-colors focus-ring rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="btn-cta text-xs py-2.5 px-4">
            Solicitar cotización
          </a>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <div className="brand-stripe" />
      <footer className="bg-surface">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo className="h-9 w-auto" showTagline={false} />
          <div className="flex flex-col sm:items-end gap-1 text-xs text-muted font-mono">
            <span>© {new Date().getFullYear()} Equipos Atlas — Izaje de carga y maquinaria amarilla</span>
            <span>gerencia@equiposatlas.com · Cobertura nacional · Colombia</span>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
