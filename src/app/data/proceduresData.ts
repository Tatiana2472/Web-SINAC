export interface BilingualString {
  es: string;
  en: string;
}

export interface Procedure {
  name: BilingualString;
  description: BilingualString;
  link?: string;
}

export interface Category {
  id: string;
  name: BilingualString;
  description: BilingualString;
  procedures: Procedure[];
}

export interface ProceduresSection {
  title: BilingualString;
  description: BilingualString;
  emptyMessage: BilingualString;
  categories: Category[];
}

export const proceduresData: ProceduresSection = {
  "title": {
    "es": "Trámites Institucionales",
    "en": "Institutional Procedures"
  },
  "description": {
    "es": "A continuación se detallan las categorías de los Trámites Institucionales que brinda el Sistema Nacional de Áreas de Conservación, relacionados con:",
    "en": "Below are the categories of Institutional Procedures provided by the National System of Conservation Areas:"
  },
  "emptyMessage": {
    "es": "No hay elementos para mostrar en esta vista de la lista",
    "en": "There are no items to display in this list"
  },
  "categories": [
    {
      "id": "asp",
      "name": {
        "es": "Áreas Silvestres Protegidas y Patrimonio Natural del Estado",
        "en": "Protected Wild Areas and State Natural Heritage"
      },
      "description": {
        "es": "En esta sección encontrará los trámites relacionados con Áreas Silvestres Protegidas y Patrimonio Natural del Estado.",
        "en": "In this section you will find procedures related to Protected Wild Areas and State Natural Heritage."
      },
      "procedures": [
        {
          "name": {
            "es": "Solicitud de permiso de uso para actividades de capacitación, ecoturismo e investigación en terrenos declarados como Patrimonio Natural del Estado.",
            "en": "Request for use permit for training, ecotourism and research activities on lands declared as State Natural Heritage."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado para llevar a cabo actividades de capacitación, ecoturismo e investigación en terrenos declarados como Patrimonio Natural del Estado, ya sea dentro de Áreas Silvestres Protegidas o no (dependiendo de la actividad). Estos permisos se emiten en condición precaria y deben estar en concordancia con los planes de manejo y zonificación definidos por el área de conservación correspondiente.",
            "en": "This is a procedure requested by an interested party to carry out training, ecotourism and research activities on lands declared as State Natural Heritage, whether within Protected Wild Areas or not (depending on the activity). These permits are issued on a precarious basis and must be consistent with the management and zoning plans defined by the corresponding conservation area."
          }
        },
        {
          "name": {
            "es": "Solicitud de renovación de permiso de uso para la acuicultura sostenible de camarón en terrenos dentro del Patrimonio Natural del Estado.",
            "en": "Request for renewal of use permit for sustainable shrimp aquaculture on lands within the State Natural Heritage."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado en renovar o prorrogar su permiso de uso para la acuicultura sostenible de camarón que previamente hubiese sido otorgado, de forma individual o asociativa, a título precario, en terrenos de manglar, dentro del Patrimonio Natural del Estado, que cuenten con plan de manejo elaborado por el área de conservación respectiva y que identifique la actividad como parte de las acciones de manejo.",
            "en": "This is a procedure requested by an interested party to renew or extend their use permit for sustainable shrimp aquaculture previously granted, individually or collectively, on a precarious basis, on mangrove land within the State Natural Heritage, with a management plan prepared by the respective conservation area that identifies the activity as part of the management actions."
          }
        },
        {
          "name": {
            "es": "Solicitud de renovación de permiso de uso para la producción de sal, en terrenos dentro del Patrimonio Natural del Estado.",
            "en": "Request for renewal of use permit for salt production on lands within the State Natural Heritage."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado en renovar o prorrogar su permiso de uso para la producción de sal que previamente hubiese sido otorgado, de forma individual o asociativa, a título precario, en terrenos de manglar, dentro del Patrimonio Natural del Estado, que cuenten con plan de manejo elaborado por el área de conservación respectiva y que identifique la actividad como parte de las acciones de manejo.",
            "en": "This is a procedure requested by an interested party to renew or extend their use permit for salt production previously granted, individually or collectively, on a precarious basis, on mangrove land within the State Natural Heritage, with a management plan prepared by the respective conservation area that identifies the activity as part of the management actions."
          }
        }
      ]
    },
    {
      "id": "informacion",
      "name": {
        "es": "Información y Regularización del Territorio",
        "en": "Information and Territory Regularization"
      },
      "description": {
        "es": "En esta sección encuentra los trámites relacionados con Información y Regularización del Territorio.",
        "en": "In this section you will find procedures related to Information and Territory Regularization."
      },
      "procedures": []
    },
    {
      "id": "investigacion",
      "name": {
        "es": "Investigación",
        "en": "Research"
      },
      "description": {
        "es": "En esta sección encontrará los trámites relacionados con Investigación.",
        "en": "In this section you will find procedures related to Research."
      },
      "procedures": [
        {
          "name": {
            "es": "Formalización de Consentimientos Previamente Informados para el Acceso a los Recursos Genéticos y Bioquímicos",
            "en": "Formalization of Previously Informed Consents for Access to Genetic and Biochemical Resources"
          },
          "description": {
            "es": "Consentimientos Previamente Informados (CPI) es un contrato entre el interesado (persona física o jurídica) y el SINAC cuando se va a realizar un proyecto de investigación básica, bioprospección o comercialización in situ en terrenos patrimonio natural del estado o ex situ con material extraído de dichos lugares y que involucra acceso genético o bioquímico de la biodiversidad. El CPI incluye una distribución justa y equitativa de los beneficios y las condiciones mutuamente acordadas.",
            "en": "Previously Informed Consents (PIC) is a contract between the interested party (natural or legal person) and SINAC when a basic research, bioprospecting or commercialization project is to be carried out in situ on lands that are natural heritage of the state or ex situ with material extracted from those places, and that involves genetic or biochemical access to biodiversity. The PIC includes fair and equitable distribution of benefits and mutually agreed conditions."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8133"
        }
      ]
    },
    {
      "id": "participacion",
      "name": {
        "es": "Participación Ciudadana",
        "en": "Citizen Participation"
      },
      "description": {
        "es": "En este apartado encontrará los trámites relacionados con Participación Ciudadana.",
        "en": "In this section you will find procedures related to Citizen Participation."
      },
      "procedures": [
        {
          "name": {
            "es": "Suscripción de convenios de voluntariado",
            "en": "Subscription of volunteering agreements"
          },
          "description": {
            "es": "Establecer los pasos que se deben seguir para la elaboración y análisis de convenios de cooperación a suscribir entre el SINAC y Entidades u Organizaciones Públicas o Privadas, Nacionales o Internacionales, según la definición establecida en este procedimiento, para su aprobación por parte del Consejo Nacional de Áreas de Conservación (CONAC).",
            "en": "Establish the steps to be followed for the development and analysis of cooperation agreements to be signed between SINAC and Public or Private, National or International Entities or Organizations, according to the definition established in this procedure, for approval by the National Conservation Areas Council (CONAC)."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20Tr%C3%A1mite%20Suscripci%C3%B3n%20de%20convenios%20de%20voluntariado.pdf"
        },
        {
          "name": {
            "es": "Gestión del voluntariado en las ASP bajo administración del SINAC",
            "en": "Volunteer management in ASPs under SINAC administration"
          },
          "description": {
            "es": "Los servicios voluntarios representan para el Sistema Nacional de Áreas de Conservación una fuente importante e indispensable de apoyo para fortalecer la conservación de los recursos existentes en las Áreas Silvestres Protegidas.",
            "en": "Voluntary services represent an important and indispensable source of support for the National System of Conservation Areas to strengthen the conservation of resources existing in Protected Wild Areas."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20Tr%C3%A1mite%20Gesti%C3%B3n%20del%20voluntariado%20en%20las%20ASP%20bajo%20administraci%C3%B3n%20del%20SINAC.pdf"
        }
      ]
    },
    {
      "id": "recurso-forestal",
      "name": {
        "es": "Recurso Forestal",
        "en": "Forest Resources"
      },
      "description": {
        "es": "En este apartado encuentra los trámites relacionados con Recurso Forestal.",
        "en": "In this section you will find procedures related to Forest Resources."
      },
      "procedures": [
        {
          "name": {
            "es": "Solicitudes en terrenos de uso agropecuario y sin bosque, que no excedan los tres árboles por hectárea de área efectiva y que superan los 10 árboles por inmueble, por año (Inventario Forestal).",
            "en": "Requests on agricultural land without forest, not exceeding three trees per hectare of effective area and exceeding 10 trees per property per year (Forest Inventory)."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado para la corta y aprovechamiento de árboles en terrenos privados de uso agropecuario y sin bosque, extendidos por la Administración Forestal del Estado (SINAC), en el cual no se exceden los tres árboles por hectárea de área efectiva y que en la solicitud supera la cantidad de 10 árboles por inmueble, por año. Así también, aplica para árboles caídos. Para este tipo de permisos, el interesado deberá tramitar su solicitud a través de un Inventario Forestal, el cual deberá ser elaborado por un profesional en ciencias forestales y en este caso, el aprovechamiento se realizará bajo la supervisión de un regente forestal.",
            "en": "This is a procedure requested by an interested party for the felling and exploitation of trees on private agricultural land without forest, issued by the State Forest Administration (SINAC), in which the three trees per hectare of effective area are not exceeded and the application exceeds 10 trees per property per year. It also applies to fallen trees. For this type of permit, the interested party must process their application through a Forest Inventory, which must be prepared by a professional in forest sciences and in this case, the exploitation will be carried out under the supervision of a forest regent."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8660"
        },
        {
          "name": {
            "es": "Corta o eliminación de árboles, para proyectos de infraestructura pública o privada, declarados de conveniencia nacional (PE-CN)",
            "en": "Felling or removal of trees for public or private infrastructure projects declared of national convenience (PE-CN)"
          },
          "description": {
            "es": "Son aquellas solicitudes para el aprovechamiento maderable o corta de árboles en predios de propiedad privada o estatal, que no constituyan Patrimonio Natural del Estado, donde se requiera eliminar bosque o árboles para desarrollar infraestructura declarada de Conveniencia Nacional, a cargo de las dependencias centralizadas del Estado, las instituciones autónomas o la empresa privada, cuyos beneficios sociales sean mayores que los costos socio-ambientales, esto de conformidad con el artículo 19 inciso b) de la Ley Forestal 7575 y el artículo 2 inciso m) del Reglamento a la Ley Forestal, Decreto Ejecutivo 25721-MINAE.",
            "en": "These are requests for timber exploitation or felling of trees on private or state-owned land, which do not constitute State Natural Heritage, where it is necessary to clear forest or trees to develop infrastructure declared of National Convenience, under the responsibility of centralized state agencies, autonomous institutions or private companies, whose social benefits are greater than the socio-environmental costs, in accordance with article 19 subsection b) of Forestry Law 7575 and article 2 subsection m) of the Forestry Law Regulations, Executive Decree 25721-MINAE."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8661"
        },
        {
          "name": {
            "es": "Solicitudes en terrenos de uso agropecuario y sin bosque, que no excedan los tres árboles maderables por hectárea de área efectiva, hasta un máximo de 10 árboles por inmueble por año (permisos pequeños).",
            "en": "Requests on agricultural land without forest, not exceeding three timber trees per hectare of effective area, up to a maximum of 10 trees per property per year (small permits)."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado para obtener un permiso de corta y aprovechamiento de árboles conocido como Permiso Pequeño, el cual se utiliza para árboles ubicados en terrenos de uso agropecuario y sin bosque, que no superen los 3 árboles maderables por hectárea, hasta un máximo de 10 árboles por inmueble por año o la fracción de estos de acuerdo al tamaño del predio.",
            "en": "This is a procedure requested by an interested party to obtain a tree felling and exploitation permit known as a Small Permit, which is used for trees located on agricultural land without forest, not exceeding 3 timber trees per hectare, up to a maximum of 10 trees per property per year or a fraction thereof depending on the size of the property."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8661"
        },
        {
          "name": {
            "es": "Trámite para donación de madera proveniente de corta de árboles por ampliación y/o mantenimiento de las vías públicas.",
            "en": "Procedure for timber donation from tree felling for the expansion and/or maintenance of public roads."
          },
          "description": {
            "es": "Este trámite corresponde a la solicitud de donación de madera por parte de una junta administrativa, o de educación o asociación, en favor de los centros educativos del Ministerio de Educación Pública, procedente de la corta y/o eliminación de árboles maderables que se realiza para la ampliación o mantenimiento a las vías públicas.",
            "en": "This procedure corresponds to the request for timber donation by an administrative board, education board or association, in favor of educational centers of the Ministry of Public Education, from the felling and/or removal of timber trees carried out for the expansion or maintenance of public roads."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Donaci%C3%B3n%20de%20madera.pdf"
        },
        {
          "name": {
            "es": "Solicitud de inscripción de finca en el Registro de Proyectos Forestales (RPF)",
            "en": "Application for registration of a farm in the Forest Projects Registry (RPF)"
          },
          "description": {
            "es": "Con el fin de reconocer los servicios que brindan a la sociedad las personas dueñas de bosques y/o con proyectos de producción forestal, La Ley Forestal 7575 en sus artículos 22, 23, 24 y 29 crea algunos incentivos, dentro de ellos la exención del pago de impuestos sobre bienes inmuebles.",
            "en": "In order to recognize the services provided to society by forest owners and/or those with forest production projects, Forestry Law 7575 in its articles 22, 23, 24 and 29 creates certain incentives, including exemption from payment of real estate taxes."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Incripci%C3%B3n%20de%20finca%20en%20RPF.pdf"
        },
        {
          "name": {
            "es": "Solicitud de inscripción de industria forestal",
            "en": "Application for registration of a forest industry"
          },
          "description": {
            "es": "Toda persona física o jurídica que desee industrializar materia prima (madera) procedente del bosque, de árboles en terrenos de uso agropecuario no plantados, o árboles caídos, ya sea mediante industrias estacionarias o de manera ambulante (portátil), deberán estar inscritas ante la Administración Forestal del Estado (SINAC).",
            "en": "Any natural or legal person wishing to industrialize raw material (timber) from forests, from trees on unplanted agricultural land, or fallen trees, whether through stationary or mobile (portable) industries, must be registered with the State Forest Administration (SINAC)."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Incripci%C3%B3n%20Industria%20Forestal.pdf"
        },
        {
          "name": {
            "es": "Permiso especial (PE) para corta o eliminación de los árboles ubicados en propiedades privadas que afecten el derecho de vía.",
            "en": "Special permit (PE) for felling or removal of trees located on private properties affecting the right-of-way."
          },
          "description": {
            "es": "Es aquella solicitud de permiso para la corta y aprovechamiento de árboles ubicados en terrenos privados de uso agropecuario y sin bosque, que no excede los tres árboles por hectárea de área efectiva y que afectan el derecho de vía, requerida por las instituciones públicas a cargo del desarrollo y mantenimiento de vías públicas y extendidos por la Administración Forestal del Estado (SINAC).",
            "en": "This is a permit request for the felling and exploitation of trees located on private agricultural land without forest, not exceeding three trees per hectare of effective area, that affect the right-of-way, requested by public institutions in charge of the development and maintenance of public roads and issued by the State Forest Administration (SINAC)."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20PE%20elim%20de%20%C3%A1rboles%20en%20terrenos%20priv%20que%20afectan%20derechos%20de%20v%C3%ADa.pdf"
        },
        {
          "name": {
            "es": "Estándares de Sostenibilidad para Manejo de Bosques Naturales: Principios, Criterios e Indicadores, Código de Prácticas y Manual de Procedimientos",
            "en": "Sustainability Standards for Natural Forest Management: Principles, Criteria and Indicators, Code of Practices and Procedures Manual"
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado para obtener la aprobación de un Plan de Manejo de bosque natural (primario), el cual mediante estudios técnicos dirigidos por un profesional forestal le permitirá la corta y aprovechamiento sostenible de árboles dentro de su ecosistema boscoso, de acuerdo a lo dictado por los artículos 3 (inciso e) y 20 de la Ley Forestal 7575.",
            "en": "This is a procedure requested by an interested party to obtain approval of a Natural (primary) Forest Management Plan, which through technical studies directed by a forest professional will allow the sustainable felling and exploitation of trees within their forest ecosystem, in accordance with articles 3 (subsection e) and 20 of Forestry Law 7575."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Plan%20de%20Manejo%20en%20BN.pdf"
        },
        {
          "name": {
            "es": "Estándares de sostenibilidad para el manejo de bosques secundarios: Principios, criterios e indicadores, Código de prácticas y Manual de procedimientos y derogatoria del decreto N° 27998-MINAE del 22 de junio de 1999.",
            "en": "Sustainability standards for secondary forest management: Principles, criteria and indicators, Code of practices and Procedures manual, and repeal of Decree No. 27998-MINAE of June 22, 1999."
          },
          "description": {
            "es": "Este es un trámite solicitado por una persona interesada en obtener la aprobación de un Plan de Manejo en bosque natural de sucesión secundaria, conocido como Plan de Manejo en Bosque Secundario. El cual, mediante estudios técnicos dirigidos por un profesional forestal, permitirá la corta y aprovechamiento sostenible de árboles y/o biomasa de este ecosistema.",
            "en": "This is a procedure requested by a person interested in obtaining approval of a Management Plan for a natural forest of secondary succession, known as a Secondary Forest Management Plan. Through technical studies directed by a forest professional, this will allow the sustainable felling and exploitation of trees and/or biomass from this ecosystem."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Plan%20de%20Manejo%20en%20BS.pdf"
        },
        {
          "name": {
            "es": "Solicitud de aprovechamiento y extracción de madera caída en bosques de propiedad privada para menos de 10 árboles",
            "en": "Request for exploitation and extraction of fallen timber in privately owned forests for fewer than 10 trees"
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado, persona física o jurídica, para el aprovechamiento y extracción de madera de árboles caídos, en cantidad de uno y hasta nueve árboles por predio, como consecuencia de eventos naturales: fuertes vientos, huracanes, lluvias extremas, terremotos, derrumbes y otros.",
            "en": "This is a procedure requested by an interested party, natural or legal person, for the exploitation and extraction of timber from fallen trees, in quantities of one to nine trees per property, as a consequence of natural events: strong winds, hurricanes, extreme rainfall, earthquakes, landslides and others."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Solicitud%20de%20aprov%20madera%20ca%C3%ADda%20menos%20de%2010%20%C3%A1rboles.pdf"
        },
        {
          "name": {
            "es": "Solicitud de dispositivos de control para el transporte de madera.",
            "en": "Request for control devices for timber transport."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado que, una vez ejecutado cualquier permiso de corta y/o aprovechamiento de árboles otorgado por la AFE-SINAC, requiere solicitar los dispositivos necesarios para identificar el producto forestal a extraer de la finca. Los dispositivos consisten en guías y placas.",
            "en": "This is a procedure requested by an interested party who, once any tree felling and/or exploitation permit granted by AFE-SINAC has been executed, needs to request the necessary devices to identify the forest product to be extracted from the property. The devices consist of guides and plates."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Solicitud%20de%20dispositivos%20de%20transporte%20madera.pdf"
        },
        {
          "name": {
            "es": "Corta de árboles o aprovechamiento maderable para ampliación y/o mantenimiento de las vías públicas (PE-AM).",
            "en": "Tree felling or timber exploitation for the expansion and/or maintenance of public roads (PE-AM)."
          },
          "description": {
            "es": "Esta es una modalidad de permiso que aplica solamente cuando se requiera eliminar árboles para la construcción o ampliación de las vías públicas, tanto de la red vial nacional, como municipal. Este tipo de permiso solo puede ser gestionado por Municipalidades, el MOPT u otras instituciones estatales competentes.",
            "en": "This is a type of permit that applies only when it is necessary to remove trees for the construction or expansion of public roads, both on the national and municipal road network. This type of permit can only be managed by Municipalities, the MOPT or other competent state institutions."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20PE%20elim%20de%20%C3%A1rboles%20para%20ampliaci%C3%B3n%20de%20v%C3%ADas.pdf"
        },
        {
          "name": {
            "es": "Solicitud para el aprovechamiento y extracción de madera caída en bosque propiedad privada, para diez árboles o más.",
            "en": "Request for exploitation and extraction of fallen timber in privately owned forest, for ten or more trees."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado, persona física o jurídica, para el aprovechamiento y extracción de madera de árboles caídos naturalmente dentro de bosques privados de su propiedad, en cantidad de diez árboles o más, como consecuencia de eventos naturales.",
            "en": "This is a procedure requested by an interested party, natural or legal person, for the exploitation and extraction of timber from trees that have fallen naturally within their privately owned forests, in quantities of ten or more trees, as a consequence of natural events."
          },
          "link": "https://www.sinac.go.cr/ES/traminst/Documents/Ficha%20T%C3%A9cnica%20de%20Tr%C3%A1mite%20Solicitud%20de%20aprov%20madera%20ca%C3%ADda%20m%C3%A1s%20de%2010%20%C3%A1rboles.pdf"
        }
      ]
    },
    {
      "id": "recurso-hidrico",
      "name": {
        "es": "Recurso Hídrico",
        "en": "Water Resources"
      },
      "description": {
        "es": "En esta sección encuentra los trámites relacionados con Recurso Hídrico.",
        "en": "In this section you will find procedures related to Water Resources."
      },
      "procedures": []
    },
    {
      "id": "vida-silvestre",
      "name": {
        "es": "Vida Silvestre",
        "en": "Wildlife"
      },
      "description": {
        "es": "En esta sección encuentra los trámites relacionados con Vida Silvestre.",
        "en": "In this section you will find procedures related to Wildlife."
      },
      "procedures": [
        {
          "name": {
            "es": "Autorización del manejo de uno o varios individuos de fauna silvestre o exótica declarada como silvestre por su país de origen que causen daños comprobados",
            "en": "Authorization for the management of one or more individuals of wild or exotic fauna declared as wild by its country of origin that cause proven damage"
          },
          "description": {
            "es": "Este es un trámite en el cual el SINAC podrá autorizar a un particular el manejo de uno o varios individuos de fauna silvestre o exótica declarada como silvestre por su país de origen que causen daños comprobados, de acuerdo con las medidas establecidas en el artículo 22 de la Ley de Conservación de Vida Silvestre.",
            "en": "This is a procedure in which SINAC may authorize a private individual to manage one or more individuals of wild or exotic fauna declared as wild by its country of origin that cause proven damage, in accordance with the measures established in article 22 of the Wildlife Conservation Law."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8074"
        },
        {
          "name": {
            "es": "Autorización para colecta de fauna silvestre para plantel parental",
            "en": "Authorization for collection of wild fauna for parental stock"
          },
          "description": {
            "es": "Este es un trámite realizado por interesados que requieran colecta de fauna silvestre como plantel parental para un sitio de manejo que debe tener aprobado el plan de manejo y los permisos de funcionamiento correspondientes. Los permisos de colecta de fauna silvestre de plantel parental para zoocriaderos, serán otorgados únicamente cuando se demuestre que no existen individuos en cautiverio de la especie de interés en otro sitio de manejo autorizado, que puedan ser adquiridos por el interesado.",
            "en": "This is a procedure carried out by interested parties who require collection of wild fauna as parental stock for a management site that must have an approved management plan and the corresponding operating permits. Permits for collection of wild fauna as parental stock for zoobreeding facilities will only be granted when it is demonstrated that there are no captive individuals of the species of interest in another authorized management site that can be acquired by the interested party."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8077"
        },
        {
          "name": {
            "es": "Autorización de exhibiciones móviles o itinerantes de animales silvestres disecados, sus partes, productos y subproductos",
            "en": "Authorization for mobile or itinerant exhibitions of taxidermied wild animals, their parts, products and by-products"
          },
          "description": {
            "es": "Este es un trámite realizado por interesados en realizar exhibiciones móviles o itinerantes de animales silvestres disecados, sus partes, productos y subproductos con el único objetivo de brindar educación ambiental en centros educativos del sistema educativo nacional. La colección debe estar inscrita en el Sistema Nacional de Información sobre Vida Silvestre.",
            "en": "This is a procedure carried out by parties interested in holding mobile or itinerant exhibitions of taxidermied wild animals, their parts, products and by-products with the sole objective of providing environmental education in educational centers of the national education system. The collection must be registered in the National Wildlife Information System."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8078"
        },
        {
          "name": {
            "es": "Autorización para la utilización de los productos y subproductos de la fauna sometida a eutanasia.",
            "en": "Authorization for the use of products and by-products of fauna subjected to euthanasia."
          },
          "description": {
            "es": "Este es un trámite solicitado para utilizar productos y subproductos derivados de un espécimen sometido a la eutanasia.",
            "en": "This is a procedure requested to use products and by-products derived from a specimen subjected to euthanasia."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8080"
        },
        {
          "name": {
            "es": "Autorización de aprovechamiento de flora silvestre sin fines comerciales o para la subsistencia.",
            "en": "Authorization for exploitation of wild flora for non-commercial purposes or for subsistence."
          },
          "description": {
            "es": "Este es un trámite solicitado por una persona interesada en la extracción o colecta de flora silvestre sin fines comerciales o para la subsistencia, cuando sea para satisfacer necesidades alimenticias, medicinales y otras similares de personas de escasos recursos económicos. En este trámite primero se obtiene un permiso u autorización y luego debe de obtenerse la licencia de colecta.",
            "en": "This is a procedure requested by a person interested in the extraction or collection of wild flora for non-commercial purposes or for subsistence, when it is to satisfy food, medicinal and other similar needs of people with limited economic resources. In this procedure, a permit or authorization is first obtained and then a collection license must be obtained."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8084"
        },
        {
          "name": {
            "es": "Autorización de aprovechamiento de flora silvestre en planes de manejo forestales.",
            "en": "Authorization for exploitation of wild flora in forest management plans."
          },
          "description": {
            "es": "Este es un trámite solicitado por una persona interesada en la extracción o colecta (aprovechamiento) de flora silvestre, sus productos y subproductos en áreas que cuenten con permisos de aprovechamiento forestal. El uso de las plantas vivas podrá autorizarse exclusivamente como plantel parental o para la reproducción en sitios de manejo de flora silvestre debidamente inscritos. En ningún caso se autorizará la comercialización de estos especímenes.",
            "en": "This is a procedure requested by a person interested in the extraction or collection (exploitation) of wild flora, its products and by-products in areas that have forestry exploitation permits. The use of live plants may be authorized exclusively as parental stock or for reproduction in duly registered wild flora management sites. Under no circumstances will the commercialization of these specimens be authorized."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8088"
        },
        {
          "name": {
            "es": "Autorización inscripción de tenencia de flora silvestre en peligro de extinción bajo modalidad de colección",
            "en": "Authorization for registration of possession of endangered wild flora under the collection modality"
          },
          "description": {
            "es": "Este es un trámite que se autorizará a particulares que deseen tener bajo su cuidado plantas silvestres con fines estéticos y recreativos para su disfrute personal. La autorización e inscripción de los especímenes se realizará bajo la modalidad de colección. Las plantas no pueden ser comercializadas o exhibidas públicamente. La adquisición de las mismas debe hacerse de manera legal.",
            "en": "This is a procedure that will be authorized to individuals who wish to have wild plants in their care for aesthetic and recreational purposes for their personal enjoyment. The authorization and registration of the specimens will be carried out under the collection modality. The plants cannot be commercialized or publicly exhibited. Their acquisition must be done legally."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8089"
        },
        {
          "name": {
            "es": "Renovación Autorización inscripción de tenencia de flora silvestre en peligro de extinción bajo modalidad de colección",
            "en": "Renewal of Authorization for registration of possession of endangered wild flora under the collection modality"
          },
          "description": {
            "es": "Este es un trámite que se autorizará a particulares que deseen renovar la inscripción de tenencia de flora silvestre en peligro de extinción bajo la modalidad de colección. Las plantas no pueden ser comercializadas o exhibidas públicamente. La adquisición de las mismas debe hacerse de manera legal.",
            "en": "This is a procedure that will be authorized to individuals who wish to renew the registration of possession of endangered wild flora under the collection modality. The plants cannot be commercialized or publicly exhibited. Their acquisition must be done legally."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8092"
        },
        {
          "name": {
            "es": "Registro de inscripción para taxidermia y procesamiento de vida silvestre",
            "en": "Registration for taxidermy and wildlife processing"
          },
          "description": {
            "es": "Es el trámite que deben gestionar las personas físicas, jurídicas, públicas o privadas, que se dedican a la taxidermia o procesamiento de vida silvestre, productos o subproductos.",
            "en": "This is the procedure that must be managed by natural or legal persons, public or private, who are dedicated to taxidermy or processing of wildlife, products or by-products."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8048"
        },
        {
          "name": {
            "es": "Designación de centros de rescate oficiales para la atención de animales silvestres decomisados o rescatados por el SINAC u otros entes Estatales.",
            "en": "Designation of official rescue centers for the care of wild animals seized or rescued by SINAC or other State entities."
          },
          "description": {
            "es": "Es el trámite será solicitado por centros de rescate que quieran ser designados como sitios de manejo oficiales para trabajar en coordinación con el Estado en la conservación y manejo de la fauna silvestre. Estos sitios deberán desarrollar buenas prácticas y aplicar estándares internacionales en sus procesos.",
            "en": "This is the procedure that will be requested by rescue centers that want to be designated as official management sites to work in coordination with the State in the conservation and management of wild fauna. These sites must develop good practices and apply international standards in their processes."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8131"
        },
        {
          "name": {
            "es": "Autorización de otros tipos de transporte de flora silvestre.",
            "en": "Authorization for other types of wild flora transport."
          },
          "description": {
            "es": "Este es un trámite solicitado por un interesado que requiera transportar flora silvestre declarada en peligro de extinción por las listas nacionales o por convenciones internacionales, sus productos y subproductos. Se exceptúa el transporte en caso de proyectos de investigación cuando la resolución indique la autorización expresa de estos especímenes.",
            "en": "This is a procedure requested by an interested party who requires transporting wild flora declared endangered by national lists or by international conventions, its products and by-products. Transport is excluded in the case of research projects when the resolution expressly indicates authorization of these specimens."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8138"
        },
        {
          "name": {
            "es": "Autorización de permiso de funcionamiento de viveros sin fines comerciales y viveros artesanales comerciales",
            "en": "Authorization for operating permit for non-commercial nurseries and commercial artisanal nurseries"
          },
          "description": {
            "es": "Esta solicitud la tramitan personas físicas o jurídicas que quieran solicitar la inscripción y permiso de funcionamiento de viveros sin fines comerciales y viveros artesanales comerciales. Los viveros sin fines comerciales son aquellos podrán estar autorizados para la exhibición de plantas en ferias, exposiciones u otros eventos debidamente autorizados, pero no estarán autorizados para la comercialización de plantas. Los viveros artesanales comerciales pueden estar autorizados para la comercialización dentro del territorio nacional y deberán mantener no más de quinientas plantas silvestres.",
            "en": "This application is processed by natural or legal persons who wish to request the registration and operating permit for non-commercial nurseries and commercial artisanal nurseries. Non-commercial nurseries may be authorized for the exhibition of plants at fairs, exhibitions or other duly authorized events, but will not be authorized for the commercialization of plants. Commercial artisanal nurseries may be authorized for commercialization within the national territory and must maintain no more than five hundred wild plants."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8049"
        },
        {
          "name": {
            "es": "Traslado de custodia de fauna silvestre entre sitios de manejo",
            "en": "Transfer of custody of wild fauna between management sites"
          },
          "description": {
            "es": "Este trámite puede ser solicitado por el regente de un sitio de manejo en caso de traslado de animales silvestres de un sitio de manejo a otro",
            "en": "This procedure may be requested by the manager of a management site in case of transfer of wild animals from one management site to another."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8050"
        },
        {
          "name": {
            "es": "Autorización transporte de fauna silvestre, sus productos y sub-productos",
            "en": "Authorization for transport of wild fauna, its products and by-products"
          },
          "description": {
            "es": "Este trámite puede ser solicitado por el regente de un sitio de manejo en caso de requerir el transporte a nivel nacional de fauna silvestre, productos y subproductos",
            "en": "This procedure may be requested by the manager of a management site in case of requiring national transport of wild fauna, products and by-products."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8057"
        },
        {
          "name": {
            "es": "Autorización de uso de animales silvestres en actividades audiovisuales.",
            "en": "Authorization for use of wild animals in audiovisual activities."
          },
          "description": {
            "es": "La solicitud de uso de animales en actividades audiovisuales (campañas publicitarias, documentales, reportajes, rodajes, filmaciones y otros similares) fuera de sitios de manejo, puede ser solicitada por personas físicas y jurídicas ante el Área de Conservación respectiva. Queda exento del procedimiento establecido en este trámite el material audiovisual realizado por aficionados que pretendan únicamente la preservación de un recuerdo y que por ello no persigue fines comerciales o de lucro, aunque sí deberán respetar la fauna silvestre, sus necesidades y comportamientos naturales, la normativa vigente y no deberán incurrir en comportamientos de mascotización.",
            "en": "The request for use of animals in audiovisual activities (advertising campaigns, documentaries, reports, shoots, filming and other similar activities) outside management sites may be requested by natural and legal persons from the respective Conservation Area. Exempt from the procedure established in this procedure is audiovisual material made by amateurs who intend solely to preserve a memory and therefore do not pursue commercial or profit-making purposes, although they must respect wild fauna, its needs and natural behaviors, current regulations, and must not engage in domestication behaviors."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8147"
        },
        {
          "name": {
            "es": "Permiso para la venta de fauna reproducida en zoocriadero con fines comerciales",
            "en": "Permit for the sale of fauna bred in a zoo-breeding facility for commercial purposes"
          },
          "description": {
            "es": "Este permiso puede ser solicitado por zoocriaderos comerciales autorizados para la reproducción y venta de fauna silvestre para otros sitios de manejo como plantel parental, exhibición en zoológicos, exportación para el mercado internacional y para la venta de productos y subproductos. Bajo ninguna circunstancia se autorizará la venta de fauna silvestre viva para ser utilizados como mascotas dentro del territorio nacional",
            "en": "This permit may be requested by authorized commercial zoo-breeding facilities for the reproduction and sale of wild fauna to other management sites as parental stock, exhibition in zoos, export to the international market and for the sale of products and by-products. Under no circumstances will the sale of live wild fauna to be used as pets within the national territory be authorized."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8060"
        },
        {
          "name": {
            "es": "Autorización transporte de flora silvestre entre sitios de manejo",
            "en": "Authorization for transport of wild flora between management sites"
          },
          "description": {
            "es": "Este es un trámite en caso de que un regente de un sitio de manejo requiera trasladar flora silvestre, productos o subproductos de un sitio de manejo a otro, cuando el transporte autorizado mediante la resolución de funcionamiento requiera ajustes o se requiera transportar especímenes a nuevos sitios de manejo.",
            "en": "This is a procedure in case a manager of a management site needs to transfer wild flora, products or by-products from one management site to another, when the transport authorized by the operating resolution requires adjustments or when specimens need to be transported to new management sites."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8066"
        },
        {
          "name": {
            "es": "Renovación de la licencia o nueva licencia para continuar con el aprovechamiento de flora silvestre con fines comerciales o como plantel parental para sitios de manejo de flora",
            "en": "Renewal or new license to continue with the exploitation of wild flora for commercial purposes or as parental stock for flora management sites"
          },
          "description": {
            "es": "La renovación de la licencia es el trámite que se da en caso de que el permisionario desee continuar con el aprovechamiento de flora silvestre con fines comerciales o como plantel parental de un sitio de manejo de flora. El trámite de nueva licencia es en el caso de que el Área de Conservación determine que se necesita presentar un nuevo estudio técnico según lo establecido en los artículo 131, 132 y 133 del reglamento de la Ley de Conservación de Vida Silvestre.",
            "en": "The license renewal is the procedure that occurs when the permit holder wishes to continue with the exploitation of wild flora for commercial purposes or as parental stock of a flora management site. The new license procedure is for when the Conservation Area determines that a new technical study needs to be presented as established in articles 131, 132 and 133 of the Wildlife Conservation Law regulations."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8068"
        },
        {
          "name": {
            "es": "Inscripción en el libro de regentes",
            "en": "Registration in the regent book"
          },
          "description": {
            "es": "Este es un trámite realizado por los regentes en manejo de vida silvestre que requieran regentar sitios de manejo en las diferentes categorías que establece la ley.",
            "en": "This is a procedure carried out by wildlife management regents who need to manage management sites in the different categories established by law."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8071"
        },
        {
          "name": {
            "es": "Renovación de la inscripción en el libro de regentes",
            "en": "Renewal of registration in the regent book"
          },
          "description": {
            "es": "Este es un trámite realizado por los regentes en manejo de vida silvestre que requieren renovar su inscripción para regentar sitios de manejo en las diferentes categorías que establece la ley.",
            "en": "This is a procedure carried out by wildlife management regents who need to renew their registration to manage management sites in the different categories established by law."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8072"
        },
        {
          "name": {
            "es": "Autorización de exhibiciones temporales flora silvestre en peligro de extinción",
            "en": "Authorization for temporary exhibitions of endangered wild flora"
          },
          "description": {
            "es": "Es un trámite que realiza un usuario que desee realizar exhibiciones temporales de flora silvestre en peligro de extinción proveniente de sitios de manejo autorizados.",
            "en": "This is a procedure carried out by a user who wishes to hold temporary exhibitions of endangered wild flora from authorized management sites."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8127"
        },
        {
          "name": {
            "es": "Autorización de aprovechamiento de flora silvestre con fines comerciales o como plantel parental para sitios de manejo de flora",
            "en": "Authorization for exploitation of wild flora for commercial purposes or as parental stock for flora management sites"
          },
          "description": {
            "es": "Este es un trámite solicitado por usuarios que requieran aprovechar flora silvestre con fines comerciales o como plantel parental para sitio de manejo de flora.",
            "en": "This is a procedure requested by users who need to exploit wild flora for commercial purposes or as parental stock for a flora management site."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8082"
        },
        {
          "name": {
            "es": "Reposición de Licencias de cacería de control",
            "en": "Replacement of control hunting licenses"
          },
          "description": {
            "es": "Este es un trámite que debe realizar el interesado en caso de pérdida de su licencia de control.",
            "en": "This is a procedure that the interested party must carry out in case of loss of their control license."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8103"
        },
        {
          "name": {
            "es": "Autorización de cacería de subsistencia",
            "en": "Authorization for subsistence hunting"
          },
          "description": {
            "es": "Este es un trámite que podrá ser solicitado por un usuario que requiera realizar cacería para consumo y satisfacción de necesidades alimenticias personales o familiares, cuando la condición socioeconómica no le permita tener acceso a otras fuentes de proteína. No se podrá autorizar la cacería de subsistencia de fauna silvestre con poblaciones reducidas, amenazadas o en peligro de extinción. La caza de subsistencia no será permitida en áreas silvestres protegidas.",
            "en": "This is a procedure that may be requested by a user who needs to hunt for consumption and satisfaction of personal or family food needs, when the socioeconomic condition does not allow access to other sources of protein. Subsistence hunting of wild fauna with reduced, threatened or endangered populations cannot be authorized. Subsistence hunting will not be permitted in protected wild areas."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8110"
        },
        {
          "name": {
            "es": "Autorización permisos de tránsito de especímenes silvestres de especies incluidas en apéndices CITES.",
            "en": "Authorization of transit permits for wild specimens of species included in CITES appendices."
          },
          "description": {
            "es": "Es el trámite solicitado por un usuario que requiera movilizar (transitar) un espécimen silvestre incluido en apéndice CITES por el territorio nacional.",
            "en": "This is the procedure requested by a user who needs to move (transit) a wild specimen included in a CITES appendix through the national territory."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8115"
        },
        {
          "name": {
            "es": "Inscripción de cazadores en el registro de caza de control.",
            "en": "Registration of hunters in the control hunting registry."
          },
          "description": {
            "es": "Este es un trámite realizado por interesados en inscribirse como cazadores en el registro de caza de control.",
            "en": "This is a procedure carried out by parties interested in registering as hunters in the control hunting registry."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8129"
        },
        {
          "name": {
            "es": "Permiso de exportación de especímenes de vida silvestre incluida en los apéndices de CITES",
            "en": "Export permit for wild specimens of wildlife included in CITES appendices"
          },
          "description": {
            "es": "Es el permiso que se le da a una empresa o un particular para poder sacar del país especímenes, partes, productos o subproductos de flora o fauna silvestre incluida en los apéndices de CITES, con excepción de las especies de interés pesquero incluidas en esos apéndices.",
            "en": "This is the permit given to a company or individual to export specimens, parts, products or by-products of wild flora or fauna included in CITES appendices from the country, with the exception of species of fishing interest included in those appendices."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8997"
        },
        {
          "name": {
            "es": "Autorización y emisión de licencia de pesca deportiva",
            "en": "Authorization and issuance of sport fishing license"
          },
          "description": {
            "es": "Este es un trámite que podrá ser solicitado por un interesado en realizar pesca deportiva continental",
            "en": "This is a procedure that may be requested by a person interested in engaging in continental sport fishing."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8145"
        },
        {
          "name": {
            "es": "Autorización y emisión de licencia de pesca de subsistencia",
            "en": "Authorization and issuance of subsistence fishing license"
          },
          "description": {
            "es": "Este es un trámite que podrá ser solicitado por personas de escasos recursos económicos que requieran llenar necesidades alimenticias o medicinales, mediante la pesca de subsistencia.",
            "en": "This is a procedure that may be requested by people with limited economic resources who need to meet food or medicinal needs through subsistence fishing."
          },
          "link": "https://tramitescr.meic.go.cr/tramite/8146"
        }
      ]
    }
  ]
};
