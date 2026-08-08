import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { MapPin, Trees, Mountain, Waves } from 'lucide-react';
import { AreaInfoModal } from './AreaInfoModal';
import { useLanguage } from '../context/LanguageContext';
import { acgMapBase64 } from '../data/acgMapImage';

const conservationAreas = [
  { id: 1,  name: 'AC Guanacaste (ACG)',                    abbr: 'ACG',  x: 22, y: 18, color: '#27C5D8', icon: Mountain },
  { id: 2,  name: 'AC Arenal Tempisque (ACAT)',             abbr: 'ACAT', x: 35, y: 30, color: '#8B6B4A', icon: Trees },
  { id: 3,  name: 'AC Arenal Huetar Norte (ACAHN)',         abbr: 'ACAHN',x: 50, y: 22, color: '#1E3A2B', icon: Trees },
  { id: 4,  name: 'AC Tempisque (ACT)',                     abbr: 'ACT',  x: 28, y: 42, color: '#4F7A5C', icon: Waves },
  { id: 5,  name: 'AC Central (ACC)',                       abbr: 'ACC',  x: 52, y: 42, color: '#27C5D8', icon: Mountain },
  { id: 6,  name: 'AC Tortuguero (ACTo)',                   abbr: 'ACTo', x: 68, y: 28, color: '#3B82F6', icon: Waves },
  { id: 7,  name: 'AC La Amistad Caribe (ACLAC)',           abbr: 'ACLAC',x: 72, y: 52, color: '#1E3A2B', icon: Mountain },
  { id: 8,  name: 'AC La Amistad Pacífico (ACLAP)',         abbr: 'ACLAP',x: 52, y: 62, color: '#8B6B4A', icon: Trees },
  { id: 9,  name: 'AC Pacífico Central (ACOPAC)',           abbr: 'ACOPAC',x: 35,y: 58, color: '#27C5D8', icon: Waves },
  { id: 10, name: 'AC Osa (ACOSA)',                         abbr: 'ACOSA',x: 38, y: 78, color: '#4F7A5C', icon: Trees },
  { id: 11, name: 'AC Marina Coco (ACMC)',                  abbr: 'ACMC', x: 14, y: 88, color: '#3B82F6', icon: Waves },
];

