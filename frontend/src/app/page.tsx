import {
  Nav,
  Hero,
  About,
  Experience,
  Projects,
  Skills,
  Contact,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
