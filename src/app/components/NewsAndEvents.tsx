import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, FileText } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const getNewsItems = (language: 'ES' | 'EN') => [
  {
    type: language === 'EN' ? 'News' : 'Noticia',
    title:
      language === 'EN'
        ? 'New reforestation initiative in the Osa Conservation Area'
        : 'Nueva iniciativa de reforestación en Área de Conservación Osa',
    excerpt:
      language === 'EN'
        ? 'SINAC launches an ambitious program to restore 500 hectares of forest in the Osa Peninsula'
        : 'SINAC lanza programa ambicioso para recuperar 500 hectáreas de bosque en la península de Osa',
    date: '2026-06-01',
    readTime: language === 'EN' ? '5 min' : '5 min',
    image: 'https://images.unsplash.com/photo-1614931454423-4b4bac270e8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: language === 'EN' ? 'Conservation' : 'Conservación',
  },
  {
    type: language === 'EN' ? 'Event' : 'Evento',
    title: language === 'EN' ? 'Biodiversity Festival 2026' : 'Festival de la Biodiversidad 2026',
    excerpt:
      language === 'EN'
        ? 'Let us celebrate Costa Rica’s natural wealth with educational activities and guided tours'
        : 'Celebremos la riqueza natural de Costa Rica con actividades educativas y tours guiados',
    date: '2026-06-15',
    readTime: language === 'EN' ? '3 min' : '3 min',
    image: 'https://images.unsplash.com/photo-1604165645922-eb8fdc7d84ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: language === 'EN' ? 'Events' : 'Eventos',
  },
  {
    type: language === 'EN' ? 'Announcement' : 'Comunicado',
    title:
      language === 'EN'
        ? 'New visiting hours for high season'
        : 'Nuevos horarios de visita para temporada alta',
    excerpt:
      language === 'EN'
        ? 'Starting July 1, we are adjusting hours in the most visited national parks'
        : 'A partir del 1 de julio, ajustamos horarios en parques nacionales más visitados',
    date: '2026-05-28',
    readTime: language === 'EN' ? '2 min' : '2 min',
    image: 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBjb25zZXJ2YXRpb24lMjBwcm90ZWN0ZWQlMjBhcmVhcyUyMG5hdHVyZXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: language === 'EN' ? 'Announcements' : 'Anuncios',
  },
  {
    type: language === 'EN' ? 'News' : 'Noticia',
    title:
      language === 'EN'
        ? 'Success in sea turtle protection program'
        : 'Éxito en programa de protección de tortugas marinas',
    excerpt:
      language === 'EN'
        ? 'Historic nesting record on Tortuguero National Park beaches'
        : 'Record histórico de anidación en playas del Parque Nacional Tortuguero',
    date: '2026-05-25',
    readTime: language === 'EN' ? '4 min' : '4 min',
    image: 'https://images.unsplash.com/photo-1611222566512-cb8dd8e689e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: language === 'EN' ? 'Conservation' : 'Conservación',
  },
  {
    type: language === 'EN' ? 'Event' : 'Evento',
    title: language === 'EN' ? 'Nature photography workshop' : 'Taller de fotografía de naturaleza',
    excerpt:
      language === 'EN'
        ? 'Learn professional techniques at Poás Volcano National Park'
        : 'Aprenda técnicas profesionales en el Parque Nacional Volcán Poás',
    date: '2026-06-20',
    readTime: language === 'EN' ? '3 min' : '3 min',
    image: 'https://images.unsplash.com/photo-1687304527563-74c180d8ced7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0JTIwYmlvZGl2ZXJzaXR5JTIwd2lsZGxpZmV8ZW58MXx8fHwxNzgwNTQyODcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: language === 'EN' ? 'Education' : 'Educación',
  },
  {
    type: language === 'EN' ? 'Announcement' : 'Comunicado',
    title:
      language === 'EN'
        ? 'Scheduled maintenance on trails at Corcovado National Park'
        : 'Mantenimiento programado en senderos del Parque Nacional Corcovado',
    excerpt:
      language === 'EN'
        ? 'Infrastructure improvements to ensure safety and accessibility'
        : 'Mejoras de infraestructura para garantizar seguridad y accesibilidad',
    date: '2026-05-22',
    readTime: language === 'EN' ? '2 min' : '2 min',
    image: 'https://images.unsplash.com/photo-1536709017021-ce8f99c17e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxDb3N0YSUyMFJpY2ElMjBjb25zZXJ2YXRpb24lMjBwcm90ZWN0ZWQlMjBhcmVhcyUyMG5hdHVyZXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: language === 'EN' ? 'Maintenance' : 'Mantenimiento',
  },
];

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Conservación: '#1E3A2B',
    Eventos: '#27C5D8',
    Anuncios: '#8B6B4A',
    Educación: '#27C5D8',
    Mantenimiento: '#8B6B4A',
    Conservation: '#1E3A2B',
    Events: '#27C5D8',
    Announcements: '#8B6B4A',
    Education: '#27C5D8',
    Maintenance: '#8B6B4A',
  };
  return colors[category] || '#1E3A2B';
};

export function NewsAndEvents() {
  const { language } = useLanguage();
  const newsItems = getNewsItems(language);
  const isEnglish = language === 'EN';

  return (
    <section id="news" className="py-20 bg-[#F5F5F5]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E3A2B] mb-4">
            {isEnglish ? 'News and Events' : 'Noticias y Eventos'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isEnglish
              ? 'Stay up to date with the latest news, events, and official announcements from SINAC'
              : 'Manténgase actualizado con las últimas noticias, eventos y comunicados oficiales de SINAC'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute top-4 left-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm"
                    style={{ backgroundColor: `${getCategoryColor(item.category)}cc` }}
                  >
                    {item.type}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div
                    className="inline-block px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: getCategoryColor(item.category) }}
                  >
                    {item.category}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(item.date).toLocaleDateString(isEnglish ? 'en-US' : 'es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{item.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#1E3A2B] mb-3 group-hover:text-[#27C5D8] transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>

                <div className="flex items-center space-x-2 text-[#27C5D8] font-medium text-sm group-hover:translate-x-2 transition-transform">
                  <span>{isEnglish ? 'Read more' : 'Leer más'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#1E3A2B] text-white rounded-xl font-medium text-lg hover:bg-[#2d5942] transition-colors shadow-lg"
          >
            <FileText className="w-5 h-5" />
            <span>{isEnglish ? 'View all news' : 'Ver todas las noticias'}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
