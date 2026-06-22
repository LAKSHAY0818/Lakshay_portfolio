import { useEffect, useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Benefits from './components/Benefits';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;

      if (!hash || hash.length <= 1) {
        return;
      }

      window.requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' });
      });
    };

    scrollToHash();
    window.addEventListener('hashchange', scrollToHash);

    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  if (loading) {
    return <Preloader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
        </div>
        <div style={{ position: 'relative', zIndex: 10, backgroundColor: 'var(--bg)' }}>
          <About />
          <Work />
          <Benefits />
          <Footer />
        </div>
      </main>
    </>
  );
}

export default App;
