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
    <section id="contact" className="relative overflow-hidden">
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
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              Contacto
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight mb-6">
              Solicita tu cotización
            </h2>
            <p className="text-muted leading-relaxed max-w-md mb-8">
              Cuéntanos qué equipo necesitas y por cuánto tiempo. Te respondemos con disponibilidad
              y tarifa el mismo día hábil.
            </p>

            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-cta inline-block">
              Contacto vía WhatsApp
            </a>

            <div className="mt-8 font-mono text-sm text-muted">
              También por correo:{" "}
              <a href={`mailto:${contactEmail}`} className="text-foreground hover:text-primary">
                {contactEmail}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="spec-plate p-8 space-y-4">
            <FormField label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <FormField
              label="Correo Electrónico"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="ejemplo@correo.com"
              required
            />
            <PhoneField value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            <FormField
              label="Equipo de interés"
              value={form.equipment}
              onChange={(v) => setForm({ ...form, equipment: v })}
              placeholder="Grúa telescópica, camabaja..."
            />
            <FormField
              label="Mensaje"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              textarea
            />

            <button type="submit" disabled={status === "sending"} className="btn-cta w-full disabled:opacity-50">
              {status === "sending" ? "Enviando..." : "Enviar solicitud"}
            </button>

            {status === "sent" && (
              <p className="font-mono text-xs text-primary">Solicitud enviada. Te contactaremos pronto.</p>
            )}
            {status === "error" && (
              <p className="font-mono text-xs text-danger">
                No se pudo enviar. Escríbenos directo por WhatsApp.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function PhoneField({ value, onChange, required }) {
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]); // Colombia (+57)
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const numOnly = value ? value.replace(/^\+\d+\s*/, "") : "";

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    onChange(`${country.code} ${numOnly}`);
  };

  const handleNumberChange = (e) => {
    const inputVal = e.target.value;
    onChange(`${selectedCountry.code} ${inputVal}`);
  };

  const phoneId = "contact-phone";

  return (
    <div className="space-y-1 relative">
      <label htmlFor={phoneId} className="font-mono text-xs uppercase tracking-wider text-muted">
        Teléfono / WhatsApp *
      </label>

      <div className="flex items-center bg-surface-2 border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-none transition-colors">
        {/* Country Selector Button */}
        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="Seleccionar código de país"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 border-r border-border bg-surface hover:bg-surface-2 text-sm text-foreground transition-colors focus:outline-none"
          >
            <img
              src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
              alt={selectedCountry.name}
              className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm"
            />
            <span className="font-mono text-[10px] text-muted">▼</span>
            <span className="font-mono text-xs font-semibold text-foreground">{selectedCountry.code}</span>
          </button>

          {/* Custom Popover Dropdown */}
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-border rounded-none shadow-2xl z-50 max-h-60 overflow-y-auto">
                {COUNTRY_CODES.map((country) => (
                  <button
                    key={country.iso + country.code}
                    type="button"
                    onClick={() => handleSelectCountry(country)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-xs font-mono hover:bg-primary/20 hover:text-primary transition-colors border-b border-border/40 ${
                      selectedCountry.iso === country.iso ? "bg-primary/10 text-primary font-bold" : "text-foreground"
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${country.iso}.png`}
                      alt={country.name}
                      className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm shrink-0"
                    />
                    <span className="font-semibold w-12">{country.code}</span>
                    <span className="truncate text-muted">{country.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Phone Input */}
        <input
          id={phoneId}
          aria-label="Teléfono o WhatsApp"
          type="tel"
          value={numOnly}
          required={required}
          placeholder="300 000 0000"
          onChange={handleNumberChange}
          className="w-full bg-transparent px-3 py-2 text-sm text-foreground focus:outline-none font-mono"
        />
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, textarea, required, placeholder, type = "text", id }) {
  const fieldId = id || `field-${label.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-")}`;
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="space-y-1">
      <label htmlFor={fieldId} className="font-mono text-xs uppercase tracking-wider text-muted">{label}</label>
      <Comp
        id={fieldId}
        aria-label={label}
        type={textarea ? undefined : type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 3 : undefined}
        className="w-full bg-surface-2 border border-border rounded-none px-3 py-2 text-sm focus-ring"
      />
    </div>
  );
}