import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Facebook, Twitter, Youtube, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { CONSERVATION_AREAS_DATA, ConservationAreaData } from '../data/conservationAreasData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function ConservationAreas() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const [selectedArea, setSelectedArea] = useState<ConservationAreaData | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // General map image (using a high quality placeholder for Costa Rica map if general)
  const generalMapImage = 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080';

  return (
    <div className="min-h-screen bg-[#f7f9f6] text-gray-800 font-sans flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-[#1E3A2B]/90 px-4 py-2 text-xs text-white/70 sm:px-6">
        <div className="mx-auto max-w-[1400px]">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-white font-medium">{isEnglish ? 'Conservation Areas' : 'Áreas de Conservación'}</span>
        </div>
      </div>

      <div className="mx-auto mb-4 w-full max-w-7xl px-4 pt-6 sm:px-10 sm:pt-8 lg:px-16">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2 rounded-full border border-gray-300 bg-white/80 px-4 py-2 text-sm font-medium text-[#4b5e26] shadow-sm transition hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4" />
          {isEnglish ? 'Back to home' : 'Volver al inicio'}
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[1400px] flex-grow px-4 pb-12 sm:px-6 sm:pb-24 lg:px-8">
        
        {/* Main SINAC-style Container */}
        <div className="flex flex-col md:flex-row bg-white shadow-xl rounded-sm overflow-hidden min-h-[800px] border border-gray-200">
          
          {/* Left Sidebar */}
          <div className="w-full md:w-[28%] lg:w-[22%] bg-[#e2e2e2] flex flex-col relative border-r border-gray-300">
            
            <AnimatePresence mode="wait">
              {!selectedArea ? (
                <motion.div 
                  key="list-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col px-5 py-8 sm:px-6 sm:py-12 lg:px-8"
                >
                  <h2 className="text-[#8cc63f] text-2xl lg:text-[28px] leading-none mb-8 font-light uppercase tracking-wider" style={{ fontFamily: 'sans-serif' }}>
                    {isEnglish ? 'Conservation Areas' : 'Áreas de Conservación'}
                  </h2>
                  <ul className="space-y-5 text-[14px] text-gray-800 font-medium">
                    {CONSERVATION_AREAS_DATA.map((area) => (
                      <li key={area.slug} className="leading-snug">
                        <button 
                          onClick={() => setSelectedArea(area)}
                          className="text-left w-full hover:text-[#8cc63f] transition-colors"
                        >
                          {isEnglish ? area.name.en : area.name.es}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div 
                  key="list-detail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col px-5 py-8 sm:px-6 sm:py-12 lg:px-8"
                >
                  <button 
                    onClick={() => setSelectedArea(null)}
                    className="flex items-center text-[#8cc63f] hover:text-[#7ab033] mb-8 text-sm font-semibold transition-colors uppercase tracking-wide bg-white/50 w-fit px-3 py-1.5 rounded-full border border-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    {isEnglish ? 'Back to Areas' : 'Volver'}
                  </button>
                  
                  <h2 className="text-[#8cc63f] text-2xl lg:text-[26px] leading-tight mb-8 font-light uppercase tracking-wider" style={{ fontFamily: 'sans-serif' }}>
                    {isEnglish ? 'Protected Wild Areas' : 'Áreas Silvestres Protegidas'}
                  </h2>
                  <ul className="space-y-5 text-[14px] text-gray-800 font-medium">
                    <li className="leading-snug hover:text-[#8cc63f] cursor-pointer transition-colors">Parque Nacional {selectedArea.name.es.split(' ').slice(2).join(' ')}</li>
                    <li className="leading-snug hover:text-[#8cc63f] cursor-pointer transition-colors">Refugio Nacional de Vida Silvestre Mixto</li>
                    <li className="leading-snug hover:text-[#8cc63f] cursor-pointer transition-colors">Reserva Biológica</li>
                    <li className="pt-6 mt-6 border-t border-gray-300 leading-snug hover:text-[#8cc63f] cursor-pointer transition-colors">
                      Mapas Áreas Silvestres Protegidas
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Icons at bottom of sidebar */}
            <div className="mt-auto p-6 lg:p-8 flex items-center justify-start gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:bg-opacity-90 transition-all shadow-md">
                <Facebook className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#55acee] text-white flex items-center justify-center hover:bg-opacity-90 transition-all shadow-md">
                <Twitter className="w-5 h-5 fill-current" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#cd201f] text-white flex items-center justify-center hover:bg-opacity-90 transition-all shadow-md">
                <Youtube className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="w-full overflow-hidden bg-white p-5 sm:p-8 lg:w-[78%] lg:p-16">
            <AnimatePresence mode="wait">
              {!selectedArea ? (
                <motion.div 
                  key="content-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full items-center justify-start"
                >
                  <div className="w-full text-left mb-16">
                    <h1 className="text-4xl font-light uppercase leading-tight tracking-wide text-[#8cc63f] sm:text-5xl lg:text-[70px]" style={{ fontFamily: 'sans-serif' }}>
                      {isEnglish ? 'Conservation Areas' : 'Áreas de Conservación'}
                    </h1>
                  </div>
                  
                  <div className="relative w-full max-w-4xl aspect-[4/3] flex-grow flex items-center justify-center">
                    <img 
                      src={generalMapImage} 
                      alt="Costa Rica Map" 
                      className="max-w-full max-h-full object-contain rounded-2xl p-2"
                    />
                    <div className="absolute bottom-[-10px] text-center w-full">
                      <span className="text-[#3b4c6b] font-bold text-lg lg:text-xl uppercase tracking-widest drop-shadow-sm">
                        {isEnglish ? 'Area of Conservation of Costa Rica' : 'Área de Conservación de Costa Rica'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="content-detail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col h-full"
                >
                  <div className="w-full text-left mb-10 border-b border-gray-100 pb-8">
                    <h1 className="text-3xl font-light uppercase leading-tight tracking-wide text-[#8cc63f] sm:text-4xl lg:text-[54px]" style={{ fontFamily: 'sans-serif' }}>
                      {isEnglish ? selectedArea.name.en : selectedArea.name.es} ({selectedArea.abbr})
                    </h1>
                  </div>
                  
                  <div className="mb-12 flex flex-col items-center justify-center gap-8 xl:flex-row xl:items-start xl:gap-12">
                    
                    {/* Area Logo (Left) */}
                    <div className="relative mt-4 flex h-40 w-40 shrink-0 items-center justify-center sm:h-48 sm:w-48 lg:h-56 lg:w-56">
                      {/* Using the image creatively as a logo block. If it's a base64 from a screenshot, we use object-position to show the left side where the logo usually is */}
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-white p-2 flex flex-col items-center justify-center group relative shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100">
                        {selectedArea.image.startsWith('data:') ? (
                           <img 
                            src={selectedArea.image} 
                            alt={`${selectedArea.abbr} Logo`}
                            className="w-full h-full object-cover object-[15%_center] scale-[1.7]"
                           />
                        ) : (
                          <>
                            <div className="w-24 h-24 rounded-full bg-[#8cc63f]/10 flex items-center justify-center mb-4">
                              <span className="text-[#8cc63f] text-4xl font-bold">{selectedArea.abbr}</span>
                            </div>
                            <span className="text-[11px] text-gray-500 text-center uppercase leading-tight font-medium">
                              {isEnglish ? 'Conservation Area' : 'Área de Conservación'}<br/>{selectedArea.abbr}
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Area Map (Right) */}
                    <div className="relative w-full max-w-2xl aspect-[4/3]">
                      <ImageWithFallback
                        src={selectedArea.image}
                        alt={`${selectedArea.abbr} Map`}
                        className={`w-full h-full shadow-sm border border-gray-100 ${selectedArea.image.startsWith('data:') ? 'object-contain bg-white p-4 object-center' : 'object-cover rounded-2xl'}`}
                      />
                      <div className="absolute -bottom-8 left-0 right-0 text-center">
                        <span className="text-gray-800 font-bold text-sm lg:text-base uppercase tracking-widest drop-shadow-sm">
                          {isEnglish ? 'Area of Conservation' : 'Área de Conservación'}<br/>"{selectedArea.name.es.split(' ').slice(2).join(' ')}"
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description Text */}
                  <div className="prose prose-lg max-w-none text-gray-700 leading-[1.8] text-[15px] lg:text-[16px] pt-12">
                    {(isEnglish ? selectedArea.description.en : selectedArea.description.es)
                      .split('\n\n')
                      .map((paragraph, idx) => (
                        <p key={idx} className="mb-6 text-justify">
                          {paragraph}
                        </p>
                    ))}
                    
                    <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium bg-gray-50 px-5 py-2.5 rounded-full border border-gray-200 shadow-sm">
                        <MapPin className="w-4 h-4 text-[#8cc63f]" />
                        {isEnglish ? selectedArea.headquarters.en : selectedArea.headquarters.es}
                      </div>
                      
                      <Link
                        to={`/area-conservacion/${selectedArea.slug}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8cc63f] hover:bg-[#7ab033] text-white font-medium py-3 px-8 transition-colors shadow-md text-sm uppercase tracking-wider"
                      >
                        {isEnglish ? 'View Full Detail' : 'Ver Detalle Completo'}
                      </Link>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
