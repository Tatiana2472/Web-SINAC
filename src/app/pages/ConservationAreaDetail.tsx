import { useParams, Link } from 'react-router';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  TreePine,
  Mountain,
  Compass,
  Users,
  Leaf,
  Award,
  PawPrint,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAreaBySlug } from '../data/conservationAreasData';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Footer } from '../components/Footer';

export function ConservationAreaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'EN';

  const area = slug ? getAreaBySlug(slug) : undefined;

  if (!area) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {isEnglish ? 'Area not found' : 'Área no encontrada'}
          </h1>
          <p className="text-slate-400 mb-8">
            {isEnglish
              ? 'The conservation area you are looking for does not exist.'
              : 'El área de conservación que buscas no existe.'}
          </p>
          <Link
            to="/areas-conservacion"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-3 text-sm font-medium text-[#8fe8e5] transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEnglish ? 'Back to Conservation Areas' : 'Volver a Áreas de Conservación'}
          </Link>
        </div>
      </div>
    );
  }

  const name = isEnglish ? area.name.en : area.name.es;
  const description = isEnglish ? area.description.en : area.description.es;
  const ecosystems = isEnglish ? area.ecosystems.en : area.ecosystems.es;
  const biodiversity = isEnglish ? area.biodiversity.en : area.biodiversity.es;
  const note = area.note ? (isEnglish ? area.note.en : area.note.es) : null;

  const ecosystemIcons = [TreePine, Mountain, Compass, Leaf];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <ImageWithFallback
          src={area.heroImage}
          alt={name}
          className={`absolute inset-0 w-full h-full ${area.heroImage.startsWith('data:') ? 'object-contain p-4 bg-white/10' : 'object-cover'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-[#0f172a]/40 to-[#0f172a]" />

        {/* Top Actions */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
          <Link
            to="/areas-conservacion"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-4 py-2 text-sm font-medium text-white transition hover:bg-black/50"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEnglish ? 'Back' : 'Volver'}
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-10 sm:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-5xl mx-auto"
          >
            {note && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-amber-300 mb-4"
              >
                <Award className="h-3.5 w-3.5" />
                {note}
              </motion.div>
            )}
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#27C5D8] mb-2">
              {area.abbr}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-3xl">
              {name}
            </h1>
            <div className="flex items-center gap-2 mt-4 text-white/70 text-sm">
              <MapPin className="h-4 w-4 text-[#27C5D8]" />
              <span>{isEnglish ? area.headquarters.en : area.headquarters.es}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 pb-20">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-8 relative z-20 mb-12"
        >
          {[
            {
              label: isEnglish ? 'Protected Hectares' : 'Hectáreas Protegidas',
              value: area.stats.hectares,
              icon: Mountain,
              color: '#27C5D8',
            },
            {
              label: isEnglish ? 'Protected Areas' : 'Áreas Protegidas',
              value: area.stats.parks.toString(),
              icon: TreePine,
              color: '#34d399',
            },
            {
              label: isEnglish ? 'Annual Visitors' : 'Visitantes Anuales',
              value: area.stats.visitors,
              icon: Users,
              color: '#f59e0b',
            },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#1e293b]/80 backdrop-blur-xl p-6 text-center shadow-xl"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon className="h-6 w-6" style={{ color: stat.color }} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#27C5D8]/15 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-[#27C5D8]" />
            </div>
            {isEnglish ? 'About this Area' : 'Sobre esta Área'}
          </h2>
          <p className="text-slate-300 leading-8 text-lg">{description}</p>
        </motion.div>

        {/* Two Column: Ecosystems & Biodiversity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Ecosystems */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-2xl border border-[#27C5D8]/20 bg-[#1e293b]/50 backdrop-blur-sm p-6"
          >
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <TreePine className="h-5 w-5 text-[#27C5D8]" />
              {isEnglish ? 'Ecosystems' : 'Ecosistemas'}
            </h3>
            <div className="space-y-3">
              {ecosystems.map((eco, idx) => {
                const Icon = ecosystemIcons[idx % ecosystemIcons.length];
                return (
                  <motion.div
                    key={eco}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 px-4 py-3 transition-colors hover:bg-[#27C5D8]/10 hover:border-[#27C5D8]/20"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#27C5D8]/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-[#27C5D8]" />
                    </div>
                    <span className="text-sm text-slate-200">{eco}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Biodiversity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="rounded-2xl border border-emerald-500/20 bg-[#1e293b]/50 backdrop-blur-sm p-6"
          >
            <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
              <PawPrint className="h-5 w-5 text-emerald-400" />
              {isEnglish ? 'Notable Biodiversity' : 'Biodiversidad Destacada'}
            </h3>
            <div className="space-y-3">
              {biodiversity.map((species, idx) => (
                <motion.div
                  key={species}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + idx * 0.1 }}
                  className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 px-4 py-3 transition-colors hover:bg-emerald-500/10 hover:border-emerald-500/20"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <PawPrint className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-slate-200">{species}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contact & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1e293b]/80 to-[#0f172a] backdrop-blur-xl p-8 shadow-2xl"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#27C5D8]/15 flex items-center justify-center">
              <MapPin className="h-4 w-4 text-[#27C5D8]" />
            </div>
            {isEnglish ? 'Contact & Location' : 'Contacto y Ubicación'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#27C5D8] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                    {isEnglish ? 'Headquarters' : 'Sede'}
                  </p>
                  <p className="text-sm text-slate-200">{isEnglish ? area.headquarters.en : area.headquarters.es}</p>
                </div>
              </div>
              {area.address && (
                <div className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-[#27C5D8] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      {isEnglish ? 'Address' : 'Dirección'}
                    </p>
                    <p className="text-sm text-slate-200">{isEnglish ? area.address.en : area.address.es}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {area.phone && (
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      {isEnglish ? 'Phone' : 'Teléfono'}
                    </p>
                    <p className="text-sm text-slate-200">{area.phone}</p>
                  </div>
                </div>
              )}
              {area.email && (
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                      {isEnglish ? 'Email' : 'Correo'}
                    </p>
                    <a
                      href={`mailto:${area.email}`}
                      className="text-sm text-[#27C5D8] hover:underline"
                    >
                      {area.email}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={area.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#27C5D8] hover:bg-[#1fa5b5] text-[#0f172a] font-bold py-3.5 px-6 transition-all duration-300 shadow-[0_4px_14px_rgba(39,197,216,0.3)] hover:shadow-[0_6px_20px_rgba(39,197,216,0.4)]"
            >
              <MapPin className="h-4 w-4" />
              {isEnglish ? 'View on Google Maps' : 'Ver en Google Maps'}
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
            <Link
              to="/areas-conservacion"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium py-3.5 px-6 transition-all duration-300"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? 'All Conservation Areas' : 'Todas las Áreas'}
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
