import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, Globe, Menu, Ticket, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BookingModal } from './BookingModal';
import logoSinac from '@/assets/Logo-SINAC.png';
import { useLanguage } from '../context/LanguageContext';

type NavChildItem = {
  label: string;
  href: string;
  description?: string;
};

type NavItem = {
  label: string;
  href?: string;
  children?: NavChildItem[];
  isRoute?: boolean;
};

const getNavItems = (language: 'ES' | 'EN'): NavItem[] => {
  if (language === 'EN') {
    return [
      { label: 'Home', href: '#' },
      {
        label: 'Park',
        children: [
          { label: 'General Information', href: '#parque' },
          { label: 'Volcán Tenorio National Park', href: '#volcan-tenorio' },
          { label: 'Celeste River', href: '#rio-celeste' },
          { label: 'Trails', href: '#senderos' },
          { label: 'Flora and Fauna', href: '#flora-fauna' },
          { label: 'Conservation', href: '#conservacion' },
        ],
      },
      {
        label: 'About Us',
        children: [
          { label: 'Conservation Areas', href: '/areas-conservacion' },
          { label: 'Conservation Dashboard', href: '/dashboard' },
          { label: 'Protected Wild Areas', href: '#conservation' },
          { label: 'Conservation Areas Map', href: '#conservation-areas' },
          { label: 'Schedules and Rates', href: '/horarios-tarifas' },
          { label: 'Buy Tickets', href: 'https://serviciosenlinea.sinac.go.cr/' },
          { label: 'Visitor Guide', href: '/parques-nacionales' },
        ],
      },
      {
        label: 'Procedures',
        children: [
          { label: 'Institutional Procedures', href: '/tramites-institucionales' },
          { label: 'Online Services', href: '/servicios-linea' },
          { label: 'Contact Us', href: '/contactenos' },
        ],
      },
      { label: 'Transparency', href: '/transparencia' },
      { label: 'News', href: '#news' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Contact', href: '#contact' },
    ];
  }

  return [
    { label: 'Inicio', href: '#' },
    {
      label: 'Parque',
      children: [
        { label: 'Información General', href: '#parque' },
        { label: 'Parque Nacional Volcán Tenorio', href: '#volcan-tenorio' },
        { label: 'Río Celeste', href: '#rio-celeste' },
        { label: 'Senderos', href: '#senderos' },
        { label: 'Flora y Fauna', href: '#flora-fauna' },
        { label: 'Conservación', href: '#conservacion' },
      ],
    },
    {
      label: 'Conózcanos',
      children: [
        { label: 'Áreas de Conservación', href: '/areas-conservacion' },
        { label: 'Panel de Áreas de Conservación', href: '/dashboard' },
        { label: 'Áreas Silvestres Protegidas', href: '#conservation' },
        { label: 'Mapa de Áreas de Conservación', href: '#conservation-areas' },
        { label: 'Horarios y Tarifas', href: '/horarios-tarifas' },
        { label: 'Comprar Entradas', href: 'https://serviciosenlinea.sinac.go.cr/' },
        { label: 'Guía del Visitante', href: '/parques-nacionales' },
      ],
    },
    {
      label: 'Trámites',
      children: [
        { label: 'Trámites Institucionales', href: '/tramites-institucionales' },
        { label: 'Servicios en Línea', href: '/servicios-linea' },
        { label: 'Contáctenos', href: '/contactenos' },
      ],
    },
    { label: 'Transparencia', href: '/transparencia' },
    { label: 'Noticias', href: '#news' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Contacto', href: '#contact' },
  ];
};

export function Navigation() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('Inicio');
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navItems = getNavItems(language);
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    document.documentElement.lang = language === 'ES' ? 'es' : 'en';
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const hash = window.location.hash || '#';
      if (['/dashboard', '/areas-conservacion', '/area-conservacion', '/horarios-tarifas', '/parques-nacionales'].some(path => location.pathname.startsWith(path))) {
        setActiveSection(language === 'ES' ? 'Conózcanos' : 'About Us');
        return;
      }

      if (['/tramites-institucionales', '/servicios-linea', '/contactenos'].some(path => location.pathname.startsWith(path))) {
        setActiveSection(language === 'ES' ? 'Trámites' : 'Procedures');
        return;
      }

      if (location.pathname.startsWith('/transparencia')) {
        setActiveSection(language === 'ES' ? 'Transparencia' : 'Transparency');
        return;
      }

      if (hash && hash !== '#') {
        const matchingItem = navItems.find((item) => item.href === hash);
        const matchingChild = navItems.find((item) => item.children?.some((child) => child.href === hash));
        const matchedLabel = matchingItem?.label ?? matchingChild?.label ?? (language === 'ES' ? 'Inicio' : 'Home');
        setActiveSection(matchedLabel);
        return;
      }

      const sectionOrder = [
        { label: language === 'ES' ? 'Inicio' : 'Home', id: '' },
        { label: language === 'ES' ? 'Conózcanos' : 'About Us', id: 'conservation-areas' },
        { label: language === 'ES' ? 'Conózcanos' : 'About Us', id: 'conservation' },
        { label: language === 'ES' ? 'Conózcanos' : 'About Us', id: 'visit' },
        { label: language === 'ES' ? 'Trámites' : 'Procedures', id: 'procedures' },
        { label: language === 'ES' ? 'Noticias' : 'News', id: 'news' },
        { label: language === 'ES' ? 'Galería' : 'Gallery', id: 'gallery' },
        { label: language === 'ES' ? 'Contacto' : 'Contact', id: 'contact' },
      ];

      const active = [...sectionOrder].reverse().find(({ id }) => {
        if (!id) return window.scrollY < 220;
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 180;
      });

      setActiveSection(active?.label ?? (language === 'ES' ? 'Inicio' : 'Home'));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [location.pathname]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith('/') || href.startsWith('http')) {
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
      return;
    }

    if (!isHomePage && href.startsWith('#')) {
      window.location.href = href === '#' ? '/' : `/${href}`;
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
      return;
    }

    event.preventDefault();
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (href === '#gallery') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }
    }

    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`${isHomePage ? 'fixed' : 'sticky'} left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1E3A2B]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.18)]'
          : 'bg-gradient-to-b from-[#0f261b]/80 via-[#173825]/70 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-20 items-center justify-between gap-3 py-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-md">
              <img src={logoSinac} alt="SINAC Logo" className="h-full w-full rounded-full object-contain" />
            </div>
            <div className="text-white">
              <div className="text-base font-bold leading-tight sm:text-lg">SINAC</div>
              <div className="text-[11px] opacity-90 sm:text-xs">Costa Rica</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => {
              const isActive = item.label === activeSection;

              if (item.children) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-white/15 text-[#27C5D8] shadow-inner'
                          : 'text-white/90 hover:bg-white/10 hover:text-[#27C5D8]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                      </span>
                    </button>

                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-[#123223]/95 p-3 shadow-2xl backdrop-blur-xl"
                        >
                          <div className="space-y-1">
                            {item.children.map((child) => {
                              const isRouteLink = child.href.startsWith('/');
                              if (isRouteLink) {
                                return (
                                  <Link
                                    key={child.label}
                                    to={child.href}
                                    className="block rounded-xl px-3 py-2 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-[#27C5D8]"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    <span className="block font-medium">{child.label}</span>
                                    {child.description ? <span className="mt-0.5 block text-xs text-white/60">{child.description}</span> : null}
                                  </Link>
                                );
                              }

                              return (
                                  <a
                                    key={child.label}
                                    href={child.href}
                                    target={child.href.startsWith('http') && !child.href.includes('serviciosenlinea.sinac.go.cr') ? '_blank' : undefined}
                                    rel={child.href.startsWith('http') && !child.href.includes('serviciosenlinea.sinac.go.cr') ? 'noopener noreferrer' : undefined}
                                    onClick={(event) => handleNavClick(event, child.href)}
                                    className="block rounded-xl px-3 py-2 text-sm text-white/80 transition-all hover:bg-white/10 hover:text-[#27C5D8]"
                                  >
                                  <span className="block font-medium">{child.label}</span>
                                  {child.description ? <span className="mt-0.5 block text-xs text-white/60">{child.description}</span> : null}
                                </a>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isRouteLink = item.href?.startsWith('/');
              if (isRouteLink && item.href) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/15 text-[#27C5D8] shadow-inner'
                        : 'text-white/90 hover:bg-white/10 hover:text-[#27C5D8]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => handleNavClick(event, item.href ?? '#')}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-[#27C5D8] shadow-inner'
                      : 'text-white/90 hover:bg-white/10 hover:text-[#27C5D8]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://serviciosenlinea.sinac.go.cr/"
              className="hidden lg:flex items-center gap-2 rounded-full border border-[#00bfff]/40 bg-[#00bfff]/10 px-4 py-2 text-sm font-medium text-[#00bfff] hover:bg-[#00bfff]/20"
            >
              <Ticket className="h-4 w-4" />
              <span>{language === 'ES' ? 'Comprar entradas' : 'Buy tickets'}</span>
            </a>
            <button
              onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
              className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/15"
            >
              <Globe className="h-5 w-5" />
              <span>{language === 'ES' ? 'English' : 'Español'}</span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="shrink-0 rounded-lg border border-white/10 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/15 lg:hidden"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#123223]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto max-w-[1600px] space-y-2 px-4 py-6 sm:px-6">
              <a
              href="https://serviciosenlinea.sinac.go.cr/"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#00bfff]/40 bg-[#00bfff]/10 px-4 py-3 text-sm font-semibold text-[#00bfff]"
            >
              <Ticket className="h-4 w-4" />
              <span>{language === 'ES' ? 'Comprar entradas' : 'Buy tickets'}</span>
            </a>

              <div className="space-y-2 pt-2">
                {navItems.map((item) => {
                  if (item.children) {
                    return (
                      <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5">
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium text-white/90"
                        >
                          <span className={item.label === activeSection ? 'text-[#27C5D8]' : ''}>{item.label}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 border-t border-white/10 px-4 py-3">
                                {item.children.map((child) => {
                                  const isRouteLink = child.href.startsWith('/');
                                  if (isRouteLink) {
                                    return (
                                      <Link
                                        key={child.label}
                                        to={child.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block rounded-xl px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-[#27C5D8]"
                                      >
                                        {child.label}
                                      </Link>
                                    );
                                  }
                                  return (
                                    <a
                                      key={child.label}
                                      href={child.href}
                                      target={child.href.startsWith('http') && !child.href.includes('serviciosenlinea.sinac.go.cr') ? '_blank' : undefined}
                                      rel={child.href.startsWith('http') && !child.href.includes('serviciosenlinea.sinac.go.cr') ? 'noopener noreferrer' : undefined}
                                      onClick={(event) => handleNavClick(event, child.href)}
                                      className="block rounded-xl px-3 py-2 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-[#27C5D8]"
                                    >
                                      {child.label}
                                    </a>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  const isRouteLink = item.href?.startsWith('/');
                  if (isRouteLink && item.href) {
                    return (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                          item.label === activeSection ? 'bg-white/10 text-[#27C5D8]' : 'text-white/90 hover:bg-white/10'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.href ?? '#')}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${
                        item.label === activeSection ? 'bg-white/10 text-[#27C5D8]' : 'text-white/90 hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <button
                onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10"
              >
                <Globe className="h-5 w-5" />
                <span>{language === 'ES' ? 'English' : 'Español'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
    </motion.nav>
  );
}
