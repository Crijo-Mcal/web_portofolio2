import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Experiencia from "@/components/Experiencia";
import Competencias from "@/components/Competencias";
import Projetos from "@/components/Projetos";
import Contactos from "@/components/Contactos";
import Footer from "@/components/Footer";
import { getSite } from "@/lib/data";

export default function Home() {
  const site = getSite();
  return (
    <>
      <Header emailUrl={site.emailUrl} />
      <main>
        <Hero cvUrl={site.cvAvailable ? site.cvUrl : undefined} />
        <Sobre />
        <Experiencia />
        <Competencias />
        <Projetos />
        <Contactos site={site} />
      </main>
      <Footer />
    </>
  );
}
