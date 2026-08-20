import { useState, useEffect } from "react";

export default function WhatsAppButton({ phoneNumber = "573003085965", defaultMessage = "Hola Equipos Atlas, quiero cotizar el alquiler de maquinaria e izaje de carga." }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const cleanNumber = phoneNumber.replace(/\D/g, "");
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(defaultMessage)}`;

  // Automatically open pop-up notification after 3 seconds if user hasn't dismissed it
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasDismissed]);

  const handleTriggerClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
      setIsOpen(true);
      setShowBadge(false);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    setHasDismissed(true);
    setShowBadge(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {/* Interactive Chat Popup Card */}
      <div
        className={`w-80 bg-surface/95 backdrop-blur-md border border-[#25D366]/30 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none hidden"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#25D366]/20 to-surface-2 p-3.5 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full bg-primary text-black font-extrabold flex items-center justify-center text-xs shadow-md">
              EA
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-surface rounded-full" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground leading-snug">Equipos Atlas</h4>
              <span className="text-[11px] text-[#25D366] font-medium flex items-center gap-1">
                ● En línea | Asesoría Técnica
              </span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-muted hover:text-foreground text-sm p-1 rounded transition-colors"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-foreground leading-relaxed mb-3">
            ¡Hola! 👋 ¿Deseas cotizar alquiler de grúas telescópicas o maquinaria pesada para tu proyecto?
            <span className="block text-right text-[10px] text-muted mt-1.5 font-mono">
              Respuesta habitual: &lt; 5 min
            </span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              setIsOpen(false);
              setShowBadge(false);
            }}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.727-1.45L0 24zm6.59-14.859c-.16-.356-.33-.363-.483-.369-.123-.004-.264-.004-.405-.004-.141 0-.37.053-.564.264-.194.21-.74.723-.74 1.761 0 1.037.755 2.039.86 2.181.106.141 1.486 2.269 3.599 3.178 1.758.757 2.116.606 2.499.57.382-.036 1.233-.503 1.409-.99.177-.488.177-.907.124-.995-.052-.088-.194-.141-.405-.247-.21-.106-1.233-.609-1.423-.678-.19-.069-.328-.104-.468.106-.14.21-.54.678-.662.818-.121.141-.243.158-.454.053-.21-.106-.889-.327-1.693-1.046-.625-.558-1.047-1.248-1.17-1.459-.122-.21-.013-.323.092-.428.095-.095.21-.247.316-.371.106-.124.14-.212.21-.353.07-.141.036-.264-.017-.37-.053-.106-.483-1.163-.662-1.596z" />
            </svg>
            Iniciar Chat en WhatsApp
          </a>
        </div>
      </div>

      {/* Floating Button */}
      <div className="relative flex items-center group">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTriggerClick}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/40 border border-white/20 hover:scale-110 hover:-translate-y-0.5 transition-all duration-300"
          aria-label="Contactar por WhatsApp"
        >
          {/* Animated Pulse Ring */}
          <span className="absolute -inset-1 rounded-full border-2 border-[#25D366] animate-ping opacity-75 pointer-events-none" />

          {/* Badge */}
          {showBadge && (
            <span className="absolute -top-1 -right-1 bg-primary text-black font-mono font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-background shadow-md">
              1
            </span>
          )}

          {/* WhatsApp Icon */}
          <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.727-1.45L0 24zm6.59-14.859c-.16-.356-.33-.363-.483-.369-.123-.004-.264-.004-.405-.004-.141 0-.37.053-.564.264-.194.21-.74.723-.74 1.761 0 1.037.755 2.039.86 2.181.106.141 1.486 2.269 3.599 3.178 1.758.757 2.116.606 2.499.57.382-.036 1.233-.503 1.409-.99.177-.488.177-.907.124-.995-.052-.088-.194-.141-.405-.247-.21-.106-1.233-.609-1.423-.678-.19-.069-.328-.104-.468.106-.14.21-.54.678-.662.818-.121.141-.243.158-.454.053-.21-.106-.889-.327-1.693-1.046-.625-.558-1.047-1.248-1.17-1.459-.122-.21-.013-.323.092-.428.095-.095.21-.247.316-.371.106-.124.14-.212.21-.353.07-.141.036-.264-.017-.37-.053-.106-.483-1.163-.662-1.596z" />
          </svg>
        </a>

        {/* Hover Tooltip */}
        <span className="absolute right-16 bg-surface/90 backdrop-blur-md text-foreground text-xs font-semibold px-3 py-1.5 rounded-md border border-white/10 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:block">
          ¿Cotizar por WhatsApp?
        </span>
      </div>
    </div>
  );
}
