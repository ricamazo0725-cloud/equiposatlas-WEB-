import { useState } from "react";
import { submitQuoteRequest } from "@/api/quotes";

const DEFAULT_BG =
  "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada3.jpg";

const COUNTRY_CODES = [
  { code: "+57", iso: "co", name: "Colombia" },
  { code: "+1", iso: "us", name: "EE.UU. / Canadá" },
  { code: "+52", iso: "mx", name: "México" },
  { code: "+51", iso: "pe", name: "Perú" },
  { code: "+56", iso: "cl", name: "Chile" },
  { code: "+593", iso: "ec", name: "Ecuador" },
  { code: "+54", iso: "ar", name: "Argentina" },
  { code: "+34", iso: "es", name: "España" },
  { code: "+58", iso: "ve", name: "Venezuela" },
  { code: "+507", iso: "pa", name: "Panamá" },
];

export default function Contact({ data, bgImage }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", equipment: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const whatsappNumber = "573003085965";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    data?.whatsappMessage || "Hola, quiero cotizar el alquiler de un equipo."
  )}`;

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitQuoteRequest(form);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", equipment: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const contactEmail = "gerencia@equiposatlas.com";

  return (
    <section id="contact" className="relative overflow-hidden min-h-[520px] flex">

      {/* ── LADO IZQUIERDO: Formulario ── */}
      <div
        className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center px-8 py-16 lg:px-14"
        style={{ background: "#0d1117" }}
      >
        {/* Etiqueta */}
        <div
          className="font-mono text-xs uppercase tracking-widest mb-3 font-bold"
          style={{ color: "#00d2d3" }}
        >
          Contacto
        </div>

        <h2
          className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight mb-8"
          style={{ color: "#ffffff" }}
        >
          Solicita tu cotización
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fila: Nombre + Correo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Nombre"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <FormField
              label="Correo Electrónico"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="ejemplo@correo.com"
              required
            />
          </div>

          {/* Fila: Teléfono + Equipo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PhoneField value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            <FormField
              label="Equipo de interés"
              value={form.equipment}
              onChange={(v) => setForm({ ...form, equipment: v })}
              placeholder="Grúa telescópica, camabaja..."
            />
          </div>

          {/* Mensaje */}
          <FormField
            label="Mensaje"
            value={form.message}
            onChange={(v) => setForm({ ...form, message: v })}
            textarea
          />

          {/* Botón enviar */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-3 font-display font-bold text-sm uppercase tracking-widest transition-all duration-200 disabled:opacity-50"
            style={{
              background: "#00d2d3",
              color: "#0d1117",
              border: "none",
              letterSpacing: "0.15em",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#00b8b9")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00d2d3")}
          >
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>

          {status === "sent" && (
            <p className="font-mono text-xs" style={{ color: "#00d2d3" }}>
              Solicitud enviada. Te contactaremos pronto.
            </p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-red-400">
              No se pudo enviar.{" "}
              <a href={whatsappHref} target="_blank" rel="noreferrer" style={{ color: "#00d2d3" }}>
                Escríbenos por WhatsApp.
              </a>
            </p>
          )}
        </form>

        {/* Correo debajo */}
        <div className="mt-6 font-mono text-xs" style={{ color: "#64748b" }}>
          También por correo:{" "}
          <a href={`mailto:${contactEmail}`} style={{ color: "#94a3b8" }}>
            {contactEmail}
          </a>
        </div>
      </div>

      {/* ── LADO DERECHO: Foto ── */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={bgImage || DEFAULT_BG}
          alt="Maquinaria pesada en obra"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        {/* Degradado sutil izquierda para unir con el formulario */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, #0d1117 0%, transparent 25%)",
          }}
        />
      </div>
    </section>
  );
}

/* ── Componentes auxiliares ── */

function PhoneField({ value, onChange, required }) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const numOnly = value ? value.replace(/^\+\d+\s*/, "") : "";

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    onChange(`${country.code} ${numOnly}`);
  };

  const handleNumberChange = (e) => {
    onChange(`${selectedCountry.code} ${e.target.value}`);
  };

  return (
    <div className="space-y-1 relative">
      <label className="font-mono text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>
        Teléfono / WhatsApp *
      </label>
      <div
        className="flex items-center"
        style={{
          background: "#161d2b",
          border: "1px solid #1e2d3d",
        }}
      >
        {/* Selector país */}
        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Seleccionar código de país"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm transition-colors focus:outline-none"
            style={{
              borderRight: "1px solid #1e2d3d",
              background: "transparent",
              color: "#f1f5f9",
            }}
          >
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
              alt={selectedCountry.name}
              className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm"
            />
            <span className="font-mono text-[10px]" style={{ color: "#64748b" }}>▼</span>
            <span className="font-mono text-xs font-semibold">{selectedCountry.code}</span>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
              <div
                className="absolute top-full left-0 mt-1 w-64 shadow-2xl z-50 max-h-60 overflow-y-auto"
                style={{ background: "#161d2b", border: "1px solid #1e2d3d" }}
              >
                {COUNTRY_CODES.map((country) => (
                  <button
                    key={country.iso + country.code}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-mono transition-colors"
                    style={{
                      borderBottom: "1px solid #1e2d3d",
                      background:
                        selectedCountry.iso === country.iso ? "rgba(0,210,211,0.1)" : "transparent",
                      color:
                        selectedCountry.iso === country.iso ? "#00d2d3" : "#f1f5f9",
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${country.iso}.png`}
                      alt={country.name}
                      className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm shrink-0"
                    />
                    <span className="font-semibold w-12">{country.code}</span>
                    <span className="truncate" style={{ color: "#64748b" }}>{country.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Input número */}
        <input
          id="contact-phone"
          aria-label="Teléfono o WhatsApp"
          type="tel"
          value={numOnly}
          required={required}
          placeholder="300 000 0000"
          onChange={handleNumberChange}
          className="w-full px-3 py-2 text-sm font-mono focus:outline-none"
          style={{ background: "transparent", color: "#f1f5f9" }}
        />
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, textarea, required, placeholder, type = "text" }) {
  const fieldId = `field-${label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-")}`;
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="font-mono text-xs uppercase tracking-wider" style={{ color: "#64748b" }}>
        {label}
      </label>
      <Comp
        id={fieldId}
        aria-label={label}
        type={textarea ? undefined : type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        className="w-full px-3 py-2 text-sm focus:outline-none transition-colors"
        style={{
          background: "#161d2b",
          border: "1px solid #1e2d3d",
          color: "#f1f5f9",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#00d2d3")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#1e2d3d")}
      />
    </div>
  );
}