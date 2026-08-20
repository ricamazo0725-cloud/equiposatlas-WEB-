import { useState } from "react";
import MachineryIcon from "@/components/MachineryIcon";

const CATEGORY_LABEL = {
  grua: "Grúa telescópica",
  telehandler: "Telehandler",
  camabaja: "Camabaja",
};

const DEFAULT_BG =
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg";

export default function MachineryPortfolio({ items, bgImage }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  // Sincronizar activeId si los items cambian y el activo ya no existe
  const activeItem = items.find((i) => i.id === activeId) ?? items[0] ?? null;

  function toggle(id) {
    setActiveId(id);
  }

  return (
    <section id="machinery" className="relative overflow-hidden">
      {/* Foto de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage || DEFAULT_BG}')` }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--background) / 0.55) 0%, hsl(var(--background) / 0.30) 50%, hsl(var(--background) / 0.65) 100%)",
        }}
      />
      <div className="absolute inset-0 plate-texture opacity-15" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        {/* Encabezado */}
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

        {/* Tarjetas expandibles */}
        {items.length === 0 ? (
          <p className="text-muted font-mono text-sm">
            Todavía no hay equipos cargados. Agrégalos desde el panel admin.
          </p>
        ) : (
          <div className="flex gap-4 h-[340px]">
            {items.map((item) => {
              const isActive = item.id === activeItem?.id;
              return (
                <button
                  key={item.id}
                  onClick={() => toggle(item.id)}
                  aria-expanded={isActive}
                  className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  style={{
                    flex: isActive ? "4 1 0%" : "1 1 0%",
                    minWidth: isActive ? "0" : "80px",
                    transition: "flex 0.5s cubic-bezier(0.4,0,0.2,1)",
                    background: "#0f172a",
                  }}
                >
                  {/* Imagen de fondo de la tarjeta */}
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        opacity: isActive ? 1 : 0.18,
                        transition: "opacity 0.5s ease",
                      }}
                    />
                  )}

                  {/* Overlay degradado */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.70) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)",
                      transition: "background 0.5s ease",
                    }}
                  />

                  {/* Contenido colapsado (texto vertical) — visible solo cuando está inactivo */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-end p-4 gap-2"
                    style={{
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 0.3s ease",
                      pointerEvents: isActive ? "none" : "auto",
                    }}
                  >
                    <MachineryIcon
                      category={item.category}
                      className="w-8 h-8 text-accent opacity-70 mb-auto mt-4"
                    />
                    <span
                      className="font-display font-bold text-xs text-foreground leading-tight text-center"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {item.name}
                    </span>
                    {item.capacity_tons && (
                      <span className="font-display font-extrabold text-lg text-primary leading-none">
                        {item.capacity_tons}
                        <span className="text-[10px] font-body font-normal text-muted ml-0.5">t</span>
                      </span>
                    )}
                  </div>

                  {/* Contenido expandido — visible solo cuando está activo */}
                  <div
                    className="absolute inset-0 p-6 flex flex-col justify-between"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.4s ease 0.15s",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Top: categoría */}
                    <div className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                      {CATEGORY_LABEL[item.category] || item.category}
                    </div>

                    {/* Bottom: nombre + capacidad */}
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl leading-tight text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mb-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-foreground/80 leading-snug line-clamp-2 mb-3 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                          {item.description}
                        </p>
                      )}
                      {item.capacity_tons && (
                        <div className="font-display font-extrabold text-4xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                          {item.capacity_tons}
                          <span className="text-sm font-body font-normal text-muted ml-1">TON</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Borde activo */}
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      boxShadow: isActive
                        ? "inset 0 0 0 2px hsl(var(--primary) / 0.6)"
                        : "inset 0 0 0 1px rgba(255,255,255,0.08)",
                      transition: "box-shadow 0.4s ease",
                    }}
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}