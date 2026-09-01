import { getPortfolioData } from "@/lib/portfolioData";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const data = getPortfolioData();

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-primary/30 selection:text-white">
      {/* Global abstract grid background */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>
      
      <Navbar />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Skills data={data.skills} />
      <Certifications data={data.certifications} />
      <Education data={data.education} certs={data.educationCerts} />
      <Footer />
    </main>
  );
}