const getAreaDetails = (language: 'ES' | 'EN') => ({
  1: {
    name: language === 'EN' ? 'Guanacaste Conservation Area (ACG)' : 'Área de Conservación Guanacaste (ACG)',
    description: language === 'EN'
      ? 'One of the most biodiverse areas in Costa Rica, home to unique dry tropical forest ecosystems and a UNESCO World Heritage Site since 1999.'
      : 'Una de las áreas más biodiversas de Costa Rica, hogar de ecosistemas únicos de bosque seco tropical y Patrimonio de la Humanidad UNESCO desde 1999.',
    hectares: '147,000', parks: 12, visitors: '450K',
    image: acgMapBase64,
  },
  2: {
    name: language === 'EN' ? 'Arenal Tempisque Conservation Area (ACAT)' : 'Área de Conservación Arenal Tempisque (ACAT)',
    description: language === 'EN'
      ? 'Protects strategic wetlands, the iconic Arenal Volcano and Lake Arenal, crucial for water generation and Costa Rican biodiversity.'
      : 'Protege estratégicos humedales, el icónico Volcán Arenal y el Lago Arenal, cruciales para la generación hídrica y la biodiversidad costarricense.',
    hectares: '215,000', parks: 10, visitors: '380K',
    image: 'https://images.unsplash.com/photo-1536709017021-ce8f99c17e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  3: {
    name: language === 'EN' ? 'Arenal Huetar Norte Conservation Area (ACAHN)' : 'Área de Conservación Arenal Huetar Norte (ACAHN)',
    description: language === 'EN'
      ? 'Contains the Volcán Tenorio National Park with the famous Río Celeste, along with other natural areas of the Huetar Norte region.'
      : 'Contiene el Parque Nacional Volcán Tenorio con el famoso Río Celeste, junto a otras áreas naturales de la región Huetar Norte.',
    hectares: '220,000', parks: 8, visitors: '290K',
    image: 'https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  4: {
    name: language === 'EN' ? 'Tempisque Conservation Area (ACT)' : 'Área de Conservación Tempisque (ACT)',
    description: language === 'EN'
      ? 'Protects important wetlands and mangroves vital for marine life and migratory birds in the Nicoya Peninsula and Gulf of Nicoya.'
      : 'Protege importantes humedales y manglares vitales para la vida marina y las aves migratorias en la Península de Nicoya y el Golfo de Nicoya.',
    hectares: '183,000', parks: 9, visitors: '210K',
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  5: {
    name: language === 'EN' ? 'Central Conservation Area (ACC)' : 'Área de Conservación Central (ACC)',
    description: language === 'EN'
      ? 'Encompasses the Central Valley volcanoes — Poás, Barva, Irazú and Turrialba — protecting the main water recharge zones for Costa Rica.'
      : 'Abarca los volcanes del Valle Central — Poás, Barva, Irazú y Turrialba — protegiendo las principales zonas de recarga hídrica del país.',
    hectares: '165,000', parks: 11, visitors: '520K',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  6: {
    name: language === 'EN' ? 'Tortuguero Conservation Area (ACTo)' : 'Área de Conservación Tortuguero (ACTo)',
    description: language === 'EN'
      ? 'Famous for the nesting of sea turtles and its extensive canal network, it is one of the most important wetland areas in Central America.'
      : 'Famosa por el anidamiento de tortugas marinas y su extensa red de canales, es una de las áreas de humedales más importantes de Centroamérica.',
    hectares: '310,000', parks: 7, visitors: '350K',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  7: {
    name: language === 'EN' ? 'La Amistad Caribbean Conservation Area (ACLAC)' : 'Área de Conservación La Amistad Caribe (ACLAC)',
    description: language === 'EN'
      ? 'Part of the Amistad International Park shared with Panama, it is a UNESCO World Heritage Site protecting the largest wild area in Central America.'
      : 'Parte del Parque Internacional La Amistad compartido con Panamá, es Patrimonio Mundial UNESCO y protege la mayor área silvestre de Centroamérica.',
    hectares: '580,000', parks: 6, visitors: '120K',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  8: {
    name: language === 'EN' ? 'La Amistad Pacific Conservation Area (ACLAP)' : 'Área de Conservación La Amistad Pacífico (ACLAP)',
    description: language === 'EN'
      ? 'Protects the Pacific slopes of the Talamanca mountain range, with great biodiversity and indigenous territories with ancestral culture.'
      : 'Protege las vertientes pacíficas de la Cordillera Talamanca, con gran biodiversidad y territorios indígenas con cultura ancestral.',
    hectares: '490,000', parks: 8, visitors: '95K',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  9: {
    name: language === 'EN' ? 'Central Pacific Conservation Area (ACOPAC)' : 'Área de Conservación Pacífico Central (ACOPAC)',
    description: language === 'EN'
      ? 'Contains the famous Manuel Antonio National Park and Carara, offering beaches, mangroves, primary forests and extraordinary biodiversity.'
      : 'Contiene el famoso Parque Nacional Manuel Antonio y Carara, ofreciendo playas, manglares, bosques primarios y extraordinaria biodiversidad.',
    hectares: '295,000', parks: 10, visitors: '430K',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  10: {
    name: language === 'EN' ? 'Osa Conservation Area (ACOSA)' : 'Área de Conservación Osa (ACOSA)',
    description: language === 'EN'
      ? 'Home to Corcovado National Park, described as the most biologically intense place on Earth, with the largest primary rainforest in Central America.'
      : 'Alberga el Parque Nacional Corcovado, descrito como el lugar biológicamente más intenso de la Tierra, con el mayor bosque lluvioso primario de Centroamérica.',
    hectares: '375,000', parks: 9, visitors: '180K',
    image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  11: {
    name: language === 'EN' ? 'Cocos Island Marine Conservation Area (ACMC)' : 'Área de Conservación Marina Coco (ACMC)',
    description: language === 'EN'
      ? 'Cocos Island, a UNESCO World Heritage Site, is one of the world\'s most important marine ecosystems with unique endemic species and abundant shark populations.'
      : 'La Isla del Coco, Patrimonio Mundial UNESCO, es uno de los ecosistemas marinos más importantes del mundo con especies endémicas únicas y abundantes poblaciones de tiburones.',
    hectares: '199,790', parks: 1, visitors: '3K',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
});

export function ConservationMap() {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const { language } = useLanguage();
  const areaDetails = getAreaDetails(language);

  const handleAreaClick = (id: number) => {
    setSelectedArea(id);
  };

  return (
    <section id="conservation-areas" className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A2B] mb-4">
            {language === 'EN' ? 'Conservation Areas' : 'Áreas de Conservación'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'EN'
              ? "Costa Rica is organized into 11 Conservation Areas that protect and manage the country's natural resources"
              : 'Costa Rica está organizada en 11 Áreas de Conservación que protegen y gestionan los recursos naturales del país'}
          </p>
        </motion.div>

          <div className="grid min-w-0 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] bg-gradient-to-br from-[#1E3A2B]/5 to-[#27C5D8]/5 rounded-3xl p-8 shadow-xl"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}
              >
                <path
                  d="M 35 10 Q 40 8, 45 12 L 50 18 Q 52 20, 55 18 L 60 15 Q 65 12, 68 15 L 70 25 Q 72 30, 68 35 L 65 45 Q 62 50, 58 52 L 50 58 Q 45 62, 42 66 L 38 72 Q 35 78, 32 82 L 28 88 Q 25 92, 30 95 L 25 95 Q 20 92, 22 88 L 25 82 Q 28 76, 32 70 L 35 62 Q 38 56, 42 50 L 45 42 Q 48 36, 45 30 L 42 22 Q 38 16, 35 10 Z"
                  fill="#1E3A2B"
                  opacity="0.15"
                  stroke="#1E3A2B"
                  strokeWidth="0.5"
                />
              </svg>

              {conservationAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: area.id * 0.05 }}
                    whileHover={{ scale: 1.3 }}
                    onHoverStart={() => setHoveredArea(area.id)}
                    onHoverEnd={() => setHoveredArea(null)}
                    onClick={() => handleAreaClick(area.id)}
                    className="absolute cursor-pointer"
                    style={{
                      left: `${area.x}%`,
                      top: `${area.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                      style={{
                        backgroundColor: area.color,
                        boxShadow:
                          hoveredArea === area.id
                            ? `0 0 20px ${area.color}`
                            : `0 4px 8px ${area.color}40`,
                      }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                      {hoveredArea === area.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-10"
                        >
                          <div className="text-xs font-medium text-[#1E3A2B]">{area.abbr}</div>
                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                        </motion.div>
                      )}
                    </div>

                    <motion.div
                      animate={{
                        scale: hoveredArea === area.id ? [1, 1.5, 1] : 1,
                        opacity: hoveredArea === area.id ? [0.5, 0, 0.5] : 0,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: area.color }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="min-w-0 space-y-6"
          >
            <div className="grid grid-cols-1 gap-3">
              {conservationAreas.slice(0, 6).map((area, index) => (
                <motion.button
                  key={area.id}
                  type="button"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ x: 8 }}
                  onHoverStart={() => setHoveredArea(area.id)}
                  onHoverEnd={() => setHoveredArea(null)}
                  onClick={() => handleAreaClick(area.id)}
                  className={`flex min-w-0 w-full items-center space-x-4 rounded-xl p-4 text-left transition-all duration-300 cursor-pointer ${
                    hoveredArea === area.id
                      ? 'bg-[#27C5D8]/10 shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: area.color }}
                  />
                  <span className="font-medium text-[#1E3A2B] text-sm flex-1">
                    {areaDetails[area.id as keyof typeof areaDetails]?.name || area.name}
                  </span>
                  <MapPin
                    className={`w-4 h-4 ml-auto flex-shrink-0 transition-colors ${
                      hoveredArea === area.id ? 'text-[#27C5D8]' : 'text-gray-400'
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            <Link to="/areas-conservacion" onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-4 bg-[#1E3A2B] text-white rounded-xl font-medium hover:bg-[#2d5942] transition-colors shadow-lg text-center cursor-pointer"
              >
                {language === 'EN' ? 'See all conservation areas' : 'Ver todas las áreas de conservación'}
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      <AreaInfoModal
        isOpen={selectedArea !== null}
        onClose={() => setSelectedArea(null)}
        area={
          selectedArea !== null
            ? areaDetails[selectedArea as keyof typeof areaDetails] || null
            : null
        }
      />
    </section>
  );
}
