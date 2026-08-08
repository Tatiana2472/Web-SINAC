import { useState, useEffect } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

// ─── Data & Types ───────────────────────────────────────────────
interface BilingualString {
  es: string;
  en: string;
}

interface ServiceItem {
  name: BilingualString;
  link?: string;
  note?: BilingualString;
}

interface ServiceCategory {
  id: string;
  name: BilingualString;
  description: BilingualString;
  items: ServiceItem[];
}

const onlineServicesData: {
  description: BilingualString;
  categories: ServiceCategory[];
} = {
  description: {
    es: 'A continuación se detallan los servicios en línea que brinda el Sistema Nacional de Áreas de Conservación:',
    en: 'Below are the online services provided by the National System of Conservation Areas:',
  },
  categories: [
    {
      id: 'compra-reserva-sicore',
      name: {
        es: 'Compra y Reserva en Línea (SICORE)',
        en: 'Online Purchase and Reservation (SICORE)',
      },
      description: {
        es: 'Realice la compra de entradas y reservas en línea a través de la plataforma oficial SICORE para los siguientes parques y sectores:',
        en: 'Purchase tickets and make reservations online through the official SICORE platform for the following parks and sectors:',
      },
      items: [
        {
          name: { es: 'Parque Nacional Chirripó: Sector San Gerardo, Sector San Jerónimo y Sector Herradura', en: 'Chirripó National Park: San Gerardo Sector, San Jerónimo Sector and Herradura Sector' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Volcán Poás', en: 'Poás Volcano National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Tortuguero: Sector Cuatro Esquinas y Cerro Tortuguero', en: 'Tortuguero National Park: Cuatro Esquinas Sector and Cerro Tortuguero' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Isla San Lucas', en: 'Isla San Lucas National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Volcán Irazú: Sector Prusia-Sector Cráteres', en: 'Irazú Volcano National Park: Prusia Sector–Craters Sector' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Manuel Antonio', en: 'Manuel Antonio National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Braulio Carrillo: Sector Volcán Barva', en: 'Braulio Carrillo National Park: Volcán Barva Sector' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Tapantí', en: 'Tapantí National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Volcán Tenorio', en: 'Tenorio Volcano National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Carara', en: 'Carara National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Rincón de la Vieja', en: 'Rincón de la Vieja National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: { es: 'Parque Nacional Los Quetzales', en: 'Los Quetzales National Park' },
          link: 'https://serviciosenlinea.sinac.go.cr/',
        },
        {
          name: {
            es: 'Para información adicional o consultas puede escribir a los correos electrónicos descritos en el siguiente enlace: Información de contacto',
            en: 'For additional information or inquiries, you may write to the email addresses described in the following link: Contact Information',
          },
          link: 'https://www.sinac.go.cr/ES/resvlinea/Documents/Correos%20ASP%20SICORE.pdf',
        },
      ],
    },
    {
      id: 'reserva-telefonica',
      name: {
        es: 'Reserva vía Telefónica',
        en: 'Reservation via Phone',
      },
      description: {
        es: 'Realice su reservación directamente por teléfono contactando el área de conservación correspondiente:',
        en: 'Make your reservation directly by phone by contacting the corresponding conservation area:',
      },
      items: [
        {
          name: {
            es: 'Parque Nacional Barra Honda',
            en: 'Barra Honda National Park',
          },
          note: {
            es: 'Tel: 2659-1551 / 8721-2444 / 8539-1010',
            en: 'Tel: 2659-1551 / 8721-2444 / 8539-1010',
          },
        },
      ],
    },
    {
      id: 'reserva-correo',
      name: {
        es: 'Reservación vía Correo Electrónico',
        en: 'Reservation via Email',
      },
      description: {
        es: 'Solicite su reservación enviando un correo electrónico a la dirección indicada para las siguientes áreas protegidas:',
        en: 'Request your reservation by sending an email to the indicated address for the following protected areas:',
      },
      items: [
        {
          name: { es: 'Parque Nacional Piedras Blancas', en: 'Piedras Blancas National Park' },
          note: { es: 'acosa.reservaciones@sinac.go.cr', en: 'acosa.reservaciones@sinac.go.cr' },
          link: 'mailto:acosa.reservaciones@sinac.go.cr',
        },
        {
          name: { es: 'Refugio Nacional de Fauna Silvestre Golfito', en: 'Golfito National Wildlife Refuge' },
          note: { es: 'acosa.reservaciones@sinac.go.cr', en: 'acosa.reservaciones@sinac.go.cr' },
          link: 'mailto:acosa.reservaciones@sinac.go.cr',
        },
        {
          name: { es: 'Parque Nacional Corcovado', en: 'Corcovado National Park' },
          note: { es: 'acosa.reservaciones@sinac.go.cr', en: 'acosa.reservaciones@sinac.go.cr' },
          link: 'mailto:acosa.reservaciones@sinac.go.cr',
        },
        {
          name: { es: 'Reserva Biológica Isla del Caño', en: 'Isla del Caño Biological Reserve' },
          note: { es: 'acosa.reservaciones@sinac.go.cr', en: 'acosa.reservaciones@sinac.go.cr' },
          link: 'mailto:acosa.reservaciones@sinac.go.cr',
        },
      ],
    },
    {
      id: 'compra-reserva-otros',
      name: {
        es: 'Compra y Reservación en Línea (Otras Plataformas)',
        en: 'Online Purchase & Reservation (Other Platforms)',
      },
      description: {
        es: 'Algunos parques nacionales utilizan plataformas externas para su proceso de reservación en línea:',
        en: 'Some national parks use external platforms for their online reservation process:',
      },
      items: [
        {
          name: {
            es: 'Parque Nacional Santa Rosa: Sector Marino y Sector Histórico (ACG)',
            en: 'Santa Rosa National Park: Marine Sector and Historic Sector (ACG)',
          },
          link: 'https://reservaciones.acguanacaste.ac.cr/',
          note: {
            es: 'Área de Conservación Guanacaste — reservaciones.acguanacaste.ac.cr',
            en: 'Guanacaste Conservation Area — reservaciones.acguanacaste.ac.cr',
          },
        },
        {
          name: {
            es: 'Estación Experimental Forestal Horizontes (ACG)',
            en: 'Horizontes Experimental Forestry Station (ACG)',
          },
          link: 'https://reservaciones.acguanacaste.ac.cr/',
          note: {
            es: 'Área de Conservación Guanacaste — reservaciones.acguanacaste.ac.cr',
            en: 'Guanacaste Conservation Area — reservaciones.acguanacaste.ac.cr',
          },
        },
        {
          name: {
            es: 'Parque Nacional Volcán Turrialba',
            en: 'Turrialba Volcano National Park',
          },
          link: 'https://www.icetur.com/volc%C3%A1n-turrialba',
          note: {
            es: 'www.icetur.com/volcán-turrialba o info@icetur.com',
            en: 'www.icetur.com/volcan-turrialba or info@icetur.com',
          },
        },
      ],
    },
    {
      id: 'boleteria-presencial',
      name: {
        es: 'Compra Directa en Boletería del Parque',
        en: 'Direct Purchase at Park Ticket Office',
      },
      description: {
        es: 'Ciertas áreas silvestres protegidas permiten la compra de entradas directamente en el sitio. Consulte las áreas disponibles bajo este mecanismo en el enlace indicado:',
        en: 'Certain protected wild areas allow ticket purchase directly on-site. Consult the areas available under this mechanism at the indicated link:',
      },
      items: [
        {
          name: {
            es: 'Consulte las áreas silvestres protegidas bajo este mecanismo de compra: Compra en sitio (PDF)',
            en: 'Consult the protected wild areas under this purchase mechanism: On-site Purchase (PDF)',
          },
          link: 'https://www.sinac.go.cr/ES/resvlinea/Documents/Compra%20en%20sitio%20oficial%20de%20ASP.pdf',
        },
      ],
    },
    {
      id: 'sistema-cites',
      name: {
        es: 'Sistema de Solicitud de Permisos de Exportación, Importación y Reexportación de Especies CITES',
        en: 'CITES Export, Import and Re-export Permit Request System',
      },
      description: {
        es: 'Acceda al sistema en línea para tramitar permisos de exportación, importación y reexportación del Comercio de Especies Amenazadas de Flora y Fauna Silvestres (CITES):',
        en: 'Access the online system to process export, import and re-export permits under the Convention on International Trade in Endangered Species of Wild Fauna and Flora (CITES):',
      },
      items: [
        {
          name: {
            es: 'Sistema CITES — Solicitud de Permisos',
            en: 'CITES System — Permit Requests',
          },
          link: 'https://cites.sinac.go.cr/',
          note: { es: 'cites.sinac.go.cr', en: 'cites.sinac.go.cr' },
        },
      ],
    },
    {
      id: 'solicitudes-criterio',
      name: {
        es: 'Solicitudes de Criterio Técnico — Ecosistema de Humedal',
        en: 'Technical Criteria Requests — Wetland Ecosystem',
      },
      description: {
        es: 'Acceda al Portal de Trámites para presentar solicitudes de criterio técnico relacionadas con ecosistemas de humedal:',
        en: 'Access the Procedures Portal to submit technical criteria requests related to wetland ecosystems:',
      },
      items: [
        {
          name: {
            es: 'Portal VUI — Solicitudes de Criterio Técnico',
            en: 'VUI Portal — Technical Criteria Requests',
          },
          link: 'https://portal.vui.cr/Login.aspx?ReturnUrl=/default.aspx',
          note: { es: 'portal.vui.cr', en: 'portal.vui.cr' },
        },
      ],
    },
    {
      id: 'sirefor',
      name: {
        es: 'Sistema de Información de Recursos Forestales de Costa Rica (SIREFOR)',
        en: 'Costa Rica Forest Resources Information System (SIREFOR)',
      },
      description: {
        es: 'Acceda al Sistema de Información de Recursos Forestales de Costa Rica para consultar información forestal y realizar trámites relacionados:',
        en: 'Access the Costa Rica Forest Resources Information System to consult forestry information and carry out related procedures:',
      },
      items: [
        {
          name: {
            es: 'SIREFOR — Sistema de Información de Recursos Forestales',
            en: 'SIREFOR — Forest Resources Information System',
          },
          link: 'https://www.sirefor.go.cr/',
          note: { es: 'www.sirefor.go.cr', en: 'www.sirefor.go.cr' },
        },
      ],
    },
  ],
};

// ─── Component ──────────────────────────────────────────────────
export function OnlineServices() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  const getStr = (strObj?: { es: string; en: string }) => {
    if (!strObj) return '';
    return isEnglish ? strObj.en || strObj.es : strObj.es;
  };

  const getInitialCategory = () => {
    const hash = window.location.hash.replace('#', '');
    const found = onlineServicesData.categories.find((c) => c.id === hash);
    return found ? found.id : onlineServicesData.categories[0].id;
  };

  const [activeCategoryId, setActiveCategoryId] = useState(getInitialCategory);

  const handleCategoryChange = (id: string) => {
    setActiveCategoryId(id);
    window.history.pushState({ categoryId: id }, '', `#${id}`);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (!window.location.hash) {
      window.history.replaceState(
        { categoryId: activeCategoryId },
        '',
        `#${activeCategoryId}`
      );
    }
    const onPopState = (e: PopStateEvent) => {
      const id =
        e.state?.categoryId || window.location.hash.replace('#', '');
      const found = onlineServicesData.categories.find((c) => c.id === id);
      if (found) {
        setActiveCategoryId(found.id);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const activeCategory =
    onlineServicesData.categories.find((c) => c.id === activeCategoryId) ||
    onlineServicesData.categories[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#333333] flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-[#1E3A2B]/90 px-4 py-2 text-xs text-white/70 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <span>Inicio</span> <span className="mx-1">/</span>
          <span>Trámites</span> <span className="mx-1">/</span>
          <span className="text-white font-medium">
            {isEnglish ? 'Online Services' : 'Servicios en Línea'}
          </span>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-[#1E3A2B] text-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8fe8e5]">
            {isEnglish ? 'Online Services' : 'Servicios en Línea'}
          </h1>
          <p className="mt-2 text-slate-300 text-sm max-w-3xl">
            {getStr(onlineServicesData.description)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:gap-8">

          {/* SIDEBAR */}
          <div className="w-full md:w-64 shrink-0">
            <div className="rounded-lg overflow-hidden shadow border border-gray-200 sticky top-24">
              {/* Green header */}
              <div className="bg-[#8cc33f] text-white font-bold text-sm px-4 py-3 text-center uppercase tracking-wide">
                {isEnglish ? 'Online Services' : 'Servicios en Línea'}
              </div>
              {/* Category list */}
              <ul className="bg-[#e8e8e8]">
                {onlineServicesData.categories.map((cat) => (
                  <li key={cat.id} className="border-b border-gray-300 last:border-b-0">
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between gap-2 ${
                        activeCategoryId === cat.id
                          ? 'bg-white text-[#1E3A2B] font-semibold border-l-4 border-l-[#8cc33f]'
                          : 'text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <span>{getStr(cat.name)}</span>
                      {activeCategoryId === cat.id && (
                        <ChevronRight className="w-3 h-3 text-[#8cc33f] shrink-0" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 min-w-0">
            <div className="min-h-[400px] rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-[#1E3A2B] mb-2">
                {getStr(activeCategory.name)}
              </h2>
              <p className="text-gray-500 text-sm mb-8 border-b border-gray-100 pb-6">
                {getStr(activeCategory.description)}
              </p>

              {activeCategory.items.length > 0 ? (
                <div className="space-y-0">
                  {/* Table header */}
                  <div className="grid grid-cols-1 rounded-t-lg bg-[#1E3A2B] text-xs font-bold uppercase text-white sm:grid-cols-[2fr_1fr]">
                    <div className="px-4 py-3">
                      {isEnglish ? 'Service / Area' : 'Servicio / Área'}
                    </div>
                    <div className="border-t border-white/20 px-4 py-2 sm:border-l sm:border-t-0 sm:py-3">
                      {isEnglish ? 'Access' : 'Acceso'}
                    </div>
                  </div>

                  {/* Rows */}
                  {activeCategory.items.map((item, index) => (
                    <div
                      key={index}
                      className={`grid grid-cols-1 border-b border-gray-200 sm:grid-cols-[2fr_1fr] ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      } hover:bg-[#f0f9e8] transition-colors`}
                    >
                      {/* Left cell — name + optional note */}
                      <div className="px-4 py-4 border-r border-gray-200">
                        <span className="text-[#1E3A2B] font-medium text-sm">
                          {getStr(item.name)}
                        </span>
                        {item.note && (
                          <p className="text-gray-400 text-xs mt-1 italic">
                            {getStr(item.note)}
                          </p>
                        )}
                      </div>

                      {/* Right cell — link button */}
                      <div className="px-4 py-4 flex items-center">
                        {item.link ? (
                          <a
                            href={item.link}
                            target={item.link.startsWith('mailto:') ? '_self' : '_blank'}
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#27C5D8] text-white text-xs font-semibold rounded-lg hover:bg-[#1fa5b5] transition-colors group"
                          >
                            <span>
                              {item.link.startsWith('mailto:')
                                ? isEnglish ? 'Send Email' : 'Enviar Correo'
                                : isEnglish ? 'Open Link' : 'Abrir Enlace'}
                            </span>
                            <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                          </a>
                        ) : (
                          <span className="text-gray-400 text-xs italic">
                            {isEnglish ? 'See description' : 'Ver descripción'}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Bottom accent bar */}
                  <div className="rounded-b-lg overflow-hidden border border-t-0 border-gray-200 h-1 bg-[#8cc33f]" />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-gray-400 text-sm">
                    {isEnglish
                      ? 'No items to display for this category.'
                      : 'No hay elementos para mostrar en esta categoría.'}
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
