import MachineryIcon from "@/components/MachineryIcon";

const CATEGORY_LABEL = {
  grua: "Grúa telescópica",
  telehandler: "Telehandler",
  camabaja: "Camabaja",
};

// Ciclo de 4 posiciones que produce una cuadrícula asimétrica sin importar cuántos ítems haya
const SPAN_PATTERN = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-2",
  "sm:col-span-2 sm:row-span-1",
];

const DEFAULT_BG =
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg";

export default function MachineryPortfolio({ items, bgImage }) {
  return (
    <section id="machinery" className="relative overflow-hidden">
      {/* Foto de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bgImage || DEFAULT_BG}')`,
        }}
      />
      {/* Capa clara para legibilidad, permitiendo destacar la foto de fondo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.15) 50%, hsl(var(--background) / 0.45) 100%)",
        }}
      />
      <div className="absolute inset-0 plate-texture opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              Portafolio
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-foreground drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]">
              Nuestra maquinaria
            </h2>
          </div>
          <p className="max-w-md text-sm text-foreground font-medium bg-surface/85 backdrop-blur-md p-4 rounded border border-white/10 shadow-xl leading-relaxed">
            Equipos certificados, mantenidos y listos para operar en terreno, con la capacidad
            exacta que exige tu proyecto.
          </p>
        </div>

        {items.length === 0 ? (
          <p className="text-muted font-mono text-sm">
            Todavía no hay equipos cargados. Agrégalos desde el panel admin.
          </p>
        ) : (
          <div className="grid sm:grid-cols-4 auto-rows-[160px] gap-4">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`spec-plate overflow-hidden !bg-surface/60 backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:border-primary/60 hover:!bg-surface/80 ${SPAN_PATTERN[i % SPAN_PATTERN.length]}`}
              >
                {item.image_url ? (
                  <div className="relative w-full h-full">
                    <img src={item.image_url} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(var(--background) / 0.15) 0%, hsl(var(--background) / 0.75) 100%)",
                      }}
                    />
                    <div className="relative h-full p-6 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-accent">
                          {CATEGORY_LABEL[item.category] || item.category}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-xl leading-tight">{item.name}</h3>
                        {item.capacity_tons && (
                          <div className="font-display font-extrabold text-3xl text-primary">
                            {item.capacity_tons}
                            <span className="text-sm font-body font-normal text-muted ml-1">ton</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">
                          {CATEGORY_LABEL[item.category] || item.category}
                        </div>
                        <h3 className="font-display font-bold text-xl leading-tight">{item.name}</h3>
                      </div>
                      <MachineryIcon category={item.category} className="w-9 h-9 text-muted shrink-0" />
                    </div>

                    {item.description && (
                      <p className="text-sm text-muted leading-snug line-clamp-3">{item.description}</p>
                    )}

                    {item.capacity_tons && (
                      <div className="font-display font-extrabold text-3xl text-primary">
                        {item.capacity_tons}
                        <span className="text-sm font-body font-normal text-muted ml-1">ton</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
