-- Ejecutar en el SQL Editor del proyecto de Supabase.

create extension if not exists "pgcrypto";

create table if not exists site_content (
  section text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists machinery_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('grua', 'telehandler', 'camabaja')),
  capacity_tons numeric,
  description text,
  image_url text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists course_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  duration text,
  description text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text not null,
  equipment text,
  message text,
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table site_content enable row level security;
alter table machinery_items enable row level security;
alter table course_items enable row level security;
alter table quote_requests enable row level security;

-- Lectura pública del contenido del sitio
create policy "public read site_content" on site_content for select using (true);
create policy "public read machinery_items" on machinery_items for select using (true);
create policy "public read course_items" on course_items for select using (true);

-- Escritura solo para el admin autenticado
create policy "admin write site_content" on site_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write machinery_items" on machinery_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write course_items" on course_items
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Cotizaciones: cualquier visitante puede crear una solicitud, pero solo el admin puede leerlas/actualizarlas
create policy "public insert quote_requests" on quote_requests for insert with check (true);
create policy "admin read quote_requests" on quote_requests
  for select using (auth.role() = 'authenticated');
create policy "admin update quote_requests" on quote_requests
  for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Storage: bucket público "fotos" para las imágenes que se suben desde el panel admin
insert into storage.buckets (id, name, public)
values ('fotos', 'fotos', true)
on conflict (id) do nothing;

create policy "public read fotos" on storage.objects
  for select using (bucket_id = 'fotos');
create policy "admin upload fotos" on storage.objects
  for insert with check (bucket_id = 'fotos' and auth.role() = 'authenticated');
create policy "admin update fotos" on storage.objects
  for update using (bucket_id = 'fotos' and auth.role() = 'authenticated');
create policy "admin delete fotos" on storage.objects
  for delete using (bucket_id = 'fotos' and auth.role() = 'authenticated');

-- Contenido inicial de ejemplo (bórralo o edítalo desde el panel admin)
insert into site_content (section, data) values
  ('hero', '{
    "eyebrow": "Izaje de carga · Maquinaria amarilla · Colombia",
    "title": "Potencia y precisión para tu proyecto industrial",
    "subtitle": "Alquiler de grúas telescópicas, telehandlers y camabajas, con equipos y operadores certificados a nivel nacional.",
    "maxCapacity": "100",
    "whatsapp": "573000000000"
  }'::jsonb),
  ('contact', '{
    "whatsapp": "573000000000",
    "whatsappMessage": "Hola, quiero cotizar el alquiler de un equipo.",
    "email": "contacto@equiposatlas.com"
  }'::jsonb),
  ('media', '{
    "heroBg": "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg",
    "machineryBg": "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg",
    "trainingBg": "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada2.jpg",
    "contactBg": "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada3.jpg",
    "gallery": [
      "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada2.jpg",
      "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada3.jpg",
      "https://wzkuypovnxxoaylyjwgm.supabase.co/storage/v1/object/public/fotos/maquinariapesada5.jpg"
    ]
  }'::jsonb)
on conflict (section) do nothing;

insert into machinery_items (name, category, capacity_tons, description, order_index) values
  ('Grúa telescópica RT', 'grua', 100, 'Terreno agreste, dirección en las 4 ruedas, alcance de hasta 56 metros con aguilón.', 0),
  ('Telehandler todoterreno', 'telehandler', 5, 'Manipulador telescópico para carga y descarga en sitios de difícil acceso.', 1),
  ('Camabaja hidráulica', 'camabaja', 40, 'Transporte de maquinaria pesada y carga extradimensionada a nivel nacional.', 2)
on conflict do nothing;

insert into course_items (title, duration, description, order_index) values
  ('Operación de grúas telescópicas', '40 horas', 'Formación certificada para operar grúas de hasta 100 toneladas con seguridad en izaje.', 0),
  ('Manejo de telehandlers', '24 horas', 'Curso práctico para manipuladores telescópicos en obra y almacenamiento.', 1)
on conflict do nothing;
