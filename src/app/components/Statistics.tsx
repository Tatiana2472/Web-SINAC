import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Shield, Leaf, Users, Target } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const getStats = (language: 'ES' | 'EN'): StatItem[] => [
  {
    icon: Shield,
    value: 170,
    suffix: '+',
    label: language === 'EN' ? 'Protected Wild Areas' : 'Áreas Silvestres Protegidas',
    color: '#27C5D8',
  },
  {
    icon: Leaf,
    value: 500000,
    suffix: '+',
    label: language === 'EN' ? 'Protected Species' : 'Especies Protegidas',
    color: '#1E3A2B',
  },
  {
    icon: Users,
    value: 2000000,
    suffix: '+',
    label: language === 'EN' ? 'Visitors per year' : 'Visitantes por año',
    color: '#8B6B4A',
  },
  {
    icon: Target,
    value: 100,
    suffix: '+',
    label: language === 'EN' ? 'Conservation Projects' : 'Proyectos de Conservación',
    color: '#27C5D8',
  },
];

function CountUp({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <div ref={ref} className="text-5xl lg:text-6xl font-bold">
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

export function Statistics() {
  const { language } = useLanguage();
  const stats = getStats(language);

  return (
    <section id="conservation" className="py-20 bg-gradient-to-b from-[#1E3A2B] to-[#2d5942] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#27C5D8] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8B6B4A] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            {language === 'EN' ? 'SINAC in Numbers' : 'SINAC en Números'}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            {language === 'EN'
              ? 'Figures that reflect our commitment to conserving and protecting Costa Rica’s biodiversity'
              : 'Números que reflejan nuestro compromiso con la conservación y protección de la biodiversidad de Costa Rica'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: stat.color }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <div style={{ color: stat.color }} className="mb-2">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>

                  <div className="text-white/90 text-lg font-medium">{stat.label}</div>

                  <div
                    className="absolute bottom-0 left-0 w-full h-1 rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: stat.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4">
            <div className="w-3 h-3 bg-[#27C5D8] rounded-full animate-pulse" />
            <span className="text-white/90">
              {language === 'EN'
                ? (
                  <>
                    Costa Rica protects <strong className="text-[#27C5D8]">28%</strong> of its territory and hosts <strong className="text-[#27C5D8]">5%</strong> of the world’s biodiversity
                  </>
                )
                : (
                  <>
                    Costa Rica protege el <strong className="text-[#27C5D8]">28%</strong> de su territorio
                    y alberga el <strong className="text-[#27C5D8]">5%</strong> de la biodiversidad mundial
                  </>
                )}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
