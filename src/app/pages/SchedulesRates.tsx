import { useEffect } from 'react';
import { ArrowLeft, CalendarRange, CreditCard, Ticket, Clock3 } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import logoSinac from '@/assets/Logo-SINAC.png';

export function SchedulesRates() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'EN';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const content = isEnglish
    ? {
        title: 'Schedules and Rates',
        intro:
          'Plan your visit with clear information about opening hours, admission capacity and ticket purchase options.',
        scheduleTitle: 'Schedule',
        scheduleText:
          'Open every day, Monday through Sunday. Admission from 08:00 a.m. to 02:00 p.m. Visitors may remain until 04:00 p.m. Daily capacity is 1,200 people and only 500 people are allowed simultaneously on the trail.',
        purchaseTitle: 'Buy tickets',
        purchaseText:
          'Tickets can only be purchased through the official website of SINAC.',
        ratesTitle: 'Admission rates',
        rates: [
          { label: 'National and/or resident adults', value: '¢904' },
          { label: 'National and/or resident children', value: '¢565' },
          { label: 'Non-resident adults', value: '$13.56' },
          { label: 'Non-resident children', value: '$5.65' },
          { label: 'Senior national and/or resident adults', value: 'Free' },
          { label: 'Children under 2 years old', value: 'Free' },
        ],
        ctaLabel: 'Buy tickets online',
        ctaHref: 'https://serviciosenlinea.sinac.go.cr',
      }
    : {
        title: 'Horarios y Tarifas',
        intro:
          'Planifique su visita con información clara sobre horarios, capacidad de ingreso y opciones para comprar entradas.',
        scheduleTitle: 'Horario',
        scheduleText:
          'Abierto todos los días, de lunes a domingo. Horario de ingreso de 08:00 a.m. a 02:00 p.m. Se puede permanecer en el lugar hasta las 04:00 p.m. La capacidad de carga establecida es de 1200 personas por día. Solamente se permiten 500 personas simultáneamente en el sendero.',
        purchaseTitle: 'Compra de entradas',
        purchaseText:
          'La compra de las entradas se realiza únicamente a través del sitio web oficial de SINAC.',
        ratesTitle: 'Tarifas de ingreso',
        rates: [
          { label: 'Nacionales y/o residentes', value: '¢904' },
          { label: 'Niños(as) nacionales y/o residentes', value: '¢565' },
          { label: 'No residentes', value: '$13.56' },
          { label: 'Niños(as) no residentes', value: '$5.65' },
          { label: 'Adulto mayor nacional y/o residente', value: 'Gratis' },
          { label: 'Niños menores de 2 años', value: 'Gratis' },
        ],
        ctaLabel: 'Comprar entradas en línea',
        ctaHref: 'https://serviciosenlinea.sinac.go.cr',
      };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navigation />
      {/* Breadcrumb */}
      <div className="bg-[#0f172a]/90 text-white/50 text-xs px-6 py-2 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-white/80">{isEnglish ? 'Schedules and Rates' : 'Horarios y Tarifas'}</span>
        </div>
      </div>
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-12">
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
                {isEnglish ? 'Visit planning' : 'Planificación de visita'}
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">{content.title}</h1>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">{content.intro}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-3xl border border-[#27C5D8]/20 bg-white/5 p-7 backdrop-blur-sm">
              <div className="mb-5 flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#27C5D8]" />
                <h2 className="text-2xl font-semibold text-white">{content.scheduleTitle}</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#8fe8e5]">{isEnglish ? 'Availability' : 'Disponibilidad'}</p>
                  <p className="mt-2 text-base text-slate-200">{isEnglish ? 'Open every day, Monday to Sunday.' : 'Abierto todos los días, de lunes a domingo.'}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#8fe8e5]">{isEnglish ? 'Entry' : 'Ingreso'}</p>
                    <p className="mt-2 whitespace-nowrap text-lg font-semibold text-white">08:00 a.m. - 02:00 p.m.</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#8fe8e5]">{isEnglish ? 'Permanence' : 'Permanencia'}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{isEnglish ? 'Until 04:00 p.m.' : 'Hasta las 04:00 p.m.'}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#8fe8e5]">{isEnglish ? 'Daily capacity' : 'Capacidad diaria'}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{isEnglish ? '1,200 people' : '1,200 personas'}</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-[#8fe8e5]">{isEnglish ? 'Simultaneous' : 'Simultáneas'}</p>
                    <p className="mt-2 text-lg font-semibold text-white">{isEnglish ? '500 people' : '500 personas'}</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#27C5D8]/20 bg-white/5 p-7 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-3">
                <Ticket className="h-5 w-5 text-[#27C5D8]" />
                <h2 className="text-2xl font-semibold text-white">{content.purchaseTitle}</h2>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-base leading-8 text-slate-300">{content.purchaseText}</p>
              </div>
              <a
                href={content.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#27C5D8] px-4 py-3 font-semibold text-[#082f2f] transition hover:bg-[#2fe3e8]"
              >
                <CreditCard className="h-4 w-4" />
                {content.ctaLabel}
              </a>
            </section>
          </div>

          <section className="mt-6 rounded-3xl border border-[#27C5D8]/20 bg-gradient-to-r from-[#17322c] to-[#0f172a] p-7">
            <div className="mb-5 flex items-center gap-3">
              <Ticket className="h-5 w-5 text-[#27C5D8]" />
              <h2 className="text-2xl font-semibold text-white">{content.ratesTitle}</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {content.rates.map((rate) => (
                <div key={rate.label} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm text-slate-300">{rate.label}</p>
                  <p className="mt-2 text-xl font-semibold text-[#8fe8e5]">{rate.value}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
