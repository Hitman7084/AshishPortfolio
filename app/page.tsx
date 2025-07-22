'use client';
import Hero from '../components/hero';
import About from '../components/about';
import Expertise from '../components/expertise';
import Projects from '../components/projects';
import Contact from '../components/contact';
import Footer from '../components/footer';
import Header from '../components/header';
import Scroll from '../components/scroll';

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
        <Scroll />
      </main>
    </>
  );
}