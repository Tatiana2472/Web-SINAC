import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Image as ImageIcon, Video } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const getGalleryItems = (language: 'ES' | 'EN') => [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1602948577571-896d79713b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Celeste River Waterfall' : 'Catarata Río Celeste',
    category: language === 'EN' ? 'National Parks' : 'Parques Nacionales',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1604165645922-eb8fdc7d84ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Three-toed Sloth' : 'Perezoso de tres dedos',
    category: language === 'EN' ? 'Wildlife' : 'Vida Silvestre',
  },
  {
    type: 'video',
    src: 'https://images.unsplash.com/photo-1711882569452-967be6941ddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cm9waWNhbCUyMGZvcmVzdCUyMGFlcmlhbCUyMHZpZXclMjBkcm9uZSUyMENvc3RhJTIwUmljYXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Tropical Forest Aerial View' : 'Vista aérea del bosque tropical',
    category: 'Drone',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1638514738739-61c13d5f7026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Capuchin Monkey' : 'Mono capuchino',
    category: language === 'EN' ? 'Wildlife' : 'Vida Silvestre',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Forest Trail' : 'Sendero en el bosque',
    category: language === 'EN' ? 'Nature' : 'Naturaleza',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1614931454423-4b4bac270e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Tropical Rainforest' : 'Bosque tropical lluvioso',
    category: language === 'EN' ? 'Landscapes' : 'Paisajes',
  },
  {
    type: 'video',
    src: 'https://images.unsplash.com/photo-1641941672934-9e33a79ec482?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx0cm9waWNhbCUyMGZvcmVzdCUyMGFlcmlhbCUyMHZpZXclMjBkcm9uZSUyMENvc3RhJTIwUmljYXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Jungle Aerial Tour' : 'Recorrido aéreo por la selva',
    category: 'Drone',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBjb25zZXJ2YXRpb24lMjBwcm90ZWN0ZWQlMjBhcmVhcyUyMG5hdHVyZXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Mountains of Costa Rica' : 'Montañas de Costa Rica',
    category: language === 'EN' ? 'Landscapes' : 'Paisajes',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1620658927695-c33df6fb8130?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: language === 'EN' ? 'Hidden Waterfall' : 'Cascada escondida',
    category: language === 'EN' ? 'National Parks' : 'Parques Nacionales',
  },
];

export function MultimediaGallery() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const items = getGalleryItems(language);

  const categories = isEnglish 
    ? ['all', 'National Parks', 'Wildlife', 'Landscapes', 'Nature', 'Drone']
    : ['all', 'Parques Nacionales', 'Vida Silvestre', 'Paisajes', 'Naturaleza', 'Drone'];

  const filteredItems =
    filter === 'all'
      ? items
      : items.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A2B] mb-4">
            {isEnglish ? 'Multimedia Gallery' : 'Galería Multimedia'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {isEnglish 
              ? 'Explore Costa Rica’s natural beauty through our images and videos'
              : 'Explore la belleza natural de Costa Rica a través de nuestras imágenes y videos'}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  filter === category
                    ? 'bg-[#27C5D8] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? (isEnglish ? 'All' : 'Todos') : category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <Masonry columnsCount={3} gutter="24px">
          {filteredItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedItem(index)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <ImageWithFallback
                src={item.src}
                alt={item.title}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {item.type === 'video' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-[#1E3A2B] ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              <div className="absolute top-4 right-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Video className="w-5 h-5 text-white" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-white" />
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-xs font-medium text-[#27C5D8] mb-1">{item.category}</div>
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </Masonry>

        <AnimatePresence>
          {selectedItem !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-6xl w-full"
              >
                <ImageWithFallback
                  src={filteredItems[selectedItem].src}
                  alt={filteredItems[selectedItem].title}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
                <div className="mt-6 text-center text-white">
                  <div className="text-sm text-[#27C5D8] mb-2">
                    {filteredItems[selectedItem].category}
                  </div>
                  <h3 className="text-2xl font-bold">{filteredItems[selectedItem].title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
