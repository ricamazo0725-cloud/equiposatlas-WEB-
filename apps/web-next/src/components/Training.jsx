const DEFAULT_BG =
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada2.jpg";

export default function Training({ items, bgImage }) {
  return (
    <section id="training" className="relative border-y border-border overflow-hidden">
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
            "linear-gradient(180deg, hsl(var(--background) / 0.6) 0%, hsl(var(--background) / 0.5) 50%, hsl(var(--background) / 0.7) 100%)",
        }}
      />
      {/* Textura de marca sutil por encima de la foto */}
      <div className="absolute inset-0 plate-texture opacity-25" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              Área destacada
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight leading-[0.95] mb-6">
              Capacitación y cursos de manejo
            </h2>
            <p className="text-muted leading-relaxed max-w-sm">
              Formamos operadores certificados para grúas telescópicas, telehandlers y equipos de
              izaje, con instructores avalados y prácticas en equipos reales.
            </p>
            <a href="#contact" className="btn-cta mt-8 inline-block">
              Inscribirme
            </a>
          </div>

          {items.length === 0 ? (
            <p className="text-muted font-mono text-sm">
              Todavía no hay cursos cargados. Agrégalos desde el panel admin.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="spec-plate bg-surface p-6">
                  <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
                  {item.duration && (
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                      {item.duration}
                    </div>
                  )}
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="relative brand-stripe" />
    </section>
  );
}
