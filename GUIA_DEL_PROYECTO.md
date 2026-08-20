# Guía del proyecto — Equipos Atlas (basado en la base amoli)

Misma arquitectura del proyecto `amoli` (React + Vite + Tailwind + Supabase,
desplegado en Hostinger con Git nativo), sin las partes de tienda. Es un sitio
de una sola página para una empresa de alquiler de maquinaria pesada, con
portafolio de equipos, área de capacitación, formulario de cotización y panel
admin.

> Regla general: `src/api/`, `src/hooks/`, `src/lib/` y `supabase/` son
> "motor" — no los toques. `src/pages/`, `src/components/`, `src/index.css` y
> `tailwind.config.js` son "carrocería" — ahí cambias diseño y textos.

## 1. Concepto de diseño

Ajustado al `MANUAL_BÁSICO_DE_MARCA` que compartiste — la paleta, tipografía
y el isotipo ya no son una propuesta libre, sino los oficiales de Equipos
Atlas.

- **Paleta oficial**: teal `#00A199` (`--primary`, CTAs "Solicitar
  cotización" y "Contacto vía WhatsApp"), carbón `#3D3D3D` (`--charcoal`) y
  gris claro `#D8D8D8`, ambos neutros según el manual. El manual no incluye
  amarillo — el brief inicial lo proponía, pero al llegar el manual real
  prevalece la paleta oficial. Si de todas formas quieres un acento amarillo
  puntual, dímelo y lo agrego como color secundario.
- **Tipografía oficial**: **Cocogoose Pro** (cuerpo) y **Space Ranger Title**
  (títulos, mayúsculas). Son fuentes de licencia comercial — no vienen
  incluidas. En `src/index.css` ya están declaradas con `@font-face`
  apuntando a `/public/fonts/CocogoosePro.woff2` y
  `/public/fonts/SpaceRangerTitle.woff2`; solo copia ahí los archivos cuando
  tengas la licencia y se activan solas. Mientras tanto, el sitio usa
  **Poppins** y **Oswald** (Google Fonts) como reemplazo visualmente cercano,
  cargadas desde `index.html`.
- **Isotipo**: recreé el mismo lockup del manual (mástil diagonal con gancho,
  pluma segmentada, wordmark EQUIPOS/ATLAS y barra teal con el tagline) como
  SVG en `src/components/Logo.jsx`, para que escale nítido en cualquier
  tamaño. Respeta las reglas del manual: no deformar, no rotar, no agregar
  sombra, no alterar el color — el componente ya lo hace por defecto.
- **Textura**: patrón sutil tipo plancha antideslizante (`.plate-texture`) en
  el hero y la sección de capacitación.
- **Elemento firma**: las "placas de especificación" (`.spec-plate`), tarjetas
  con esquinas achaflanadas como una placa de identificación de maquinaria, y
  el portafolio en cuadrícula asimétrica (bento) en
  `src/components/MachineryPortfolio.jsx`.
- **Franja de marca** (`.brand-stripe`): divisor diagonal teal/fondo entre
  secciones — úsalo con moderación, es el acento más fuerte del diseño.

## 2. Puesta en marcha

1. `pnpm install`
2. Crea un proyecto en [supabase.com](https://supabase.com) y corre
   `apps/web/supabase/schema.sql` completo en el SQL Editor. Crea las tablas,
   las políticas de seguridad y contenido de ejemplo (incluye 3 equipos y 2
   cursos para que veas el diseño funcionando).
3. Copia `.env.example` a `.env` en `apps/web/` y completa tus credenciales de
   Supabase.
4. Crea tu usuario admin en **Authentication → Users → Add user**.
5. `pnpm dev`, entra a `/admin`, y reemplaza el contenido de ejemplo.

## 3. Modelo de datos

- `site_content`: hero y contacto (JSON libre).
- `machinery_items`: cada equipo del portafolio — `name`, `category` (`grua`
  | `telehandler` | `camabaja`), `capacity_tons`, `description`, `image_url`
  (opcional, si luego quieres mostrar fotos reales en vez del ícono),
  `order_index`.
- `course_items`: cursos de capacitación — `title`, `duration`,
  `description`, `order_index`.
- `quote_requests`: solicitudes del formulario público. Cualquiera puede
  crear una (RLS lo permite), pero solo el admin autenticado puede leerlas o
  marcarlas como atendidas — se revisan desde la pestaña "Cotizaciones" del
  panel.

## 4. Despliegue en Hostinger

Igual que el proyecto base: directorio de salida `dist/apps/web`, variables
`VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` cargadas antes de compilar, y
el `chmod +x` ya incluido en el script `build` del `package.json` raíz para
evitar el problema de permisos de `esbuild` en Hostinger.

## 5. Qué puedes cambiar sin miedo

- Todo el contenido (hero, contacto, maquinaria, cursos, cotizaciones): desde
  `/admin`.
- Colores y tipografía: `src/index.css`.
- Menú y nombre del header/footer: `src/components/Layout.jsx`.
- El patrón de la cuadrícula asimétrica: `SPAN_PATTERN` en
  `MachineryPortfolio.jsx`.
- Las fotos de fondo (Hero, Portafolio, Capacitación, Contacto) y la galería
  animada usan las mismas 3 URLs de Supabase Storage — reemplázalas por las
  tuyas buscando `maquinariapesada` en cada componente.

## 6. Dependencia nueva: framer-motion

La galería (`src/components/Gallery.jsx`) usa `framer-motion` para el scroll
infinito y el fade-in del título al entrar en pantalla. Ya está agregada en
`apps/web/package.json`, así que `pnpm install` la trae sola — no necesitas
instalarla aparte.

## 7. Imágenes desde el panel admin

Ahora todo el contenido visual se administra desde `/admin`, pestaña
**Imágenes**:

- **Fondos de sección**: hero, portafolio de maquinaria, capacitación y
  contacto — cada uno con su propio selector de archivo. Al subir una foto,
  reemplaza la de fondo de esa sección en el sitio público al instante.
- **Galería**: agrega o quita fotos de la franja de scroll animado.
- **Maquinaria** (pestaña "Maquinaria"): cada equipo puede tener su propia
  foto — si la tiene, se muestra la foto real en vez del ícono de línea en el
  portafolio.

Las fotos se suben al bucket público `fotos` de Supabase Storage (el mismo
bucket donde ya estaban las fotos de ejemplo). El `schema.sql` crea ese
bucket automáticamente con lectura pública y escritura solo para el admin
autenticado — no hace falta crearlo a mano en el dashboard de Supabase.

Si ya tenías un proyecto de Supabase corriendo desde antes de este cambio,
corre solo la parte nueva del `schema.sql` (la sección de `storage.buckets`
y las políticas de `storage.objects`, más el `insert` de `site_content` con
`section = 'media'`) para no reinsertar lo que ya existía.
