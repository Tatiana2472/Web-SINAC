import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Footprints, Waves, Trees, Camera, Orbit } from 'lucide-react';
import { BookingModal } from './BookingModal';
import { useLanguage } from '../context/LanguageContext';

export function QuickAccess() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  const quickAccessItems = [
    {
      icon: MapPin,
      title: isEnglish ? 'Rates and Schedules' : 'Tarifas y Horarios',
      description: isEnglish
        ? 'Check the opening hours, park capacity, and official entrance fees.'
        : 'Consulte los horarios de apertura, capacidad del parque y las tarifas de ingreso oficiales.',
      buttonLabel: isEnglish ? 'View details' : 'Ver detalles',
      accent: 'from-[#27C5D8] to-[#1E3A2B]',
      action: 'plan',
    },
    {
      icon: Footprints,
      title: isEnglish ? 'Trails and routes' : 'Senderos y recorridos',
      description: isEnglish
        ? 'Discover the available trails, difficulty levels, and main points of interest in the park.'
        : 'Conozca los senderos disponibles, niveles de dificultad y principales puntos de interés del parque.',
      buttonLabel: isEnglish ? 'Explore trails' : 'Explorar senderos',
      accent: 'from-[#1E3A2B] to-[#4F7A5C]',
      action: 'trails',
    },
    {
      icon: Waves,
      title: isEnglish ? 'Celeste River and natural attractions' : 'Río Celeste y atractivos naturales',
      description: isEnglish
        ? 'Discover the waterfall, teñideros, blue lagoon, and other emblematic attractions of the park.'
        : 'Descubra la catarata, teñideros, laguna azul y otros atractivos emblemáticos del parque.',
      buttonLabel: isEnglish ? 'Discover attractions' : 'Conocer atractivos',
      accent: 'from-[#27C5D8] to-[#3B82F6]',
      action: 'attractions',
    },
    {
      icon: Trees,
      title: isEnglish ? 'Flora and fauna' : 'Flora y fauna',
      description: isEnglish
        ? 'Explore the biodiversity of Volcán Tenorio National Park and its protected species.'
        : 'Explore la biodiversidad del Parque Nacional Volcán Tenorio y sus especies protegidas.',
      buttonLabel: isEnglish ? 'See biodiversity' : 'Ver biodiversidad',
      accent: 'from-[#4F7A5C] to-[#1E3A2B]',
      action: 'biodiversity',
    },
    {
      icon: Camera,
      title: isEnglish ? 'Multimedia gallery' : 'Galería multimedia',
      description: isEnglish
        ? 'Explore photographs and videos of the park’s natural landscapes.'
        : 'Explore fotografías y videos de los paisajes naturales del parque.',
      buttonLabel: isEnglish ? 'View gallery' : 'Ver galería',
      accent: 'from-[#8B6B4A] to-[#27C5D8]',
      action: 'gallery',
    },
    {
      icon: Orbit,
      title: isEnglish ? '360° virtual tour' : 'Recorrido virtual 360°',
      description: isEnglish
        ? 'Experience an immersive journey through the natural environment through digital resources.'
        : 'Viva una experiencia inmersiva del entorno natural mediante recursos digitales.',
      buttonLabel: isEnglish ? 'Explore' : 'Explorar',
      accent: 'from-[#27C5D8] to-[#8B6B4A]',
      action: 'virtual',
    },
  ];

  const handleCardAction = (action: string) => {
    if (action === 'plan') {
      setIsBookingModalOpen(true);
      return;
    }

    const targetMap: Record<string, string> = {
      trails: 'gallery',
      attractions: 'gallery',
      biodiversity: 'news',
      gallery: 'gallery',
      virtual: 'contact',
    };

    const targetId = targetMap[action];
    if (!targetId) return;

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="visit" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A2B] mb-4">
            {isEnglish ? 'Quick access' : 'Acceso Rápido'}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {isEnglish
              ? 'A practical planning experience for visitors who want to discover the park with confidence and ease.'
              : 'Una experiencia práctica de planificación para visitantes que desean descubrir el parque con confianza y facilidad.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {quickAccessItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => handleCardAction(item.action)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02, rotateX: 1, rotateY: -1 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-7 text-left shadow-[0_20px_60px_-20px_rgba(30,58,43,0.35)] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_24px_80px_-24px_rgba(39,197,216,0.45)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-transparent" />
                <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-gradient-to-br from-[#27C5D8]/15 to-[#1E3A2B]/10 blur-3xl" />

                <div className="relative z-10">
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-lg`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-[#1E3A2B] transition-colors group-hover:text-[#27C5D8]">
                    {item.title}
                  </h3>

                  <p className="text-gray-600">{item.description}</p>

                  <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#27C5D8]/20 bg-[#27C5D8]/10 px-4 py-2 text-sm font-semibold text-[#27C5D8] transition-colors group-hover:bg-[#27C5D8] group-hover:text-white">
                    <span>{item.buttonLabel}</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#27C5D8] to-[#1E3A2B] transition-transform duration-300 group-hover:scale-x-100" />
              </motion.button>
            );
          })}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </section>
  );
}
