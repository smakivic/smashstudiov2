import { LanguageProvider } from './context/LanguageContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import Intro from './components/Intro';
import ParallaxQuote from './components/ParallaxQuote';
import Sessions from './components/Sessions';
import HowItWorks from './components/HowItWorks';
import Gallery from './components/Gallery';
import Safety from './components/Safety';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import BookCTA from './components/BookCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <Intro />
        <ParallaxQuote />
        <Sessions />
        <HowItWorks />
        <Gallery />
        <Safety />
        <Testimonials />
        <Location />
        <BookCTA />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
