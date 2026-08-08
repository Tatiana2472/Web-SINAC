import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const getFeaturedItems = (isEnglish: boolean) => [
  {
    image:
      'https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: isEnglish ? 'National Parks' : 'Parques Nacionales',
    title: isEnglish ? 'Volcán Tenorio National Park' : 'Parque Nacional Volcán Tenorio',
  },
  {
    image:
      'https://images.unsplash.com/photo-1620658927695-c33df6fb8130?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: isEnglish ? 'Natural Wonders' : 'Maravillas Naturales',
    title: isEnglish ? 'Río Celeste' : 'Río Celeste',
  },
  {
    image:
      'https://images.unsplash.com/photo-1604165645922-eb8fdc7d84ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: isEnglish ? 'Biodiversity' : 'Biodiversidad',
    title: isEnglish ? 'Wildlife of Costa Rica' : 'Vida Silvestre de Costa Rica',
  },
  {
    image:
      'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBjb25zZXJ2YXRpb24lMjBwcm90ZWN0ZWQlMjBhcmVhcyUyMG5hdHVyZXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: isEnglish ? 'Conservation' : 'Conservación',
    title: isEnglish ? 'Conservation Programs' : 'Programas de Conservación',
  },
];

export function FeaturedCards() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const featuredItems = getFeaturedItems(isEnglish);

  return (
    <section className="relative -mt-32 z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-xl cursor-pointer"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="text-xs font-medium text-[#27C5D8] mb-2 uppercase tracking-wider">
                {item.category}
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-[#27C5D8] transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center space-x-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{isEnglish ? 'Explore' : 'Explorar'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#27C5D8] transition-colors rounded-2xl" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
