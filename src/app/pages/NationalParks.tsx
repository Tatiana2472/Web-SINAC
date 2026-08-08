import { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Map as MapIcon, Search, Filter } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { getNationalParks, getDestinations, getServices, getAttractions } from '../data/nationalParksData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import logoSinac from '@/assets/Logo-SINAC.png';

export function NationalParks() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'EN';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (item: string, list: string[], setList: (val: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const destinations = getDestinations(isEnglish);
  const services = getServices(isEnglish);
  const attractions = getAttractions(isEnglish);
  const parksList = getNationalParks(isEnglish);

  const filteredParks = useMemo(() => {
    return parksList.filter(park => {
      const matchesSearch = park.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            park.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDestinations = selectedDestinations.length === 0 || 
                                  selectedDestinations.every(d => park.destinations.includes(d));
      
      const matchesServices = selectedServices.length === 0 || 
                              selectedServices.every(s => park.services.includes(s));
      
      const matchesAttractions = selectedAttractions.length === 0 || 
                                 selectedAttractions.every(a => park.attractions.includes(a));

      return matchesSearch && matchesDestinations && matchesServices && matchesAttractions;
    });
  }, [searchTerm, selectedDestinations, selectedServices, selectedAttractions, parksList]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navigation />
      {/* Breadcrumb */}
      <div className="bg-[#0f172a]/90 text-white/50 text-xs px-6 py-2 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-white/80">{isEnglish ? 'National Parks' : 'Parques Nacionales'}</span>
        </div>
      </div>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-[#8fe8e5] transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEnglish ? 'Back to home' : 'Volver al inicio'}
          </Link>
        </div>

        <div className="mb-10 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-lg sm:h-24 sm:w-24">
              <img src={logoSinac} alt="SINAC Logo" className="h-full w-full rounded-full object-contain" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#27C5D8]">
                {isEnglish ? 'Discover our National Parks' : 'Descubra nuestros Parques Nacionales'}
              </h1>
            </div>
          </div>
          <p className="max-w-3xl mx-auto text-lg text-slate-300">
            {isEnglish 
              ? 'Find your favorite destination by choosing the attractions and services you would like to enjoy. We will give you the best option to visit and discover the experience of a lifetime.' 
              : 'Descubra su destino favorito, eligiendo los atractivos y servicios que le gustaría disfrutar. Nosotros le daremos la mejor opción para visitar y descubrir la experiencia de su vida.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-[#27C5D8]" />
                  {isEnglish ? 'Filters' : 'Filtros'}
                </h2>
                <button 
                  className="lg:hidden text-slate-400 hover:text-white"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>

              <div className={`space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={isEnglish ? 'Search park...' : 'Buscar parque...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#27C5D8]"
                    />
                  </div>
                </div>

                {/* Destinations */}
                <div>
                  <h3 className="text-sm font-medium text-[#27C5D8] mb-3 uppercase tracking-wider">
                    {isEnglish ? 'Destinations' : 'Destinos'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {destinations.map(dest => (
                      <button
                        key={dest}
                        onClick={() => toggleFilter(dest, selectedDestinations, setSelectedDestinations)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          selectedDestinations.includes(dest) 
                            ? 'bg-[#27C5D8] text-black font-medium' 
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Attractions */}
                <div>
                  <h3 className="text-sm font-medium text-[#27C5D8] mb-3 uppercase tracking-wider">
                    {isEnglish ? 'Attractions' : 'Atractivos'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {attractions.map(attr => (
                      <button
                        key={attr}
                        onClick={() => toggleFilter(attr, selectedAttractions, setSelectedAttractions)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          selectedAttractions.includes(attr) 
                            ? 'bg-[#27C5D8] text-black font-medium' 
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {attr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-sm font-medium text-[#27C5D8] mb-3 uppercase tracking-wider">
                    {isEnglish ? 'Services' : 'Servicios'}
                  </h3>
                  <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {services.map(service => (
                      <label key={service} className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(service)}
                            onChange={() => toggleFilter(service, selectedServices, setSelectedServices)}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 rounded border border-white/20 bg-black/20 peer-checked:bg-[#27C5D8] peer-checked:border-[#27C5D8] transition-colors flex items-center justify-center">
                            <motion.svg
                              initial={false}
                              animate={{ scale: selectedServices.includes(service) ? 1 : 0 }}
                              className="w-3.5 h-3.5 text-black"
                              viewBox="0 0 14 14"
                              fill="none"
                            >
                              <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
                            </motion.svg>
                          </div>
                        </div>
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors select-none">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-slate-400 text-sm">
                {isEnglish ? `Showing ${filteredParks.length} results` : `Mostrando ${filteredParks.length} resultados`}
              </p>
              {(selectedDestinations.length > 0 || selectedServices.length > 0 || selectedAttractions.length > 0 || searchTerm) && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedDestinations([]);
                    setSelectedServices([]);
                    setSelectedAttractions([]);
                  }}
                  className="text-sm text-[#27C5D8] hover:text-white transition-colors underline"
                >
                  {isEnglish ? 'Clear all filters' : 'Limpiar filtros'}
                </button>
              )}
            </div>

            {filteredParks.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                <MapIcon className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-medium mb-2">
                  {isEnglish ? 'No parks found' : 'No se encontraron parques'}
                </h3>
                <p className="text-slate-400">
                  {isEnglish ? 'Try adjusting your filters to see more results.' : 'Intente ajustar sus filtros para ver más resultados.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredParks.map((park) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      key={park.id}
                      className="group rounded-[24px] border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition-colors flex flex-col"
                    >
                      <div className="h-48 w-full overflow-hidden relative">
                        <ImageWithFallback
                          src={park.image}
                          alt={park.name}
                          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                          {park.destinations.map(d => (
                            <span key={d} className="bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] uppercase font-bold text-white tracking-wider">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-[#27C5D8] transition-colors">{park.name}</h3>
                        <p className="text-sm text-slate-300 mb-6 flex-1 line-clamp-3">
                          {park.description}
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-semibold mb-2">
                              {isEnglish ? 'Top Attractions' : 'Atractivos Principales'}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {park.attractions.slice(0, 3).map(a => (
                                <span key={a} className="text-xs text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                                  {a}
                                </span>
                              ))}
                              {park.attractions.length > 3 && (
                                <span className="text-xs text-slate-400 px-1">+{park.attractions.length - 3}</span>
                              )}
                            </div>
                          </div>
                          
                          <button className="w-full py-3 rounded-xl bg-white/10 group-hover:bg-[#27C5D8] group-hover:text-black font-medium transition-colors text-sm">
                            {isEnglish ? 'View Details' : 'Ver Detalles'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(39, 197, 216, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(39, 197, 216, 0.8);
        }
      `}</style>
      <Footer />
    </div>
  );
}
