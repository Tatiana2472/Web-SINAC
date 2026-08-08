import { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { QuickAccess } from '../components/QuickAccess';
import { ConservationMap } from '../components/ConservationMap';
import { Statistics } from '../components/Statistics';
import { VolcanTenorioFeature } from '../components/VolcanTenorioFeature';
import { NewsAndEvents } from '../components/NewsAndEvents';
import { MultimediaGallery } from '../components/MultimediaGallery';
import { Footer } from '../components/Footer';

export function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '#') {
      setTimeout(() => {
        if (hash === '#gallery') {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        } else {
          const element = document.getElementById(hash.replace('#', ''));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <QuickAccess />
        <ConservationMap />
        <Statistics />
        <VolcanTenorioFeature />
        <NewsAndEvents />
        <MultimediaGallery />
      </main>
      <Footer />
    </div>
  );
}
