import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, ExternalLink, FileText, Handshake, HeartHandshake, MessageCircle, ShieldCheck, Users, X } from 'lucide-react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { Footer } from '../components/Footer';
import { Navigation } from '../components/Navigation';
import logoSinac from '@/assets/Logo-SINAC.png';

export function Transparency() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';
  const [openInstitutionalModal, setOpenInstitutionalModal] = useState<'legal' | 'missionVision' | 'values' | 'contact' | 'corac' | 'colac' | 'decisions' | 'assets' | 'personnel' | 'procurement' | 'services' | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const content = isEnglish
    ? {
        title: 'Transparency',
        intro:
          'SINAC promotes open access to information, accountability and citizen participation through clear institutional information and public reports.',
        sections: [
          {
            title: 'Institutional information',
            text: 'The institution provides basic information about its structure, legal framework, contact channels and governance.',
            items: [],
            links: [
              { label: '1.1.1.2 SINAC History', href: '/historia' },
              { label: '1.1.1.3 Legal framework', modal: 'legal' as const },
              { label: '1.1.1.3 Vision', modal: 'missionVision' as const },
              { label: '1.1.1.4 Mission', modal: 'missionVision' as const },
              { label: '1.1.1.5 Values', modal: 'values' as const },
              { label: '1.1.1.4 Contact information', modal: 'contact' as const },
              { label: '1.1.2.3.2 CORAC Representatives', modal: 'corac' as const },
              { label: '1.1.2.3.3 COLAC: Officials', modal: 'colac' as const },
              { label: '1.1.2.3.4 Decision-making', modal: 'decisions' as const },
              { label: '1.1.3 Institutional real estate assets', modal: 'assets' as const },
              { label: '1.2 Institutional personnel', modal: 'personnel' as const },
              { label: '1.3 Procurement processes', modal: 'procurement' as const },
              { label: '1.4 Institutional services and processes', modal: 'services' as const },
            ],
          },
          {
            title: 'Accountability',
            text: 'SINAC publishes financial and management information that allows citizens to understand how public resources are used.',
            items: ['Budget and execution', 'Operational plans', 'Audit reports', 'Management reports'],
            links: [
              { label: 'Budget and execution', href: '/transparencia' },
              { label: 'Financial management', href: '/transparencia' },
              { label: 'Audit reports', href: '/transparencia' },
            ],
          },
          {
            title: 'Citizen participation',
            text: 'The institution offers channels for participation, consultation and social control through institutional platforms and official social networks.',
            items: ['Participation mechanisms', 'Service oversight', 'Suggestions and complaints', 'Official social networks'],
            links: [
              { label: 'Participation mechanisms', href: '/transparencia' },
              { label: 'Service oversight', href: '/transparencia' },
              { label: 'Official contact', href: '/#contact' },
            ],
          },
          {
            title: 'Open government data',
            text: 'The institution makes available datasets under open formats that can be reused, redistributed and analyzed.',
            items: ['Open data publication', 'Legal availability', 'Accessible formats', 'Public reuse'],
            links: [
              { label: 'Open government data', href: '/transparencia' },
              { label: 'Decrees', href: '/transparencia' },
              { label: 'Draft laws', href: '/transparencia' },
            ],
          },
        ],
      }
    : {
        title: 'Transparencia',
        intro:
          'El SINAC promueve el acceso a la información, la rendición de cuentas y la participación ciudadana mediante información institucional clara y reportes públicos.',
        sections: [
          {
            title: 'Información institucional',
            text: 'La institución ofrece información básica sobre su estructura, marco jurídico, canales de contacto y gobernanza.',
            items: [],
            links: [
              { label: '1.1.1.2 Historia del SINAC', href: '/historia' },
              { label: '1.1.1.3 Marco jurídico aplicable', modal: 'legal' as const },
              { label: '1.1.1.3 Visión', modal: 'missionVision' as const },
              { label: '1.1.1.4 Misión', modal: 'missionVision' as const },
              { label: '1.1.1.5 Valores', modal: 'values' as const },
              { label: '1.1.1.4 Información de contacto', modal: 'contact' as const },
              { label: '1.1.2.3.2 CORAC Representantes', modal: 'corac' as const },
              { label: '1.1.2.3.3 COLAC: Funcionarios que lo integran', modal: 'colac' as const },
              { label: '1.1.2.3.4 Toma de Decisiones', modal: 'decisions' as const },
              { label: '1.1.3 Activos inmuebles de la Institución', modal: 'assets' as const },
              { label: '1.2 Información del personal institucional', modal: 'personnel' as const },
              { label: '1.3 Procesos de contratación', modal: 'procurement' as const },
              { label: '1.4 Servicios y procesos institucionales', modal: 'services' as const },
            ],
          },
          {
            title: 'Rendición de cuentas',
            text: 'El SINAC publica información financiera y de gestión que permite a la ciudadanía entender el uso de los recursos públicos.',
            items: ['Presupuesto y ejecución', 'Planes operativos', 'Informes de auditoría', 'Informes de gestión'],
            links: [
              { label: 'Presupuesto y ejecución', href: '/transparencia' },
              { label: 'Gestión financiera', href: '/transparencia' },
              { label: 'Informes de auditoría', href: '/transparencia' },
            ],
          },
          {
            title: 'Participación ciudadana',
            text: 'La institución ofrece mecanismos de participación, consulta y control social a través de plataformas institucionales y redes sociales oficiales.',
            items: ['Mecanismos de participación', 'Contraloría de servicios', 'Sugerencias y denuncias', 'Redes sociales oficiales'],
            links: [
              { label: 'Mecanismos de participación', href: '/transparencia' },
              { label: 'Contraloría de servicios', href: '/transparencia' },
              { label: 'Contacto oficial', href: '/#contact' },
            ],
          },
          {
            title: 'Datos abiertos de gobierno',
            text: 'La institución publica conjuntos de datos en formatos abiertos que pueden reutilizarse, redistribuirse y analizarse.',
            items: ['Publicación de datos abiertos', 'Disponibilidad legal', 'Formatos accesibles', 'Reutilización pública'],
            links: [
              { label: 'Datos abiertos', href: '/transparencia' },
              { label: 'Decretos', href: '/transparencia' },
              { label: 'Proyectos de ley', href: '/transparencia' },
            ],
          },
        ],
      };

  const publicInformationSections = isEnglish
    ? [
        {
          title: '1.1.1.3 Applicable legal framework',
          description: 'We provide the legal framework applicable to SINAC according to the hierarchical order established in Costa Rica, in accordance with Article 22 of the Biodiversity Law and related regulations. This includes agreements, laws, decrees, regulations, administrative resolutions and administrative and judicial jurisprudence, as well as labor and administrative procurement matters and criteria related to the institution.',
          links: [
            ['Transparency', 'https://www.sinac.go.cr/ES/transprncia'],
            ['International agreements', 'https://www.sinac.go.cr/ES/normjud/Paginas/convinter.aspx'],
            ['Legal criteria', 'https://www.sinac.go.cr/ES/normjud/Paginas/Critlegal.aspx'],
            ['Decrees', 'https://www.sinac.go.cr/ES/normjud/Paginas/decretos.aspx'],
            ['Guidelines', 'https://www.sinac.go.cr/ES/normjud/Paginas/dirct.aspx'],
            ['Administrative jurisprudence', 'https://www.sinac.go.cr/ES/normjud/Paginas/jurisadmin.aspx'],
            ['Laws', 'https://www.sinac.go.cr/ES/normjud/Paginas/leyes.aspx'],
            ['Bills', 'https://www.sinac.go.cr/ES/normjud/Paginas/proley.aspx'],
            ['Resolutions', 'https://www.sinac.go.cr/ES/normjud/Paginas/Resoluciones.aspx'],
            ['Judicial votes and judgments', 'https://www.sinac.go.cr/ES/normjud/Paginas/votosenjud.aspx'],
            ['Facebook', 'https://www.facebook.com/cr.sinac/'],
            ['Twitter / X', 'https://twitter.com/SINAC_CR'],
            ['YouTube', 'https://www.youtube.com/user/aventurasinac'],
          ],
        },
        {
          title: 'Contact information',
          description: 'SINAC contact channels, including physical address, telephone, email and official social networks.',
          links: [
            ['Contact SINAC', '/contactenos'],
            ['Facebook', 'https://www.facebook.com/cr.sinac/about'],
            ['Twitter / X', 'https://twitter.com/SINAC_CR'],
            ['YouTube', 'https://www.youtube.com/user/aventurasinac'],
          ],
        },
        {
          title: 'CORAC Representatives',
          description: 'Regional councils and their representatives by conservation area.',
          links: [
            ['ACAT', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Miembros%20Consejo%20Regional%20ACAT%20per%C3%ADodo%202021-2024.pdf'],
            ['ACTo', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Representantes%20del%20CORACTo.zip'],
            ['ACC', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Miembros%20del%20CORAC%20ACC.pdf'],
            ['ACLAP', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/SINAC-ACLA-P-DR-0562-2023%20David%20Chavarr%C3%ADa.pdf'],
            ['ACMC', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/SINAC-ACMC-DR-930-2019.pdf'],
            ['ACLAC', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Representantes%20del%20CORAC-ACLAC.pdf'],
            ['ACOSA', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/MIEMBROS%20DEL%20CONSEJO%20REGIONAL%20NOV2023-NOV2025.pdf'],
            ['ACAHN', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/LISTA%20DE%20MIEMBROS%20DEL%20CORAC-ACAHN_actualizada.pdf'],
            ['ACOPAC', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/CORAC%20(ACOPAC)%20anterior%202019.pdf'],
            ['ACG', 'https://www.sinac.go.cr/ES/transprncia/CORAC%20ACG/2025/Junta%20Directiva%20Consejo%20Regional%20ACG%202025-2028.pdf'],
          ],
        },
        {
          title: 'COLAC members',
          description: 'Information about the officials who make up the local councils.',
          links: [
            ['ACLAC', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
            ['ACOSA', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
            ['ACLAP', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
            ['ACG', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/CARTA-SINAC-CORACG-0052-2025%20%20Respuesta%20CARTA-SINAC-SE-DE-0491-2025.%20Consejo%20Local.pdf'],
            ['ACTo', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
          ],
        },
        {
          title: 'Decision-making',
          description: 'Agreements, minutes and councils that support institutional decisions.',
          links: [
            ['CONAC agreements', 'https://www.sinac.go.cr/ES/transprncia/Paginas/acuerdosconac.aspx'],
            ['CONAC minutes', 'https://www.sinac.go.cr/ES/transprncia/Paginas/actasconac.aspx'],
            ['Regional council minutes', 'https://www.sinac.go.cr/ES/transprncia/Paginas/consregcorac.aspx'],
            ['Local councils (COLAC)', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
          ],
        },
        {
          title: 'Institutional real estate assets',
          description: 'Information about owned, rented and assigned assets, including fixed expenses and transportation.',
          links: [
            ['Real estate assets', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/actinm.aspx'],
            ['Financial management', 'https://www.sinac.go.cr/ES/transprncia/Paginas/financiero.aspx'],
            ['Transportation', 'https://www.sinac.go.cr/ES/transprncia/Paginas/transp.aspx'],
          ],
        },
        {
          title: 'Institutional personnel',
          description: 'Public information about human resources and institutional authorities.',
          links: [
            ['Profiles of authorities', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/perjerac.aspx'],
            ['Human resources management', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/gestionrh.aspx'],
          ],
        },
        {
          title: 'Public procurement',
          description: 'Procurement processes, offers, contracts, suppliers and available positions.',
          links: [
            ['SICOP', 'https://www.sicop.go.cr/index.jsp'],
            ['Open procurement reports', 'https://www.observatoriocomprapublica.go.cr/compras/'],
            ['SINAC suppliers', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/proveedores.aspx'],
            ['Procurement program', 'https://www.sinac.go.cr/ES/transprncia/Paginas/progadquisiones.aspx'],
            ['Terms and conditions', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/pliegcond.aspx'],
            ['Offers', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/pubof.aspx'],
            ['Contracts', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/pubcont.aspx'],
            ['Procurement history', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/hiscont.aspx'],
            ['Award reports', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/inftecadj.aspx'],
          ],
        },
        {
          title: 'Institutional services and processes',
          description: 'Official channels for procedures, notices, news and social networks.',
          links: [
            ['Search procedures', 'https://tramitescr.meic.go.cr/tramites/BuscarTramites.aspx'],
            ['SINAC news', 'https://www.sinac.go.cr/ES/Paginas/default.aspx'],
            ['Facebook', 'https://www.facebook.com/cr.sinac/'],
            ['Instagram', 'https://www.instagram.com/sinac_cr/'],
            ['X / Twitter', 'https://twitter.com/sinac_cr?lang=es'],
          ],
        },
      ]
    : [
        {
          title: '1.1.1.3 Marco jurídico aplicable',
          description: 'Ponemos a disposición la normativa jurídica aplicable al Sistema Nacional de Áreas de Conservación, conforme al orden jerárquico establecido en nuestro país, de conformidad con el artículo 22 de la Ley de Biodiversidad y otras relacionadas. En este sitio pueden encontrar convenios, leyes, decretos, reglamentos, resoluciones administrativas y jurisprudencia administrativa y judicial, materia laboral y de contratación administrativa, así como criterios y dictámenes atinentes al quehacer de la institución.',
          links: [
            ['Transparencia', 'https://www.sinac.go.cr/ES/transprncia'],
            ['Convenios Internacionales', 'https://www.sinac.go.cr/ES/normjud/Paginas/convinter.aspx'],
            ['Criterios Legales', 'https://www.sinac.go.cr/ES/normjud/Paginas/Critlegal.aspx'],
            ['Decretos', 'https://www.sinac.go.cr/ES/normjud/Paginas/decretos.aspx'],
            ['Directrices', 'https://www.sinac.go.cr/ES/normjud/Paginas/dirct.aspx'],
            ['Jurisprudencia Administrativa', 'https://www.sinac.go.cr/ES/normjud/Paginas/jurisadmin.aspx'],
            ['Leyes', 'https://www.sinac.go.cr/ES/normjud/Paginas/leyes.aspx'],
            ['Proyectos de Ley', 'https://www.sinac.go.cr/ES/normjud/Paginas/proley.aspx'],
            ['Resoluciones', 'https://www.sinac.go.cr/ES/normjud/Paginas/Resoluciones.aspx'],
            ['Votos y Sentencias Judiciales', 'https://www.sinac.go.cr/ES/normjud/Paginas/votosenjud.aspx'],
            ['Facebook', 'https://www.facebook.com/cr.sinac/'],
            ['Twitter / X', 'https://twitter.com/SINAC_CR'],
            ['YouTube', 'https://www.youtube.com/user/aventurasinac'],
          ],
        },
        {
          title: '1.1.1.4 Información de contacto',
          description: 'Está disponible claramente la dirección física, el número de central telefónica, el correo electrónico de contacto y los enlaces a las redes sociales oficiales.',
          links: [
            ['Contáctenos', '/contactenos'],
            ['Facebook', 'https://www.facebook.com/cr.sinac/about'],
            ['Twitter / X', 'https://twitter.com/SINAC_CR'],
            ['YouTube', 'https://www.youtube.com/user/aventurasinac'],
          ],
        },
        {
          title: '1.1.2.3.2 CORAC Representantes',
          description: 'Representantes de los consejos regionales por área de conservación.',
          links: [
            ['Área de Conservación Arenal Tempisque (ACAT)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Miembros%20Consejo%20Regional%20ACAT%20per%C3%ADodo%202021-2024.pdf'],
            ['Área de Conservación Tortuguero (ACTo)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Representantes%20del%20CORACTo.zip'],
            ['Área de Conservación Central (ACC)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Miembros%20del%20CORAC%20ACC.pdf'],
            ['Área de Conservación La Amistad Pacífico (ACLAP)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/SINAC-ACLA-P-DR-0562-2023%20David%20Chavarr%C3%ADa.pdf'],
            ['Área de Conservación Marina Coco (ACMC)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/SINAC-ACMC-DR-930-2019.pdf'],
            ['Área de Conservación La Amistad Caribe (ACLAC)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/Representantes%20del%20CORAC-ACLAC.pdf'],
            ['Área de Conservación Osa (ACOSA)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/MIEMBROS%20DEL%20CONSEJO%20REGIONAL%20NOV2023-NOV2025.pdf'],
            ['Área de Conservación Arenal Huetar Norte (ACAHN)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/LISTA%20DE%20MIEMBROS%20DEL%20CORAC-ACAHN_actualizada.pdf'],
            ['Área de Conservación Pacífico Central (ACOPAC)', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/CORAC%20(ACOPAC)%20anterior%202019.pdf'],
            ['Área de Conservación Guanacaste (ACG)', 'https://www.sinac.go.cr/ES/transprncia/CORAC%20ACG/2025/Junta%20Directiva%20Consejo%20Regional%20ACG%202025-2028.pdf'],
          ],
        },
        {
          title: '1.1.2.3.3 COLAC: Funcionarios que lo integran',
          description: 'Funcionarios que integran los consejos locales de las áreas de conservación.',
          links: [
            ['COLAC - Área de Conservación La Amistad Caribe', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
            ['COLAC - Área de Conservación Osa', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
            ['COLAC - Área de Conservación La Amistad Pacífico', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
            ['COLAC - Área de Conservación Guanacaste', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Miembros%20CORAC/CARTA-SINAC-CORACG-0052-2025%20%20Respuesta%20CARTA-SINAC-SE-DE-0491-2025.%20Consejo%20Local.pdf'],
            ['COLAC - Área de Conservación Tortuguero', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
          ],
        },
        {
          title: '1.1.2.3.4 Toma de decisiones',
          description: 'Acuerdos, actas y consejos que respaldan las decisiones institucionales.',
          links: [
            ['Acuerdos del CONAC', 'https://www.sinac.go.cr/ES/transprncia/Paginas/acuerdosconac.aspx'],
            ['Actas del CONAC', 'https://www.sinac.go.cr/ES/transprncia/Paginas/actasconac.aspx'],
            ['Actas de los Consejos Regionales', 'https://www.sinac.go.cr/ES/transprncia/Paginas/consregcorac.aspx'],
            ['Consejos Locales COLAC', 'https://www.sinac.go.cr/ES/transprncia/Paginas/COLACs.aspx'],
          ],
        },
        {
          title: '1.1.3 Activos inmuebles de la Institución',
          description: 'Información sobre activos propios, alquilados, gastos fijos y transporte institucional.',
          links: [
            ['1.1.3.1 Listado de activos inmuebles', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/actinm.aspx'],
            ['1.1.3.2 Activos inmuebles alquilados', 'https://www.sinac.go.cr/ES/transprncia/Paginas/financiero.aspx'],
            ['1.1.3.3 Gastos fijos', 'https://www.sinac.go.cr/ES/transprncia/Paginas/financiero.aspx'],
            ['1.1.3.4 Transporte', 'https://www.sinac.go.cr/ES/transprncia/Paginas/transp.aspx'],
          ],
        },
        {
          title: '1.2 Información del personal institucional',
          description: 'Información pública relacionada con el recurso humano del SINAC.',
          links: [
            ['1.2.1.1 Información de jerarcas', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/perjerac.aspx'],
            ['Gestión del Desarrollo del Recurso Humano', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/gestionrh.aspx'],
          ],
        },
        {
          title: '1.3 Procesos de contratación',
          description: 'Información sobre contratación pública, proveedores y oportunidades de empleo.',
          links: [
            ['Sistema Integrado de Compras Públicas SICOP', 'https://www.sicop.go.cr/index.jsp'],
            ['Reportes de Compras - Observatorio de compras', 'https://www.observatoriocomprapublica.go.cr/compras/'],
            ['Proveedores del SINAC', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/proveedores.aspx'],
            ['1.3.1.1 Programa de adquisiciones', 'https://www.sinac.go.cr/ES/transprncia/Paginas/progadquisiones.aspx'],
            ['1.3.1.2 Pliegos de condiciones y criterios sostenibles', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/pliegcond.aspx'],
            ['1.3.1.3 Publicación de ofertas', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/pubof.aspx'],
            ['1.3.1.4 Publicación de contratos', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/pubcont.aspx'],
            ['1.3.1.5 Histórico de contrataciones', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/hiscont.aspx'],
            ['1.3.1.6 Informes técnicos de adjudicación', 'https://www.sinac.go.cr/ES/transprncia/infoinst/Paginas/inftecadj.aspx'],
          ],
        },
        {
          title: '1.4 Servicios y procesos institucionales',
          description: 'Trámites, noticias, comunicados y redes sociales oficiales.',
          links: [
            ['1.4.1.3 Manual o Catálogo de Trámites', 'https://tramitescr.meic.go.cr/tramites/BuscarTramites.aspx'],
            ['1.4.2.1 Avisos y Noticias', 'https://www.sinac.go.cr/ES/Paginas/default.aspx'],
            ['1.4.2.2 Publicaciones periódicas', 'https://www.facebook.com/cr.sinac/'],
            ['1.4.2.3 Comunicados de Prensa', 'https://www.sinac.go.cr/ES/Paginas/default.aspx'],
            ['1.4.2.4 Facebook', 'https://www.facebook.com/cr.sinac/'],
            ['Instagram', 'https://www.instagram.com/sinac_cr/'],
            ['Twitter / X', 'https://twitter.com/sinac_cr?lang=es'],
          ],
        },
      ];

  const resourceSections = {
    contact: publicInformationSections[1],
    corac: publicInformationSections[2],
    colac: publicInformationSections[3],
    decisions: publicInformationSections[4],
    assets: publicInformationSections[5],
    personnel: publicInformationSections[6],
    procurement: publicInformationSections[7],
    services: publicInformationSections[8],
  };

  const icons = [ShieldCheck, BookOpen, Handshake, FileText];
  const valueCards = isEnglish
    ? [
        ['Teamwork', 'Working together to protect Costa Rica’s natural heritage.', Users],
        ['Communication', 'Sharing information clearly, respectfully and transparently.', MessageCircle],
        ['Service vocation', 'Serving society and protected areas with commitment.', HeartHandshake],
        ['Commitment', 'Acting responsibly to achieve institutional goals.', CheckCircle2],
        ['Transparency', 'Building trust through openness and accountability.', ShieldCheck],
      ]
    : [
        ['Trabajo en equipo', 'Unimos esfuerzos para proteger el patrimonio natural de Costa Rica.', Users],
        ['Comunicación', 'Compartimos información de manera clara, respetuosa y transparente.', MessageCircle],
        ['Vocación de servicio', 'Atendemos a la sociedad y a las áreas protegidas con dedicación.', HeartHandshake],
        ['Compromiso', 'Actuamos con responsabilidad para alcanzar los objetivos institucionales.', CheckCircle2],
        ['Transparencia', 'Construimos confianza mediante la apertura y la rendición de cuentas.', ShieldCheck],
      ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navigation />
      {/* Breadcrumb */}
      <div className="bg-[#0f172a]/90 text-white/50 text-xs px-6 py-2 border-b border-white/10">
        <div className="mx-auto max-w-6xl">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <span className="mx-1">/</span>
          <span className="text-white/80">{isEnglish ? 'Transparency' : 'Transparencia'}</span>
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
                {isEnglish ? 'Institutional transparency' : 'Transparencia institucional'}
              </p>
              <h1 className="text-3xl font-bold sm:text-4xl">{content.title}</h1>
            </div>
          </div>

          <p className="max-w-3xl text-lg leading-8 text-slate-300">{content.intro}</p>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {content.sections.map((section, index) => {
              const Icon = icons[index];

              return (
                <section key={section.title} className="rounded-2xl border border-[#27C5D8]/20 bg-white/5 p-7 backdrop-blur-sm">
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-[#27C5D8]" />
                    <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                  </div>
                  <p className="text-base leading-8 text-slate-300">{section.text}</p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#27C5D8]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 space-y-2">
                    {section.links.map((link) => (
                      link.modal ? (
                        <button
                          key={link.label}
                          type="button"
                          onClick={() => setOpenInstitutionalModal(link.modal ?? null)}
                          className="flex items-center gap-2 text-left text-sm text-[#8fe8e5] transition hover:text-[#27C5D8]"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </button>
                      ) : (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="flex items-center gap-2 text-sm text-[#8fe8e5] transition hover:text-[#27C5D8]"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      )
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

        </div>
      </div>
      {openInstitutionalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="institutional-purpose-title"
          onClick={() => setOpenInstitutionalModal(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#27C5D8]/30 bg-gradient-to-br from-[#112b23] to-[#0f172a] p-7 shadow-2xl sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#27C5D8]">
                  {isEnglish ? 'Institutional purpose' : 'Propósito institucional'}
                </p>
                <h2 id="institutional-purpose-title" className="mt-2 text-3xl font-bold text-white">
                  {openInstitutionalModal === 'values'
                    ? (isEnglish ? 'SINAC Values' : 'Valores del SINAC')
                    : openInstitutionalModal === 'legal'
                      ? (isEnglish ? '1.1.1.3 Applicable legal framework' : '1.1.1.3 Marco jurídico aplicable')
                      : openInstitutionalModal !== 'missionVision'
                        ? resourceSections[openInstitutionalModal].title
                      : (isEnglish ? 'Public Value, Mission and Vision' : 'Valor público, Misión y Visión')}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpenInstitutionalModal(null)}
                className="rounded-lg p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                aria-label={isEnglish ? 'Close' : 'Cerrar'}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {openInstitutionalModal === 'values' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {valueCards.map(([value, description, ValueIcon]) => (
                  <div
                    key={value}
                    className="group relative overflow-hidden rounded-2xl border border-[#27C5D8]/20 bg-gradient-to-br from-[#27C5D8]/15 via-white/5 to-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#27C5D8]/60 hover:shadow-lg hover:shadow-[#27C5D8]/10"
                  >
                    <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-[#27C5D8]/10 blur-2xl transition group-hover:bg-[#27C5D8]/25" />
                    <ValueIcon className="relative mb-4 h-8 w-8 text-[#27C5D8]" />
                    <h3 className="relative text-lg font-semibold text-white">{value}</h3>
                    <p className="relative mt-2 text-sm leading-6 text-slate-300">{description}</p>
                  </div>
                ))}
              </div>
            ) : openInstitutionalModal === 'legal' ? (
              <div className="space-y-6 text-base leading-8 text-slate-300">
                <p>{publicInformationSections[0].description}</p>
                <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {publicInformationSections[0].links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('/') ? undefined : '_blank'}
                      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                      className="flex items-start gap-2 text-sm leading-6 text-[#8fe8e5] transition hover:text-[#27C5D8]"
                    >
                      <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : openInstitutionalModal !== 'missionVision' ? (
              <div className="space-y-6 text-base leading-8 text-slate-300">
                <p>{resourceSections[openInstitutionalModal].description}</p>
                <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {resourceSections[openInstitutionalModal].links.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('/') ? undefined : '_blank'}
                      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                      className="flex items-start gap-2 text-sm leading-6 text-[#8fe8e5] transition hover:text-[#27C5D8]"
                    >
                      <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-7 text-base leading-8 text-slate-300">
                <section>
                  <h3 className="mb-2 text-xl font-semibold text-white">{isEnglish ? 'Public Value' : 'Valor público'}</h3>
                  <p>
                    {isEnglish
                      ? 'Conservation and sustainable use of biodiversity and ecosystem services to ensure all citizens an ecologically balanced environment as the basis for the country’s development.'
                      : '“Conservación y uso sostenible de la biodiversidad y de los servicios ecosistémicos que permitan asegurarles a todos los ciudadanos un ambiente ecológicamente equilibrado, como base del desarrollo del país”.'}
                  </p>
                </section>
                <section>
                  <h3 className="mb-2 text-xl font-semibold text-white">{isEnglish ? 'Mission' : 'Misión'}</h3>
                  <p>
                    {isEnglish
                      ? 'The National System of Conservation Areas (SINAC) of Costa Rica integrally manages the conservation and sustainable management of wildlife, forest resources, protected wild areas, watersheds and water systems, together with society, for the well-being of present and future generations.'
                      : 'El Sistema Nacional de Áreas de Conservación (SINAC) de Costa Rica gestiona integralmente la conservación y manejo sostenible de la vida silvestre, los recursos forestales, las áreas silvestres protegidas, cuencas hidrográficas y sistemas hídricos, en conjunto con actores de la sociedad, para el bienestar de las actuales y futuras generaciones.'}
                  </p>
                </section>
                <section>
                  <h3 className="mb-2 text-xl font-semibold text-white">{isEnglish ? 'Vision' : 'Visión'}</h3>
                  <p>
                    {isEnglish
                      ? 'A National System of Conservation Areas (SINAC) that leads the conservation and sustainable use of biodiversity and natural resources, applies science and technology in decision-making, and uses participatory and equitable management to improve and maintain ecosystem services and contribute to Costa Rica’s sustainable development.'
                      : 'Un Sistema Nacional de Áreas de Conservación (SINAC) que lidera la conservación y uso sostenible de la biodiversidad y los recursos naturales, que aplica la ciencia y la técnica para la toma de decisiones, con gestión participativa y equitativa para mejorar y mantener los servicios ecosistémicos, que contribuya al desarrollo sostenible de Costa Rica.'}
                  </p>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
