const DEFAULT_BG =
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg";

export default function Hero({ data, bgImage }) {
  return (
    <section id="top" className="relative border-b border-border overflow-hidden">
      {/* Foto de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage || DEFAULT_BG}')`,
        }}
      />
      {/* Degradado para legibilidad, dejando ver la foto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.6) 0%, hsl(var(--background) / 0.5) 45%, hsl(var(--background) / 0.7) 100%)",
        }}
      />
      {/* Textura de marca sutil por encima de la foto */}
      <div className="absolute inset-0 plate-texture opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.3fr_0.9fr] gap-12 items-end">
        <div>
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-5">
            {data?.eyebrow || "Izaje de carga · Maquinaria amarilla · Colombia"}
          </div>
          <h1 className="font-display font-extrabold text-5xl sm:text-7xl leading-[0.95] tracking-tight max-w-2xl">
            {data?.title || "Potencia y precisión para tu proyecto industrial"}
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
            Alquiler de grúas telescópicas, y camabajas, con equipos y operadores certificados a nivel nacional.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-cta">
              Solicitar cotización
            </a>
            <a
              href="https://wa.me/573003085965"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              Contacto vía WhatsApp
            </a>
          </div>
        </div>

        <div className="spec-plate p-8">
          <div className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
            Capacidad máxima de izaje
          </div>
          <div className="font-display font-extrabold text-7xl leading-none text-primary">
            {data?.maxCapacity || "100"}
            <span className="text-2xl align-top ml-1">TON</span>
          </div>
          <div className="mt-4 font-mono text-xs text-muted">
            Grúas telescópicas · Camabajas
          </div>
        </div>
      </div>
      <div className="relative brand-stripe" />
    </section>
  );
}

