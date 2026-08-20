import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getAllSections, upsertSection } from "@/api/content";
import { uploadImage, deleteImageByUrl } from "@/api/media";
import { getMachinery, createMachinery, updateMachinery, deleteMachinery } from "@/api/machinery";
import { getCourses, createCourse, deleteCourse } from "@/api/courses";
import { getQuoteRequests, markQuoteRequestHandled } from "@/api/quotes";

const TABS = ["Contenido", "Imágenes", "Maquinaria", "Capacitación", "Cotizaciones"];

export default function AdminDashboardPage() {
  const { signOut } = useAuth();
  const [tab, setTab] = useState("Contenido");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-extrabold">EQUIPOS ATLAS · ADMIN</span>
          <button onClick={signOut} className="btn-outline text-xs py-1.5 px-3">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <nav className="flex gap-2 mb-10 flex-wrap font-mono text-xs uppercase tracking-wider">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 border focus-ring ${
                tab === t ? "border-primary text-primary" : "border-border text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {tab === "Contenido" && <ContentEditor />}
        {tab === "Imágenes" && <MediaEditor />}
        {tab === "Maquinaria" && <MachineryEditor />}
        {tab === "Capacitación" && <CoursesEditor />}
        {tab === "Cotizaciones" && <QuotesViewer />}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea, rows = 3 }) {
  const Comp = textarea ? "textarea" : "input";
  return (
    <div className="space-y-1">
      <label className="font-mono text-xs uppercase tracking-wider text-muted">{label}</label>
      <Comp
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? rows : undefined}
        className="w-full bg-surface-2 border border-border px-3 py-2 text-sm focus-ring"
      />
    </div>
  );
}

function SaveButton({ onClick }) {
  return (
    <button onClick={onClick} type="button" className="btn-cta text-xs py-2 px-4">
      Guardar
    </button>
  );
}

