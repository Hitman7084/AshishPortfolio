'use client';
import Hero from '../components/hero';
import About from '@/components/About';
import Expertise from '@/components/Expertise';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';

export default function Home() {
  return (
    <>
      <Header />
      <main className="scroll-smooth">
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Contact />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
}