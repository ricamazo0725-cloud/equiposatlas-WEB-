import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import MachineryPortfolio from "@/components/MachineryPortfolio";
import Gallery from "@/components/Gallery";
import Training from "@/components/Training";
import Contact from "@/components/Contact";
import { getAllSections } from "@/api/content";
import { getMachinery } from "@/api/machinery";
import { getCourses } from "@/api/courses";

// El Home se renderiza dinámico en cada visita (nunca cacheado): así los
// cambios publicados desde /admin se reflejan al instante, igual que en el
// SPA original, pero ahora el HTML llega ya renderizado para buscadores.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  let sections = {};
  let machinery = [];
  let courses = [];
  let error = null;

  try {
    [sections, machinery, courses] = await Promise.all([
      getAllSections(),
      getMachinery(),
      getCourses(),
    ]);
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-6 py-24 font-mono text-sm text-muted">
          No se pudo cargar el contenido: {error}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Hero data={sections?.hero} bgImage={sections?.media?.heroBg} />
      <MachineryPortfolio items={machinery} bgImage={sections?.media?.machineryBg} />
      <Gallery images={sections?.media?.gallery} />
      <Training items={courses} bgImage={sections?.media?.trainingBg} />
      <Contact data={sections?.contact} bgImage={sections?.media?.contactBg} />
    </Layout>
  );
}
