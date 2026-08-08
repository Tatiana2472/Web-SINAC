import { useState } from 'react';
import { motion } from 'motion/react';
import { Droplets, Mountain, Trees, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { BookingModal } from './BookingModal';
import { RecommendationsModal } from './RecommendationsModal';
import { useLanguage } from '../context/LanguageContext';

const getFeatures = (language: 'ES' | 'EN') => [
  {
    icon: Droplets,
    title: language === 'EN' ? 'Celeste River Waterfall' : 'Catarata Río Celeste',
    description:
      language === 'EN'
        ? 'This waterfall, approximately 20 meters high, has become the main attraction due to its bluish coloration.'
        : 'Esta caída de agua, que tiene una altura aproximada de 20 metros, se ha convertido en el principal atractivo por su coloración azulada.',
    image:
      'https://images.unsplash.com/photo-1602948577571-896d79713b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },

  {
    icon: Sparkles,
    title: language === 'EN' ? 'Blue Lagoon' : 'La laguna azul',
    description:
      language === 'EN'
        ? 'Small pool of intense color.'
        : 'Pequeña poza de color intenso.',
    image:
      'https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Sparkles,
    title: language === 'EN' ? 'Boiling Mud' : 'Los borbollones',
    description:
      language === 'EN'
        ? 'These are fissures and cracks through which high-temperature gases from the local volcanic activity escape.'
        : 'Son fisuras y grietas por donde se escapan, a alta temperatura, gases propios de la actividad volcánica del lugar.',
    image:
      'https://images.unsplash.com/photo-1620658927695-c33df6fb8130?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    icon: Trees,
    title: language === 'EN' ? 'Teñidero' : 'El Teñidero',
    description:
      language === 'EN'
        ? 'The point where the phenomenon that gives the sky-blue coloration to the river begins. This is the only place where you can see the change in coloration.'
        : 'Punto donde se inicia el fenómeno que da el efecto de coloración celeste al río. Desde muchos otros sectores se puede apreciar el color turquesa del agua, pero este es el único sitio donde se aprecia el cambio en la coloración.',
    image:
      'https://images.unsplash.com/photo-1612452816734-05a1ea3da9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxDb3N0YSUyMFJpY2ElMjBjb25zZXJ2YXRpb24lMjBwcm90ZWN0ZWQlMjBhcmVhcyUyMG5hdHVyZXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function VolcanTenorioFeature() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);
  const { language } = useLanguage();
  const features = getFeatures(language);

  return (
    <section id="volcan-tenorio-feature" className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#27C5D8]/10 border border-[#27C5D8]/20 rounded-full text-[#27C5D8] text-sm font-medium mb-4">
            {language === 'EN' ? 'Natural Wonder' : 'Maravilla Natural'}
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A2B] mb-4">
            {language === 'EN' ? 'Volcán Tenorio National Park' : 'Parque Nacional Volcán Tenorio'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'EN'
              ? 'Home to the mythical Celeste River, one of the most impressive natural phenomena in Costa Rica'
              : 'Hogar del mítico Río Celeste, uno de los fenómenos naturales más impresionantes de Costa Rica'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl group"
          >
            <div className="aspect-[3/4] lg:aspect-auto lg:h-[600px]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Río Celeste Waterfall"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h3 className="text-3xl font-bold mb-2">
                {language === 'EN' ? 'The Celeste River Phenomenon' : 'El Fenómeno del Río Celeste'}
              </h3>
              <p className="text-white/90">
                {language === 'EN'
                  ? 'The chemical reaction between sulfur minerals and calcium carbonate creates the characteristic turquoise color'
                  : 'La reacción química entre minerales de azufre y carbonato de calcio crea el característico color turquesa'}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-[#27C5D8]/10 to-[#1E3A2B]/10 rounded-3xl p-8 border border-[#27C5D8]/20">
              <h3 className="text-2xl font-bold text-[#1E3A2B] mb-4">
                {language === 'EN' ? 'Park Information' : 'Información del Parque'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#27C5D8] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[#1E3A2B]">{language === 'EN' ? 'Area' : 'Extensión'}</div>
                    <div className="text-gray-600">{language === 'EN' ? '18,402 hectares of tropical forest' : '18,402 hectáreas de bosque tropical'}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#27C5D8] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[#1E3A2B]">{language === 'EN' ? 'Altitude' : 'Altitud'}</div>
                    <div className="text-gray-600">{language === 'EN' ? '600 to 1,916 meters above sea level' : '600 a 1,916 metros sobre el nivel del mar'}</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#27C5D8] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[#1E3A2B]">{language === 'EN' ? 'Biodiversity' : 'Biodiversidad'}</div>
                    <div className="text-gray-600">
                      {language === 'EN'
                        ? 'More than 250 bird species and 100 mammal species'
                        : 'Más de 250 especies de aves y 100 especies de mamíferos'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#27C5D8] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-[#1E3A2B]">{language === 'EN' ? 'Hours' : 'Horario'}</div>
                    <div className="text-gray-600">{language === 'EN' ? '8:00 AM - 2:00 PM (last admission)' : '8:00 AM - 2:00 PM (último ingreso)'}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookingModalOpen(true)}
                className="flex-1 px-8 py-4 bg-[#27C5D8] text-white rounded-xl font-medium text-lg hover:bg-[#1fa5b5] transition-colors shadow-lg"
              >
                {language === 'EN' ? 'Book entry' : 'Reservar entrada'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRecommendationsModalOpen(true)}
                className="flex-1 px-8 py-4 bg-white border-2 border-[#1E3A2B] text-[#1E3A2B] rounded-xl font-medium text-lg hover:bg-[#1E3A2B] hover:text-white transition-colors shadow-lg"
              >
                {language === 'EN' ? 'Learn more' : 'Ver más información'}
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="absolute top-4 left-4">
                  <div className="w-12 h-12 bg-[#27C5D8]/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#27C5D8] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        parkName={language === 'EN' ? 'Volcán Tenorio National Park' : 'Parque Nacional Volcán Tenorio'}
      />
      <RecommendationsModal
        isOpen={isRecommendationsModalOpen}
        onClose={() => setIsRecommendationsModalOpen(false)}
      />
    </section>
  );
}
