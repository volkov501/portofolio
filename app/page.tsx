import { getPortfolioData } from "@/lib/portfolioData";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getPortfolioData();

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden selection:bg-white selection:text-black">
      
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Education data={data.education} certs={data.educationCerts} />
      <Footer />
    </main>
  );
}
