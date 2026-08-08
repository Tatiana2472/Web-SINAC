import { useEffect } from 'react';
import { ArrowLeft, Leaf, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import logoSinac from '@/assets/Logo-SINAC.png';

export function MissionVision() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'EN';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const content = isEnglish
    ? {
        title: 'Mission and Vision of SINAC',
        intro:
          'The National System of Conservation Areas of Costa Rica is the institution in charge of managing protected wild areas, forests, watersheds and wildlife in a sustainable and participatory way.',
        missionTitle: 'Mission',
        missionText:
          'The National System of Conservation Areas (SINAC) of Costa Rica manages, in an integrated way, the conservation and sustainable management of wildlife, forest resources, protected wild areas, watersheds and water systems, in coordination with other institutions and actors of society, for the well-being of present and future generations.',
        visionTitle: 'Vision',
        visionText:
          'A System of Conservation Areas (SINAC) that leads the conservation and sustainable use of biodiversity and natural resources, with participatory and equitable management to improve and maintain ecosystem services, contributing to the sustainable development of Costa Rica.',
        source: 'Source: SINAC Strategic Plan 2016-2026',
      }
    : {
        title: 'Misión y Visión del SINAC',
        intro:
          'El Sistema Nacional de Áreas de Conservación de Costa Rica es la institución encargada de administrar las áreas silvestres protegidas, los bosques, las cuencas hidrográficas y la vida silvestre de manera sostenible y participativa.',
        missionTitle: 'Misión',
        missionText:
          'El Sistema Nacional de Áreas de Conservación (SINAC) de Costa Rica, gestiona integralmente la conservación y manejo sostenible de la vida silvestre, los recursos forestales, las áreas silvestres protegidas, cuencas hidrográficas y sistemas hídricos, en coordinación con otras instituciones y actores de la sociedad, para el bienestar de las actuales y futuras generaciones.',
        visionTitle: 'Visión',
        visionText:
          'Un Sistema de Áreas de Conservación (SINAC) que lidera la conservación y uso sostenible de la biodiversidad y los recursos naturales, con gestión participativa y equitativa para mejorar y mantener los servicios ecosistémicos, que contribuya al desarrollo sostenible de Costa Rica.',
        source: 'Fuente: Plan Estratégico del SINAC 2016-2026 (SINAC, 2016)',
      };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Navigation />
      {/* Breadcrumb */}
      <div className="bg-[#0f172a]/90 text-white/50 text-xs px-6 py-2 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-white/80">{isEnglish ? 'Mission and Vision' : 'Misión y Visión'}</span>
        </div>
      </div>
      <div className="mx-auto flex flex-1 w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-[#8fe8e5] transition hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            {isEnglish ? 'Back to home' : 'Volver al inicio'}
          </Link>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#112b23] via-[#0f172a] to-[#132a2b] p-8 shadow-2xl shadow-black/30 sm:p-10 lg:p-14">
          <div className="mb-8 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-lg sm:h-24 sm:w-24">
              <img src={logoSinac} alt="SINAC Logo" className="h-full w-full rounded-full object-contain" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#27C5D8]">
                {isEnglish ? 'Institutional purpose' : 'Propósito institucional'}
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">{content.title}</h1>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">{content.intro}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <section className="rounded-2xl border border-[#27C5D8]/20 bg-white/5 p-7 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Leaf className="h-5 w-5 text-[#27C5D8]" />
                <h2 className="text-2xl font-semibold text-white">{content.missionTitle}</h2>
              </div>
              <p className="text-base leading-8 text-slate-300">{content.missionText}</p>
            </section>

            <section className="rounded-2xl border border-[#27C5D8]/20 bg-white/5 p-7 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Leaf className="h-5 w-5 text-[#27C5D8]" />
                <h2 className="text-2xl font-semibold text-white">{content.visionTitle}</h2>
              </div>
              <p className="text-base leading-8 text-slate-300">{content.visionText}</p>
            </section>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm text-slate-400">
            {content.source}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
