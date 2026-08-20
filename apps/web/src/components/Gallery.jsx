import { motion } from "framer-motion";

// Se usan si el admin todavía no cargó fotos propias para la galería
const DEFAULT_IMAGES = [
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada2.jpg",
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada3.jpg",
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg",
];

export default function Gallery({ images }) {
  const base = images?.length ? images : DEFAULT_IMAGES;
  const track = [...base, ...base]; // duplicado para que el loop no se note

  return (
    <section id="gallery" className="py-24 border-t border-border overflow-hidden bg-surface">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
            Galería
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            Equipos en terreno
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="flex gap-4 w-max px-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {track.map((src, i) => (
          <div key={i} className="spec-plate overflow-hidden shrink-0 w-[300px] sm:w-[380px] h-[220px] sm:h-[260px]">
            <img
              src={src}
              alt="Maquinaria pesada de Equipos Atlas en terreno"
              width="380"
              height="260"
              decoding="async"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}