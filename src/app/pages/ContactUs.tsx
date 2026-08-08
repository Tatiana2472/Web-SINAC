import { useEffect } from 'react';
import { Phone, Mail, MapPin, Building2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';

interface OfficeInfo {
  name: string;
  region: string;
  phones?: string[];
  fax?: string;
  emails?: string[];
  address?: string;
  notes?: string;
}

const getOffices = (isEnglish: boolean): OfficeInfo[] => [
  {
    name: isEnglish ? 'Executive Secretariat' : 'Secretaría Ejecutiva',
    region: isEnglish ? 'Central Office, Santa Rosa de Santo Domingo de Heredia' : 'Oficina Central, Santa Rosa de Santo Domingo de Heredia',
    phones: ['2522-6500'],
    emails: ['info@sinac.go.cr', 'direccion.ejecutiva@sinac.go.cr'],
    address: isEnglish ? '400 mt North and 250 mt West of the Shell Service Station in Santo Domingo de Heredia, or 2.5 km East of Valencia on the road to Heredia, district: Santa Rosa, canton: Santo Domingo, province: Heredia, Costa Rica' : '400 mt Norte y 250 mt Oeste de la Estación de Servicio Shell en Santo Domingo de Heredia, ó 2.5 km Este de la Valencia carretera a Heredia, distrito: Santa Rosa, cantón: Santo Domingo, provincia: Heredia, Costa Rica',
  },
  {
    name: isEnglish ? 'Arenal Huetar Norte Conservation Area (ACAHN)' : 'Área de Conservación Arenal Huetar Norte (ACAHN)',
    region: isEnglish ? 'Regional Office, Ciudad Quesada' : 'Oficina Regional, Ciudad Quesada',
    phones: ['2460-0055', '2460-1412'],
    emails: ['acahn.info@sinac.go.cr'],
    address: isEnglish ? '150 north and 200 east of San Carlos Hospital, Ciudad Quesada, San Carlos, Alajuela.' : '150 norte y 200 este del Hospital de San Carlos, Ciudad Quesada, San Carlos, Alajuela.',
  },
  {
    name: isEnglish ? 'Arenal Tempisque Conservation Area (ACAT)' : 'Área de Conservación Arenal Tempisque (ACAT)',
    region: isEnglish ? 'Regional Office, Tilarán' : 'Oficina Regional, Tilarán',
    phones: ['2695-5180'],
    fax: '2695-6570',
    address: isEnglish ? 'Guanacaste, Tilarán, 275 meters South of the public force facilities, next to the Fire Station, white corner building.' : 'Guanacaste, Tilarán, de las instalaciones de la fuerza pública 275 metros al Sur, contiguo a la Estación de Bomberos, edificio blanco esquinero.',
  },
  {
    name: isEnglish ? 'Guanacaste Conservation Area (ACG)' : 'Área de Conservación Guanacaste (ACG)',
    region: isEnglish ? 'Sub-regional Office, Liberia' : 'Oficina Sub-regional, Liberia',
    phones: ['2666-5051'],
    emails: ['acg.info@sinac.go.cr'],
    notes: isEnglish ? 'Forestry Procedures, Wildlife, Natural Heritage in the Maritime Terrestrial Zone. Tourist Information and general inquiries about Protected Areas.' : 'Trámites Forestales, Vida Silvestre, Patrimonio Natural en Zona Marítimo Terrestre. Información Turística y consultas generales sobre Áreas Protegidas.',
  },
  {
    name: isEnglish ? 'La Amistad Caribe Conservation Area (ACLAC)' : 'Área de Conservación La Amistad Caribe (ACLAC)',
    region: isEnglish ? 'Regional Office, Limón Centro' : 'Oficina Regional, Limón Centro',
    phones: ['2758-6612', '2758-6509'],
    emails: ['aclac.info@sinac.go.cr'],
    address: isEnglish ? 'Limón, Central Canton, Limón District, 150 meters north of the Civil Registry.' : 'Limón, Cantón Central, Distrito Limón, 150 metros norte del Registro Civil.',
  },
  {
    name: isEnglish ? 'La Amistad Pacífico Conservation Area (ACLAP)' : 'Área de Conservación La Amistad Pacífico (ACLAP)',
    region: isEnglish ? 'Regional Office, Pérez Zeledón' : 'Oficina Regional, Pérez Zeledón',
    phones: ['2771-3155'],
    fax: '2771-3297',
    emails: ['aclap.info@sinac.go.cr'],
    address: isEnglish ? 'Pérez Zeledón, Daniel Flores, Villa Ligia Neighborhood. 100 meters East and 100 meters South of UNED.' : 'Pérez Zeledón, Daniel Flores, Barrio Villa Ligia. 100 metros Este y 100 metros Sur de la UNED.',
  },
  {
    name: isEnglish ? 'Central Conservation Area (ACC)' : 'Área de Conservación Central (ACC)',
    region: isEnglish ? 'Regional Office, San Miguel de Santo Domingo, Heredia' : 'Oficina Regional, San Miguel de Santo Domingo, Heredia',
    phones: ['2268-8091', '2268-8087'],
    fax: '2268-8096',
    emails: ['acc.info@sinac.go.cr'],
    address: isEnglish ? '400 mt North and 250 mt West of the Shell Service Station in Santo Domingo de Heredia, or 2.5 km East of Valencia on the road to Heredia, district: Santa Rosa, canton: Santo Domingo, province: Heredia, Costa Rica.' : '400 mt Norte y 250 mt Oeste de la Estación de Servicio Shell en Santo Domingo de Heredia, ó 2.5 km Este de la Valencia carretera a Heredia, distrito: Santa Rosa, cantón: Santo Domingo, provincia: Heredia, Costa Rica.',
  },
  {
    name: isEnglish ? 'Marina Coco Conservation Area (ACMC)' : 'Área de Conservación Marina Coco (ACMC)',
    region: isEnglish ? 'Regional Office, San José' : 'Oficina Regional, San José',
    phones: ['2291-1215', '2291-1216'],
    fax: '2291-1264',
    emails: ['acmc.info@sinac.go.cr'],
    address: isEnglish ? '400 mt North and 250 mt West of the Shell Service Station in Santo Domingo de Heredia, or 2.5 km East of Valencia on the road to Heredia, district: Santa Rosa, canton: Santo Domingo, province: Heredia, Costa Rica.' : '400 mt Norte y 250 mt Oeste de la Estación de Servicio Shell en Santo Domingo de Heredia, ó 2.5 km Este de la Valencia carretera a Heredia, distrito: Santa Rosa, cantón: Santo Domingo, provincia: Heredia, Costa Rica.',
  },
  {
    name: isEnglish ? 'Osa Conservation Area (ACOSA)' : 'Área de Conservación Osa (ACOSA)',
    region: isEnglish ? 'Regional Office, Golfito' : 'Oficina Regional, Golfito',
    phones: ['2775-1210'],
    fax: '2775-9010',
    emails: ['acosa.info@sinac.go.cr'],
    address: isEnglish ? '800 meters North of the Golfito airstrip, old Naranjal.' : '800 mts Norte de Pista de aterrizaje de Golfito, Antiguo Naranjal.',
  },
  {
    name: isEnglish ? 'Tempisque Conservation Area (ACT)' : 'Área de Conservación Tempisque (ACT)',
    region: isEnglish ? 'Regional Office, Nicoya' : 'Oficina Regional, Nicoya',
    phones: ['2686-4967'],
    fax: '2686-4969',
    emails: ['act.info@sinac.go.cr'],
    address: isEnglish ? 'South side of the New Catholic Temple, Nicoya, Guanacaste.' : 'Costado Sur del Templo Católico Nuevo, Nicoya, Guanacaste.',
  },
  {
    name: isEnglish ? 'Tortuguero Conservation Area (ACTO)' : 'Área de Conservación Tortuguero (ACTO)',
    region: isEnglish ? 'Regional Office, Guápiles' : 'Oficina Regional, Guápiles',
    phones: ['2710-2929'],
    fax: '2710-7673',
    emails: ['acto.info@sinac.go.cr'],
    address: isEnglish ? 'Old road to Jiménez de Pococí, next to the bridge over the Santa Clara River.' : 'Carretera vieja a Jiménez de Pococí, junto al puente sobre el Rio Santa Clara.',
  },
  {
    name: isEnglish ? 'Pacífico Central Conservation Area (ACOPAC)' : 'Área de Conservación Pacífico Central (ACOPAC)',
    region: isEnglish ? 'Regional Office, Puriscal' : 'Oficina Regional, Puriscal',
    phones: ['2416-7068'],
    fax: '2416-5017',
    emails: ['acopac.info@sinac.go.cr'],
    address: isEnglish ? '1,800 meters Southeast of the EBAIS in Santiago de Puriscal, Santa Cecilia Neighborhood, road to San Rafael.' : '1.800 metros al Sureste de los EBAIS en Santiago de Puriscal, Barrio Santa Cecilia, carretera a San Rafael.',
  },
];

function OfficeCard({ office, isFirst, isEnglish }: { office: OfficeInfo; isFirst?: boolean; isEnglish: boolean }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${isFirst ? 'border-[#8cc33f]' : 'border-gray-200'}`}>
      <div className={`px-6 py-4 ${isFirst ? 'bg-[#8cc33f]' : 'bg-[#1E3A2B]'}`}>
        <div className="flex items-start gap-3">
          <Building2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-bold text-base leading-snug">{office.name}</h3>
            <p className="text-white/80 text-sm mt-0.5">{office.region}</p>
          </div>
        </div>
      </div>
      <div className="px-6 py-5 space-y-3">
        {office.notes && (
          <p className="text-gray-500 text-sm italic border-l-2 border-[#8cc33f] pl-3">{office.notes}</p>
        )}
        {office.phones && office.phones.length > 0 && (
          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-[#8cc33f] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{isEnglish ? 'Phone' : 'Teléfono'}</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {office.phones.map((p, i) => (
                  <a key={i} href={`tel:${p.replace(/-/g, '')}`} className="text-[#1E3A2B] font-medium text-sm hover:text-[#8cc33f] transition-colors">
                    {p}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        {office.fax && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold ml-6">Fax: </span>
            <span className="text-gray-600 text-sm">{office.fax}</span>
          </div>
        )}
        {office.emails && office.emails.length > 0 && (
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 text-[#27C5D8] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{isEnglish ? 'Email' : 'Correo Electrónico'}</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {office.emails.map((e, i) => (
                  <a key={i} href={`mailto:${e}`} className="text-[#27C5D8] text-sm hover:underline">
                    {e}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        {office.address && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#a22c6d] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{isEnglish ? 'Physical address' : 'Dirección física'}</span>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">{office.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function ContactUs() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#333333] flex flex-col">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-[#1E3A2B]/90 text-white/70 text-xs px-6 py-2">
        <div className="mx-auto max-w-7xl">
          <span>Inicio</span> <span className="mx-1">/</span>
          <span>Trámites</span> <span className="mx-1">/</span>
          <span className="text-white font-medium">{isEnglish ? 'Contact Us' : 'Contáctenos'}</span>
        </div>
      </div>

      {/* Page header */}
      <div className="bg-[#1E3A2B] text-white py-10">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#8fe8e5]">
            {isEnglish ? 'Contact Us' : 'Contáctenos'}
          </h1>
          <p className="mt-2 text-slate-300 text-sm">
            {isEnglish
              ? 'Find our offices and contact information across Costa Rica.'
              : 'Encuentre nuestras oficinas e información de contacto en todo Costa Rica.'}
          </p>
        </div>
      </div>

      {/* Office Grid */}
      <div className="flex-1 mx-auto max-w-7xl w-full px-6 py-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getOffices(isEnglish).map((office, i) => (
            <OfficeCard key={i} office={office} isFirst={i === 0} isEnglish={isEnglish} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
