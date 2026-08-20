import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import MachineryPortfolio from "@/components/MachineryPortfolio";
import Gallery from "@/components/Gallery";
import Training from "@/components/Training";
import Contact from "@/components/Contact";
import { getAllSections } from "@/api/content";
import { getMachinery } from "@/api/machinery";
import { getCourses } from "@/api/courses";

export default function HomePage() {
  const [sections, setSections] = useState(null);
  const [machinery, setMachinery] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getAllSections(), getMachinery(), getCourses()])
      .then(([sectionsData, machineryData, coursesData]) => {
        setSections(sectionsData);
        setMachinery(machineryData);
        setCourses(coursesData);
      })
      .catch((err) => setError(err.message));
  }, []);

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
