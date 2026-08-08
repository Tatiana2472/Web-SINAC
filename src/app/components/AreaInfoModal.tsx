import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trees, Mountain, Users } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { BookingModal } from './BookingModal';
import { useLanguage } from '../context/LanguageContext';

interface AreaInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  area: {
    name: string;
    description: string;
    hectares: string;
    parks: number;
    visitors: string;
    image: string;
  } | null;
}

export function AreaInfoModal({ isOpen, onClose, area }: AreaInfoModalProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  if (!area) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={area.image}
                  alt={area.name}
                  className={`w-full h-full ${area.image.startsWith('data:') ? 'object-contain bg-white' : 'object-cover'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-block px-3 py-1 bg-[#27C5D8]/90 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-3">
                    {isEnglish ? 'Conservation Area' : 'Área de Conservación'}
                  </div>
                  <h2 className="text-3xl font-bold text-white">{area.name}</h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-gray-700 leading-relaxed">{area.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-[#27C5D8]/10 to-[#1E3A2B]/10 rounded-xl p-4 border border-[#27C5D8]/20">
                    <Trees className="w-8 h-8 text-[#1E3A2B] mb-2" />
                    <div className="text-2xl font-bold text-[#1E3A2B]">{area.hectares}</div>
                    <div className="text-sm text-gray-600">{isEnglish ? 'Protected hectares' : 'Hectáreas protegidas'}</div>
                  </div>

                  <div className="bg-gradient-to-br from-[#27C5D8]/10 to-[#1E3A2B]/10 rounded-xl p-4 border border-[#27C5D8]/20">
                    <Mountain className="w-8 h-8 text-[#27C5D8] mb-2" />
                    <div className="text-2xl font-bold text-[#1E3A2B]">{area.parks}+</div>
                    <div className="text-sm text-gray-600">{isEnglish ? 'Protected areas' : 'Áreas protegidas'}</div>
                  </div>

                  <div className="bg-gradient-to-br from-[#27C5D8]/10 to-[#1E3A2B]/10 rounded-xl p-4 border border-[#27C5D8]/20">
                    <Users className="w-8 h-8 text-[#8B6B4A] mb-2" />
                    <div className="text-2xl font-bold text-[#1E3A2B]">{area.visitors}</div>
                    <div className="text-sm text-gray-600">{isEnglish ? 'Annual visitors' : 'Visitantes anuales'}</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-[#1E3A2B] mb-4">{isEnglish ? 'Featured areas' : 'Áreas destacadas'}</h3>
                  <div className="space-y-3">
                    {[
                      isEnglish ? 'National Parks' : 'Parques Nacionales',
                      isEnglish ? 'Wildlife Refuges' : 'Refugios de Vida Silvestre',
                      isEnglish ? 'Biological Reserves' : 'Reservas Biológicas',
                      isEnglish ? 'Protected Wetlands' : 'Humedales Protegidos',
                    ].map((item) => (
                      <div key={item} className="flex items-center space-x-3 text-gray-700">
                        <div className="w-2 h-2 bg-[#27C5D8] rounded-full" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsBookingOpen(true)}
                    className="flex-1 px-6 py-3 bg-[#27C5D8] text-white rounded-xl font-medium hover:bg-[#1fa5b5] transition-colors"
                  >
                    {isEnglish ? 'Plan your visit' : 'Planificar visita'}
                  </motion.button>

                  <Link to="/areas-conservacion" onClick={onClose} className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-6 py-3 bg-white border-2 border-[#1E3A2B] text-[#1E3A2B] rounded-xl font-medium hover:bg-[#1E3A2B] hover:text-white transition-colors text-center cursor-pointer"
                    >
                      {isEnglish ? 'See all areas' : 'Ver todas las áreas'}
                    </motion.div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
