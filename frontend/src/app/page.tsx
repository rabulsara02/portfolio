import {
  Navbar,
  Hero,
  About,
  Skills,
  Projects,
  Contact,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
