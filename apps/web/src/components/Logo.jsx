export default function Logo({ className = "h-11 w-auto", alt = "Equipos Atlas" }) {
  return (
    <img
      src="https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/logomainblancoequipos.png"
      alt={alt}
      width="240"
      height="60"
      decoding="async"
      className={`object-contain ${className}`}
    />
  );
}