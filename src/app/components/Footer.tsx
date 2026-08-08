import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import logoSinac from '@/assets/Logo-SINAC.png';
import { useLanguage } from '../context/LanguageContext';
import {
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Check,
  X,
} from 'lucide-react';
import { BookingModal } from './BookingModal';

type FooterLink = { label: string; href: string; external?: boolean; preview?: boolean };

const getFooterLinks = (language: 'ES' | 'EN'): Record<string, FooterLink[]> => ({
  about: [
    { label: language === 'EN' ? 'Mission and Vision' : 'Misión y Visión', href: '/mision-vision' },
    { label: language === 'EN' ? 'History' : 'Historia', href: '/historia' },
    { label: language === 'EN' ? 'Organizational Chart' : 'Organigrama', href: '/organigrama-sinac.pdf', preview: true },
  ],
  conservation: [
    { label: language === 'EN' ? 'Conservation Areas' : 'Áreas de Conservación', href: '/areas-conservacion' },
    { label: language === 'EN' ? 'National Parks' : 'Parques Nacionales', href: '/parques-nacionales' },
    { label: language === 'EN' ? 'Wildlife Refuges' : 'Refugios de Vida Silvestre', href: '#refuges' },
    { label: language === 'EN' ? 'Biological Reserves' : 'Reservas Biológicas', href: '#reserves' },
  ],
  visit: [
    { label: language === 'EN' ? 'Plan Your Visit' : 'Planifique su Visita', href: '#plan' },
    { label: language === 'EN' ? 'Buy Tickets' : 'Comprar Entradas', href: 'https://serviciosenlinea.sinac.go.cr/' },
    { label: language === 'EN' ? 'Hours and Rates' : 'Horarios y Tarifas', href: '/horarios-tarifas' },
    { label: language === 'EN' ? 'Visitor Guide' : 'Guía de Visitantes', href: '/parques-nacionales' },
  ],
  resources: [
    { label: language === 'EN' ? 'Research' : 'Investigación', href: '#research' },
    { label: language === 'EN' ? 'Publications' : 'Publicaciones', href: '#publications' },
    { label: language === 'EN' ? 'Digital Library' : 'Biblioteca Digital', href: '#library' },
    { label: language === 'EN' ? 'Open Data' : 'Datos Abiertos', href: '#data' },
  ],
  accessibility: [
    { label: language === 'EN' ? 'Accessibility' : 'Accesibilidad', href: '#accessibility' },
    { label: language === 'EN' ? 'Site Map' : 'Mapa del Sitio', href: '#sitemap' },
    { label: language === 'EN' ? 'Privacy Policy' : 'Política de Privacidad', href: '#privacy' },
    { label: language === 'EN' ? 'Terms of Use' : 'Términos de Uso', href: '#terms' },
  ],
});

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/cr.sinac/', label: 'Facebook' },
  { icon: Twitter, href: 'https://x.com/SINAC_CR', label: 'Twitter' },
  { icon: Youtube, href: 'https://www.youtube.com/user/aventurasinac', label: 'YouTube' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const footerLinks = getFooterLinks(language);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isOrganizationChartOpen, setIsOrganizationChartOpen] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(isEnglish ? 'Please enter a valid email address' : 'Por favor ingrese un correo válido');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail('');

    setTimeout(() => {
      setIsSuccess(false);
    }, 3000);
  };

  return (
    <footer id="contact" className="bg-[#1E3A2B] text-white">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden p-1.5 shadow-md shrink-0">
                <img src={logoSinac} alt="SINAC Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <div className="font-bold text-xl leading-tight">SINAC</div>
                <div className="text-sm opacity-80">Costa Rica</div>
              </div>
            </div>

            <p className="text-white/70 mb-6 leading-relaxed">
              {isEnglish
                ? 'The National System of Conservation Areas of Costa Rica. Protecting biodiversity and promoting sustainable tourism since 1998.'
                : 'Sistema Nacional de Áreas de Conservación de Costa Rica. Protegiendo la biodiversidad y promoviendo el turismo sostenible desde 1998.'}
            </p>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#27C5D8]" />
                <span>San José, Costa Rica</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-white/70">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#27C5D8]" />
                <span>+506 2522-6500</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-white/70">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#27C5D8]" />
                <div className="flex flex-col">
                  <a href="mailto:info@sinac.go.cr" className="hover:text-[#27C5D8] transition-colors">info@sinac.go.cr</a>
                  <a href="mailto:direccion.ejecutiva@sinac.go.cr" className="hover:text-[#27C5D8] transition-colors">direccion.ejecutiva@sinac.go.cr</a>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href !== '#' ? "_blank" : undefined}
                    rel={social.href !== '#' ? "noopener noreferrer" : undefined}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/10 hover:bg-[#27C5D8] rounded-lg flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:col-span-3 gap-8 lg:gap-12 lg:pl-12">
            <div>
              <h3 className="font-bold text-lg mb-4 text-[#27C5D8]">{isEnglish ? 'About SINAC' : 'Sobre SINAC'}</h3>
              <ul className="space-y-2">
                {footerLinks.about.map((link) => {
                  const isRouteLink = link.href.startsWith('/') && !link.external && !link.preview;

                  return (
                    <li key={link.label}>
                      {isRouteLink ? (
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm flex items-center space-x-1 group"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ) : link.preview ? (
                        <button
                          type="button"
                          onClick={() => setIsOrganizationChartOpen(true)}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm flex items-center space-x-1 group text-left"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          target={link.external ? '_blank' : undefined}
                          rel={link.external ? 'noopener noreferrer' : undefined}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm flex items-center space-x-1 group"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>

              <h3 className="font-bold text-lg mb-4 mt-8 text-[#27C5D8]">{isEnglish ? 'Conservation' : 'Conservación'}</h3>
              <ul className="space-y-2">
                {footerLinks.conservation.map((link) => {
                  const isRouteLink = link.href.startsWith('/');

                  return (
                    <li key={link.label}>
                      {isRouteLink ? (
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-[#27C5D8]">{isEnglish ? 'Visit' : 'Visite'}</h3>
              <ul className="space-y-2">
                {footerLinks.visit.map((link) => {
                  const isRouteLink = link.href.startsWith('/');

                  return (
                    <li key={link.label}>
                      {isRouteLink ? (
                        <Link
                          to={link.href}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            if (link.href === '#plan') {
                              e.preventDefault();
                              setIsBookingModalOpen(true);
                            }
                          }}
                          className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>

              <h3 className="font-bold text-lg mb-4 mt-8 text-[#27C5D8]">{isEnglish ? 'Resources' : 'Recursos'}</h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-[#27C5D8]">{isEnglish ? 'Legal' : 'Legal'}</h3>
              <ul className="space-y-2">
                {footerLinks.accessibility.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#27C5D8] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-[#27C5D8]">{isEnglish ? 'Subscribe' : 'Suscríbase'}</h3>
              <p className="text-white/70 text-sm mb-4">
                {isEnglish
                  ? 'Receive news and updates about our protected areas'
                  : 'Reciba noticias y actualizaciones sobre nuestras áreas protegidas'}
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isEnglish ? 'Your email address' : 'Su correo electrónico'}
                    disabled={isSubmitting || isSuccess}
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#27C5D8] transition-colors text-sm disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: isSubmitting || isSuccess ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting || isSuccess ? 1 : 0.95 }}
                    disabled={isSubmitting || isSuccess}
                    className="px-6 py-3 bg-[#27C5D8] hover:bg-[#1fa5b5] rounded-lg font-medium transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{isEnglish ? 'Sending...' : 'Enviando...'}</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{isEnglish ? 'Subscribed!' : '¡Suscrito!'}</span>
                      </>
                    ) : (
                      <span>{isEnglish ? 'Subscribe' : 'Suscribirse'}</span>
                    )}
                  </motion.button>
                </div>
                {error && <p className="text-red-300 text-xs">{error}</p>}
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2026 SINAC Costa Rica. {isEnglish ? 'All rights reserved.' : 'Todos los derechos reservados.'}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-[#27C5D8] transition-colors">
                {isEnglish ? 'Cookies Policy' : 'Política de Cookies'}
              </a>
              <a href="#" className="text-white/60 hover:text-[#27C5D8] transition-colors">
                {isEnglish ? 'Accessibility' : 'Accesibilidad'}
              </a>
              <a href="#" className="text-white/60 hover:text-[#27C5D8] transition-colors">
                {isEnglish ? 'Contact Us' : 'Contáctenos'}
              </a>
            </div>
          </div>
        </div>
      </div>
      <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      {isOrganizationChartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="organization-chart-title"
          onClick={() => setIsOrganizationChartOpen(false)}
        >
          <div
            className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-[#1E3A2B] px-5 py-3 text-white">
              <h2 id="organization-chart-title" className="font-semibold">
                {isEnglish ? 'SINAC Organizational Chart' : 'Organigrama del SINAC'}
              </h2>
              <button
                type="button"
                onClick={() => setIsOrganizationChartOpen(false)}
                className="rounded-lg p-1.5 transition-colors hover:bg-white/15"
                aria-label={isEnglish ? 'Close organizational chart' : 'Cerrar organigrama'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe
              src="/organigrama-sinac.pdf#toolbar=0&navpanes=0&view=FitH"
              title={isEnglish ? 'SINAC organizational chart PDF' : 'PDF del organigrama del SINAC'}
              className="min-h-0 flex-1 w-full"
            />
          </div>
        </div>
      )}
    </footer>
  );
}