/** Input de archivo + preview, para subir una sola imagen (fondo de una sección). */
function ImageField({ label, value, onChange, folder }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err) {
      alert("No se pudo subir la imagen: " + err.message);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className="font-mono text-xs uppercase tracking-wider text-muted">{label}</label>
      {value && (
        <div className="relative w-full h-32 overflow-hidden border border-border">
          <img src={value} alt={label} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex items-center gap-3">
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="text-xs text-muted" />
        {uploading && <span className="font-mono text-xs text-accent">Subiendo…</span>}
      </div>
    </div>
  );
}

function MediaEditor() {
  const [media, setMedia] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getAllSections().then((s) => setMedia(s.media || { gallery: [] }));
  }, []);

  async function save(next) {
    setMedia(next);
    await upsertSection("media", next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function addGalleryImage(url) {
    await save({ ...media, gallery: [...(media.gallery || []), url] });
  }

  async function removeGalleryImage(url) {
    try {
      await deleteImageByUrl(url);
    } catch {
      // si la imagen no vive en el bucket (ej. una URL externa), no pasa nada
    }
    await save({ ...media, gallery: (media.gallery || []).filter((u) => u !== url) });
  }

  return (
    <div className="space-y-14">
      <section className="spec-plate p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg">Fondos de sección</h2>
          {saved && <span className="font-mono text-xs text-primary">Guardado ✓</span>}
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <ImageField
            label="Fondo del hero"
            value={media.heroBg}
            folder="hero"
            onChange={(url) => save({ ...media, heroBg: url })}
          />
          <ImageField
            label="Fondo del portafolio de maquinaria"
            value={media.machineryBg}
            folder="maquinaria-fondo"
            onChange={(url) => save({ ...media, machineryBg: url })}
          />
          <ImageField
            label="Fondo de capacitación"
            value={media.trainingBg}
            folder="capacitacion"
            onChange={(url) => save({ ...media, trainingBg: url })}
          />
          <ImageField
            label="Fondo de contacto"
            value={media.contactBg}
            folder="contacto"
            onChange={(url) => save({ ...media, contactBg: url })}
          />
        </div>
      </section>

      <section className="spec-plate p-6 space-y-4">
        <h2 className="font-display font-bold text-lg">Galería (scroll animado)</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {(media.gallery || []).map((url) => (
            <div key={url} className="relative group">
              <img src={url} alt="" className="w-full h-28 object-cover border border-border" />
              <button
                onClick={() => removeGalleryImage(url)}
                className="absolute top-1 right-1 bg-background/80 text-danger font-mono text-[10px] px-2 py-1 border border-border"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
        <ImageField label="Agregar foto a la galería" folder="galeria" onChange={addGalleryImage} />
      </section>
    </div>
  );
}

function ContentEditor() {
  const [hero, setHero] = useState({});
  const [contact, setContact] = useState({});
  const [savedKey, setSavedKey] = useState(null);

  useEffect(() => {
    getAllSections().then((s) => {
      setHero(s.hero || {});
      setContact(s.contact || {});
    });
  }, []);

  async function save(section, data) {
    await upsertSection(section, data);
    setSavedKey(section);
    setTimeout(() => setSavedKey(null), 2000);
  }

  return (
    <div className="space-y-14">
      <section className="spec-plate p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg">Hero</h2>
          {savedKey === "hero" && <span className="font-mono text-xs text-primary">Guardado ✓</span>}
        </div>
        <Field label="Eyebrow" value={hero.eyebrow} onChange={(v) => setHero({ ...hero, eyebrow: v })} />
        <Field label="Título" value={hero.title} onChange={(v) => setHero({ ...hero, title: v })} textarea />
        <Field label="Subtítulo" value={hero.subtitle} onChange={(v) => setHero({ ...hero, subtitle: v })} textarea />
        <Field
          label="Capacidad máxima (toneladas)"
          value={hero.maxCapacity}
          onChange={(v) => setHero({ ...hero, maxCapacity: v })}
        />
        <Field
          label="WhatsApp (con código de país, solo números)"
          value={hero.whatsapp}
          onChange={(v) => setHero({ ...hero, whatsapp: v })}
        />
        <SaveButton onClick={() => save("hero", hero)} />
      </section>

      <section className="spec-plate p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg">Contacto</h2>
          {savedKey === "contact" && <span className="font-mono text-xs text-primary">Guardado ✓</span>}
        </div>
        <Field
          label="WhatsApp (con código de país, solo números)"
          value={contact.whatsapp}
          onChange={(v) => setContact({ ...contact, whatsapp: v })}
        />
        <Field
          label="Mensaje predeterminado de WhatsApp"
          value={contact.whatsappMessage}
          onChange={(v) => setContact({ ...contact, whatsappMessage: v })}
        />
        <Field label="Correo" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
        <SaveButton onClick={() => save("contact", contact)} />
      </section>
    </div>
  );
}

function MachineryEditor() {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState({
    name: "",
    category: "grua",
    capacity_tons: "",
    description: "",
    image_url: "",
    order_index: 0,
  });

  function refresh() {
    getMachinery().then(setItems);
  }
  useEffect(refresh, []);

  async function add() {
    if (!draft.name) return;
    await createMachinery(draft);
    setDraft({ name: "", category: "grua", capacity_tons: "", description: "", image_url: "", order_index: 0 });
    refresh();
  }
  async function remove(id) {
    await deleteMachinery(id);
    refresh();
  }
  async function setItemImage(item, url) {
    await updateMachinery(item.id, { image_url: url });
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="spec-plate p-6 space-y-3">
        <h2 className="font-display font-bold text-lg">Nuevo equipo</h2>
        <Field label="Nombre" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
        <div className="space-y-1">
          <label className="font-mono text-xs uppercase tracking-wider text-muted">Categoría</label>
          <select
            value={draft.category}
            onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            className="w-full bg-surface-2 border border-border px-3 py-2 text-sm focus-ring"
          >
            <option value="grua">Grúa telescópica</option>
            <option value="telehandler">Telehandler</option>
            <option value="camabaja">Camabaja</option>
          </select>
        </div>
        <Field
          label="Capacidad (toneladas)"
          value={draft.capacity_tons}
          onChange={(v) => setDraft({ ...draft, capacity_tons: v })}
        />
        <Field
          label="Descripción"
          value={draft.description}
          onChange={(v) => setDraft({ ...draft, description: v })}
          textarea
        />
        <ImageField
          label="Foto del equipo (opcional)"
          value={draft.image_url}
          folder="maquinaria"
          onChange={(url) => setDraft({ ...draft, image_url: url })}
        />
        <Field
          label="Orden"
          value={draft.order_index}
          onChange={(v) => setDraft({ ...draft, order_index: Number(v) || 0 })}
        />
        <SaveButton onClick={add} />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="spec-plate p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-accent">{item.category} · {item.capacity_tons} ton</div>
                <h3 className="font-display font-bold">{item.name}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
              <button onClick={() => remove(item.id)} className="font-mono text-xs text-muted hover:text-danger shrink-0">
                Eliminar
              </button>
            </div>
            <ImageField
              label="Foto"
              value={item.image_url}
              folder="maquinaria"
              onChange={(url) => setItemImage(item, url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesEditor() {
  const [items, setItems] = useState([]);
  const [draft, setDraft] = useState({ title: "", duration: "", description: "", order_index: 0 });

  function refresh() {
    getCourses().then(setItems);
  }
  useEffect(refresh, []);

  async function add() {
    if (!draft.title) return;
    await createCourse(draft);
    setDraft({ title: "", duration: "", description: "", order_index: 0 });
    refresh();
  }
  async function remove(id) {
    await deleteCourse(id);
    refresh();
  }

  return (
    <div className="space-y-6">
      <div className="spec-plate p-6 space-y-3">
        <h2 className="font-display font-bold text-lg">Nuevo curso</h2>
        <Field label="Título" value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} />
        <Field
          label="Duración (ej. 40 horas)"
          value={draft.duration}
          onChange={(v) => setDraft({ ...draft, duration: v })}
        />
        <Field
          label="Descripción"
          value={draft.description}
          onChange={(v) => setDraft({ ...draft, description: v })}
          textarea
        />
        <Field
          label="Orden"
          value={draft.order_index}
          onChange={(v) => setDraft({ ...draft, order_index: Number(v) || 0 })}
        />
        <SaveButton onClick={add} />
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="spec-plate p-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-accent">{item.duration}</div>
              <h3 className="font-display font-bold">{item.title}</h3>
              <p className="text-sm text-muted">{item.description}</p>
            </div>
            <button onClick={() => remove(item.id)} className="font-mono text-xs text-muted hover:text-danger">
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuotesViewer() {
  const [items, setItems] = useState([]);

  function refresh() {
    getQuoteRequests().then(setItems);
  }
  useEffect(refresh, []);

  async function toggleHandled(item) {
    await markQuoteRequestHandled(item.id, !item.handled);
    refresh();
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-muted font-mono text-sm">Todavía no hay solicitudes de cotización.</p>
      )}
      {items.map((item) => (
        <div key={item.id} className="spec-plate p-4 flex items-start justify-between gap-4">
          <div>
            <div className="font-mono text-xs text-accent">
              {item.equipment} · {new Date(item.created_at).toLocaleDateString("es-CO")}
            </div>
            <h3 className="font-display font-bold">
              {item.name} {item.company && `· ${item.company}`}
            </h3>
            <p className="text-sm text-muted">{item.phone}</p>
            {item.message && <p className="text-sm text-muted mt-1">{item.message}</p>}
          </div>
          <button
            onClick={() => toggleHandled(item)}
            className={`font-mono text-xs px-2 py-1 border ${
              item.handled ? "border-primary text-primary" : "border-border text-muted"
            }`}
          >
            {item.handled ? "Atendida" : "Marcar atendida"}
          </button>
        </div>
      ))}
    </div>
  );
}
