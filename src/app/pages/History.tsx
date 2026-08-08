import { useEffect } from 'react';
import { ArrowLeft, BookOpen, FileDown, Landmark } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import logoSinac from '@/assets/Logo-SINAC.png';

export function History() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'EN';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const content = isEnglish
    ? {
        title: 'History of SINAC',
        intro:
          'The National System of Conservation Areas of Costa Rica was created to coordinate the protection of forests, wildlife, watersheds and protected areas under a participatory and decentralized model.',
        body: [
          'SINAC is a dependency of the Ministry of Environment and Energy (MINAE), created through Article 22 of the Biodiversity Law No. 7788 of 1998.',
          'It acts as an instrumental legal entity and as an institutional management and coordination system that integrates forest, wildlife, protected area and water resource competencies.',
          'Its purpose is to guide public policies, planning and execution of processes aimed at sustainability, conservation and responsible use of natural resources.',
          'Territorially, SINAC is organized into eleven conservation areas that promote coordinated actions between the State, civil society, the private sector and citizens.',
        ],
        ctaLabel: 'View the full history document',
        ctaHref: 'https://www.sinac.go.cr/ES/partciudygober/Libros%20Sistematizacion/Creacion%20y%20Desarrollo%20del%20SINAC.pdf',
      }
    : {
        title: 'Historia del SINAC',
        intro:
          'El Sistema Nacional de Áreas de Conservación de Costa Rica fue creado para coordinar la protección de bosques, vida silvestre, cuencas hidrográficas y áreas protegidas bajo un modelo participativo y descentralizado.',
        body: [
          'El SINAC es una dependencia del Ministerio de Ambiente y Energía (MINAE), creado mediante el artículo 22 de la Ley de la Biodiversidad Nº 7788, de 1998.',
          'Posee personalidad jurídica instrumental y ejerce sus funciones como un sistema de gestión y coordinación institucional, desconcentrado y participativo, que integra las competencias en materia forestal, vida silvestre, áreas protegidas y protección de cuencas hidrográficas y sistemas hídricos.',
          'Su propósito es orientar políticas públicas, la planificación y ejecución de procesos dirigidos a lograr la sostenibilidad en el manejo de los recursos naturales del país.',
          'Territorialmente, el SINAC se organiza en once áreas de conservación que impulsan acciones coordinadas entre el Estado, la sociedad civil, el sector privado y los ciudadanos.',
        ],
        ctaLabel: 'Ver el documento completo de la historia',
        ctaHref: 'https://www.sinac.go.cr/ES/partciudygober/Libros%20Sistematizacion/Creacion%20y%20Desarrollo%20del%20SINAC.pdf',
      };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <Navigation />
      {/* Breadcrumb */}
      <div className="bg-[#0f172a]/90 text-white/50 text-xs px-6 py-2 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-white/80">{isEnglish ? 'History' : 'Historia'}</span>
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
                {isEnglish ? 'Institutional history' : 'Historia institucional'}
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">{content.title}</h1>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">{content.intro}</p>

          <div className="mt-8 rounded-3xl border border-[#27C5D8]/20 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <BookOpen className="mt-1 h-5 w-5 text-[#27C5D8]" />
              <div className="space-y-3">
                {content.body.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <a
            href={content.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#27C5D8] px-5 py-3 font-semibold text-[#082f2f] transition hover:bg-[#2fe3e8]"
          >
            <FileDown className="h-5 w-5" />
            {content.ctaLabel}
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
