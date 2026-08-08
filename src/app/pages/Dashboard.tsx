import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import logoSinac from '@/assets/Logo-SINAC.png';
import { MapPin, Phone, Mail, ExternalLink, Globe, Database, X, Users, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import { dbService, Reservacion } from '../../services/dbService';

import { CONSERVATION_AREAS_DATA } from '../data/conservationAreasData';

const getWazeUrl = (area: any) =>
  `https://www.waze.com/ul?q=${encodeURIComponent(`${area.name} ${area.headquarters} ${area.address ?? ''} Costa Rica`)}`;

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);
  const [reservations, setReservations] = useState<Reservacion[]>([]);
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'EN';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (isReservationsOpen) {
      dbService.getReservations().then(setReservations);
    }
  }, [isReservationsOpen]);

  const mappedAreas = CONSERVATION_AREAS_DATA.map(area => ({
    ...area,
    name: isEnglish ? `${area.name.en.toUpperCase()} (${area.abbr})` : `${area.name.es.toUpperCase()} (${area.abbr})`,
    headquarters: isEnglish ? area.headquarters.en : area.headquarters.es,
    address: area.address ? (isEnglish ? area.address.en : area.address.es) : undefined,
    note: area.note ? (isEnglish ? area.note.en : area.note.es) : undefined,
    url: area.mapUrl
  }));

  const [selectedArea, setSelectedArea] = useState(mappedAreas[0]);

  const filteredAreas = mappedAreas.filter(area =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeArea = filteredAreas.find(area => area.name === selectedArea.name) ?? filteredAreas[0] ?? mappedAreas[0];

  return (
    <div className="min-h-screen overflow-hidden bg-[#111827] font-sans text-white flex flex-col">
      <Navigation />
      {/* Breadcrumb */}
      <div className="bg-[#111827]/90 text-white/50 text-xs px-6 py-2 border-b border-white/10">
        <div className="mx-auto max-w-7xl">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <Link to="/areas-conservacion" className="hover:text-white">{isEnglish ? 'Conservation Areas' : 'Áreas de Conservación'}</Link>
          <span className="mx-1">/</span>
          <span className="text-white/80">{isEnglish ? 'Dashboard' : 'Panel'}</span>
        </div>
      </div>
      {/* Navigation Bar */}
      <header className="flex min-h-20 shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#374151] bg-[#1F2937]/80 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden p-1.5 shadow-md shrink-0">
            <img src={logoSinac} alt="SINAC Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="h-8 w-[1px] bg-gray-600 hidden sm:block"></div>
          <h1 className="hidden text-xl font-semibold tracking-wide text-gray-200 sm:block">
            {isEnglish ? 'Conservation Areas Dashboard' : 'Panel de Áreas de Conservación'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsReservationsOpen(true)}
            className="flex items-center gap-2 rounded-full border border-[#00CED1]/40 bg-[#00CED1]/20 px-3 py-2 text-sm font-medium text-[#00CED1] shadow-[0_0_15px_rgba(0,206,209,0.2)] transition-all hover:bg-[#00CED1]/30 sm:px-4"
          >
            <Database className="w-4 h-4" />
            <span>{isEnglish ? 'Database Reservations' : 'Reservaciones BD'}</span>
          </button>

          <Link to="/" className="hidden text-sm text-gray-400 transition-colors hover:text-[#00CED1] sm:block">
            {isEnglish ? 'Back to Home' : 'Volver al Inicio'}
          </Link>
        </div>
      </header>

      {/* Main Layout 2-Column Split */}
      <main className="flex flex-1 flex-col overflow-visible lg:flex-row lg:overflow-hidden">
        
        {/* LEFT COLUMN: Scrollable Content Viewport (40%) */}
        <section className="h-auto w-full overflow-visible bg-gradient-to-b from-[#111827] to-[#0B0F19] p-4 sm:p-6 lg:h-full lg:w-[40%] lg:overflow-y-auto lg:p-8 xl:w-[45%] custom-scrollbar">
          <div className="max-w-2xl mx-auto space-y-8 pb-20">
            
            <div className="mb-10">
              <h2 className="text-sm font-bold tracking-widest text-[#00CED1] uppercase mb-2">
                {isEnglish ? 'Official Directory' : 'Directorio Oficial'}
              </h2>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {isEnglish ? 'Conservation Areas of Costa Rica' : 'Áreas de Conservación de Costa Rica'}
              </h3>
              <p className="mt-4 text-gray-400 text-base leading-relaxed">
                {isEnglish
                  ? 'Browse all 11 SINAC conservation areas at a glance, select one to view its administrative headquarters and open Waze or Google Maps for directions.'
                  : 'Consulte de un vistazo las 11 áreas de conservación del SINAC, seleccione una para ver su sede administrativa y abra Waze o Google Maps para llegar con facilidad.'}
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative mb-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder={isEnglish ? 'Search by name or headquarters...' : 'Buscar por nombre o sede...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1F2937]/50 border border-gray-700/60 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00CED1] focus:ring-1 focus:ring-[#00CED1] transition-all text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredAreas.length > 0 ? (
                filteredAreas.map((area, idx) => {
                  const isActive = activeArea.name === area.name;

                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      key={area.name}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedArea(area)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelectedArea(area);
                        }
                      }}
                      className={`group relative bg-[#1F2937]/40 backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300 shadow-xl cursor-pointer ${
                        isActive ? 'border-[#00CED1]/70 ring-1 ring-[#00CED1]/30' : 'border-gray-700/50 hover:border-[#00CED1]/50'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden p-1.5 shadow-md shrink-0">
                              <img src={logoSinac} alt="SINAC Logo" className="w-full h-full object-contain rounded-full" />
                            </div>
                            <h4 className="text-xl font-bold text-white leading-snug">
                              {area.name}
                            </h4>
                          </div>
                          {isActive && (
                            <span className="rounded-full border border-[#00CED1]/40 bg-[#00CED1]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#00CED1] shrink-0">
                              {isEnglish ? 'Selected' : 'Seleccionada'}
                            </span>
                          )}
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-[#00CED1] shrink-0 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-gray-300">{isEnglish ? 'HQ:' : 'Sede:'} {area.headquarters}</div>
                              {area.address && (
                                <div className="text-sm text-gray-500 mt-1">{area.address}</div>
                              )}
                            </div>
                          </div>

                          {(area.phone || area.email) && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-2 border-t border-gray-700/50">
                              {area.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-emerald-400" />
                                  <span className="text-sm text-gray-300">{area.phone}</span>
                                </div>
                              )}
                              {area.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-emerald-400" />
                                  <span className="text-sm text-gray-300">{area.email}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {area.note && (
                            <div className="flex items-start gap-2 pt-2">
                              <Globe className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span className="text-sm italic text-amber-200/80">{area.note}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                          <a
                            href={getWazeUrl(area)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#00CED1]/30 bg-[#00CED1]/10 px-4 py-3 text-sm font-semibold text-[#00CED1] transition-all duration-300 hover:bg-[#00CED1]/20"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>{isEnglish ? 'Open Waze' : 'Ir a Waze'}</span>
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                          <a
                            href={area.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 bg-[#00CED1] hover:bg-[#00b2b5] text-[#0B0F19] font-bold py-3 px-4 rounded-xl transition-all duration-300 active:scale-[0.98] shadow-[0_4px_14px_rgba(0,206,209,0.3)] hover:shadow-[0_6px_20px_rgba(0,206,209,0.4)]"
                          >
                            <MapPin className="w-4 h-4" />
                            <span>Google Maps</span>
                            <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
              <div className="text-center py-10 bg-[#1F2937]/20 border border-dashed border-gray-700 rounded-2xl">
                <p className="text-gray-400">
                  {isEnglish
                    ? 'No conservation areas matched your search.'
                    : 'No se encontraron áreas de conservación que coincidan con la búsqueda.'}
                </p>
              </div>
            )}
            </div>
            
          </div>
        </section>

        {/* RIGHT COLUMN: Selected Area Overview (60%) */}
        <section className="hidden lg:block lg:w-[60%] xl:w-[55%] relative bg-[#1F2937]">
          <div className="absolute inset-0">
            <ImageWithFallback
              src={activeArea.image}
              alt={`Vista de ${activeArea.name}`}
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-[#111827]/70 via-[#111827]/30 to-[#111827] pointer-events-none" />
            <div className="absolute inset-0 bg-[#00CED1]/5 mix-blend-overlay pointer-events-none" />
          </div>

          <div className="relative z-10 flex h-full items-end p-8">
            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#00CED1] shadow-[0_0_8px_#00CED1]"></div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00CED1]">{isEnglish ? 'Quick view' : 'Vista rápida'}</h4>
              </div>
              <h3 className="text-2xl font-bold text-white leading-snug">{activeArea.name}</h3>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                {isEnglish ? 'Administrative HQ:' : 'Sede administrativa:'} {activeArea.headquarters}
              </p>

              <div className="mt-5 space-y-3 text-sm text-gray-300">
                {activeArea.address && (
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#00CED1] mt-0.5 shrink-0" />
                    <span>{activeArea.address}</span>
                  </p>
                )}
                {activeArea.phone && (
                  <p className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{activeArea.phone}</span>
                  </p>
                )}
                {activeArea.email && (
                  <p className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{activeArea.email}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={getWazeUrl(activeArea)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-[#00CED1]/30 bg-[#00CED1]/10 px-4 py-2 text-sm font-semibold text-[#00CED1] transition-all hover:bg-[#00CED1]/20"
                >
                  <MapPin className="w-4 h-4" />
                  <span>{isEnglish ? 'Open Waze' : 'Ir a Waze'}</span>
                </a>
                <a
                  href={activeArea.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#00CED1] px-4 py-2 text-sm font-semibold text-[#0B0F19] transition-all hover:bg-[#00b2b5]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{isEnglish ? 'View on Google Maps' : 'Ver en Google Maps'}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(55, 65, 81, 1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(75, 85, 99, 1);
        }
      `}</style>
      <AnimatePresence>
        {isReservationsOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1F2937] border border-[#374151] rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#374151] bg-[#111827]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00CED1]/10 rounded-lg text-[#00CED1]">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {isEnglish ? 'Database Reservations (SINAC)' : 'Base de Datos: Registro de Reservaciones'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {isEnglish ? 'Live query from SQLite / Local Database' : 'Consulta en tiempo real guardada en la Base de Datos'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsReservationsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
                {reservations.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <Database className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#00CED1]" />
                    <p className="text-base font-medium">
                      {isEnglish ? 'No reservations stored in the database yet.' : 'No hay reservaciones registradas aún en la base de datos.'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {isEnglish ? 'Try creating a reservation from the website modal.' : 'Realice una reserva desde el formulario del sitio para probar el registro.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300 border-collapse">
                      <thead>
                        <tr className="border-b border-gray-700 bg-gray-900/60 text-xs uppercase text-[#00CED1] tracking-wider">
                          <th className="py-3 px-4">Código BD</th>
                          <th className="py-3 px-4">Visitante</th>
                          <th className="py-3 px-4">Contacto</th>
                          <th className="py-3 px-4">Parque</th>
                          <th className="py-3 px-4">Fecha</th>
                          <th className="py-3 px-4">Personas</th>
                          <th className="py-3 px-4">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {reservations.map((res, index) => (
                          <tr key={res.id || index} className="hover:bg-gray-800/50 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-white text-xs">
                              {res.codigo_reserva || `SINAC-00${res.id}`}
                            </td>
                            <td className="py-3 px-4 font-medium text-white">{res.nombre_visitante}</td>
                            <td className="py-3 px-4 text-xs">
                              <div>{res.email_visitante}</div>
                              <div className="text-gray-500">{res.telefono_visitante || 'N/A'}</div>
                            </td>
                            <td className="py-3 px-4 text-xs text-gray-300">{res.parque_id}</td>
                            <td className="py-3 px-4 text-xs font-mono">{res.fecha_visita}</td>
                            <td className="py-3 px-4 text-center font-bold text-[#00CED1]">
                              {res.cantidad_visitantes}
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                <CheckCircle className="w-3 h-3" />
                                {res.estado || 'Confirmada'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#374151] bg-[#111827] flex justify-between items-center text-xs text-gray-400">
                <span>Total Registros BD: <strong className="text-white">{reservations.length}</strong></span>
                <button
                  onClick={() => setIsReservationsOpen(false)}
                  className="px-4 py-2 bg-[#00CED1] text-black font-semibold rounded-lg hover:bg-[#00b2b5] transition-all"
                >
                  {isEnglish ? 'Close Window' : 'Cerrar Ventana'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}
