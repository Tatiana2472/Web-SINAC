import { acgMapBase64 } from './acgMapImage';

export type ConservationAreaData = {
  slug: string;
  abbr: string;
  name: { es: string; en: string };
  description: { es: string; en: string };
  headquarters: { es: string; en: string } | string;
  address?: { es: string; en: string } | string;
  phone?: string;
  email?: string;
  mapUrl: string;
  image: string;
  heroImage: string;
  stats: {
    hectares: string;
    parks: number;
    visitors: string;
  };
  ecosystems: { es: string[]; en: string[] };
  biodiversity: { es: string[]; en: string[] };
  note?: { es: string; en: string };
};

export const CONSERVATION_AREAS_DATA: ConservationAreaData[] = [
  {
    slug: 'acahn',
    abbr: 'ACAHN',
    name: {
      es: 'Área de Conservación Arenal Huetar Norte',
      en: 'Arenal Huetar Norte Conservation Area',
    },
    description: {
      es: 'Se encuentra en la parte norte del país y se extiende desde el Río Las Haciendas en Upala hasta el Río Sarapiqui en la Virgen de Sarapiquí (Zona inalienable Refugio Nacional de Vida Silvestre Corredor Fronterizo). Limita al norte con Nicaragua. En la parte oeste colinda con la Cordillera del Guanacaste y al este con el río Sarapiquí y con el río Toro Amarillo. Al sur colinda con el cantón de Naranjo.\n\nEl ACAHN protege y conserva recursos sobresalientes como: el bosque húmedo, el pluvial montano; los ecosistemas para la investigación biológica, los humedales (que son refugio, alimentación y reproducción de especies silvestres), los recursos hídricos, de gran importancia para la Zona Norte en la producción de energía hidroeléctrica y de consumo humano, los rasgos geomorfológicos como: focos volcánicos activos e inactivos, etc; además, en las áreas silvestres protegidas habita la lapa verde.',
      en: 'The Arenal Huetar Norte Conservation Area covers an extensive region in northern Costa Rica, characterized by its extraordinary biological diversity and volcanic landscapes. It houses the iconic Arenal Volcano and vast plains connecting mountain ecosystems with tropical lowlands. It is a vital zone for water resource conservation and geothermal energy production.',
    },
    headquarters: 'Ciudad Quesada, San Carlos, Alajuela',
    address: '150 norte y 200 este del Hospital de San Carlos, Ciudad Quesada, San Carlos, Alajuela',
    phone: '(506) 2460-0055 / 2460-1412',
    email: 'acahn.info@sinac.go.cr',
    mapUrl: 'https://www.google.com/maps/search/150+norte+200+este+Hospital+San+Carlos+Ciudad+Quesada+Alajuela+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc4MTA3NjY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '504,094', parks: 8, visitors: '380K' },
    ecosystems: {
      es: ['Bosque tropical húmedo', 'Bosque nuboso', 'Humedales', 'Ecosistemas volcánicos'],
      en: ['Tropical rainforest', 'Cloud forest', 'Wetlands', 'Volcanic ecosystems'],
    },
    biodiversity: {
      es: ['Quetzal resplandeciente', 'Jaguar', 'Rana de ojos rojos', 'Tucán pico arcoíris'],
      en: ['Resplendent quetzal', 'Jaguar', 'Red-eyed tree frog', 'Keel-billed toucan'],
    },
  },
  {
    slug: 'acat',
    abbr: 'ACAT',
    name: {
      es: 'Área de Conservación Arenal Tempisque',
      en: 'Arenal Tempisque Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Arenal Tempisque (ACAT) es una de las 11 áreas que conforman el Sistema Nacional de Áreas de Conservación (SINAC) bajo la dirección del Ministerio del Ambiente y Energía. Esta área fue constituida en octubre de 1991; abarca aproximadamente 395.046.14 hectáreas; que equivale el 7.73% del territorio nacional.\n\nEstá ubicada en la parte norte-central de Costa Rica entre las latitudes 10° 00” y 10° 50” norte y longitud 84° 30” y 85° 30” oeste, comprende parte de la Cordillera Volcánica de Guanacaste y de la Cordillera de Tilarán. Se destacan en esta región los volcanes Miravalles y Tenorio, así como también el Embalse Arenal, principal fuente energética y de riego del país y de desarrollo turístico de la zona, éste incluye un lago de agua dulce de unas 8,317 hectáreas, el cual fue declarado Sitio Ramsar el 16 de marzo del año 2000.\n\nOtro sitio Ramsar presente en el ACAT, se encuentra en el Parque Nacional Palo Verde, ubicado en la cuenca baja del Río Tempisque considerada una zona de vital importancia como sitio de reproducción y alimentación para una gran cantidad de especies de aves acuáticas, migratorias y residentes, como también de especies en peligro de extinción, constituyéndose en una de las zonas de anidamiento más grandes del país.\n\nPolíticamente abarca parte de 10 cantones y 32 distritos de las provincias de Guanacaste, Alajuela y Puntarenas; de toda la extensión territorial del Área; actualmente el 24.84 % lo constituyen las áreas silvestres protegidas, 28.81 % a corredores biológicos y el porcentaje restante corresponde al área de influencia.\n\nMás del 70% de la energía hidroeléctrica del país se genera en esta Área de Conservación, que además cuenta con más del 90% de producción de energía eólica y geotérmica.\n\nEn ésta Área de Conservación están presentes una alta diversidad de ambientes, ecosistemas y especies, distribuidos en ocho zonas de vida diferentes que van del bosque tropical seco al bosque pluvial montano bajo, con igual número de zonas en transición ecológica. Por el variado relieve altitudinal (del nivel del mar hasta los 2028 metros de altitud), se da un variado régimen climático y presencia de formaciones geológicas de diferentes edades.\n\nSu flora y fauna es muy variada con numerosas especies de aves, mamíferos, anfibios, reptiles y una gran cantidad de grupos taxonómicos de insectos y hongos, además ésta Área de Conservación tiene animales en peligro de extinción como el jaguar (Panthera onca) y la danta (Tapirus bairdii), entre otros, estando presentes las 6 especies de felinos silvestres del país.\n\nAdemás se han identificado alrededor de 190 plantas que están presentes en el Área de Conservación que son endémicas de Costa Rica, algunas de ellas endémicas del Área. Solo en Monteverde están representadas 70 de las 103 familias de árboles reportadas para el país y el 21.23% de las especies de orquídeas.',
      en: 'The Arenal Tempisque Conservation Area connects two vital ecological regions of Costa Rica: the volcanic highlands of Arenal and the Tempisque River basins. This transition zone harbors a great diversity of habitats, from cloud forests to seasonal dry zones, being crucial for the country\'s ecological connectivity.',
    },
    headquarters: 'Tilarán, Guanacaste',
    address: 'De las instalaciones de la Fuerza Pública 275 metros al Sur, contiguo a la Estación de Bomberos, Tilarán, Guanacaste',
    phone: '(506) 2695-5180',
    mapUrl: 'https://www.google.com/maps/search/Fuerza+Publica+Tilaran+Guanacaste+Costa+Rica+SINAC+ACAT',
    image: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MTA3NjY3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '239,260', parks: 6, visitors: '290K' },
    ecosystems: {
      es: ['Bosque de transición', 'Bosque seco tropical', 'Humedales lacustres', 'Bosque nuboso'],
      en: ['Transition forest', 'Tropical dry forest', 'Lacustrine wetlands', 'Cloud forest'],
    },
    biodiversity: {
      es: ['Mono aullador', 'Pizote', 'Oropéndola de Montezuma', 'Perezoso de tres dedos'],
      en: ['Howler monkey', 'Coati', 'Montezuma oropendola', 'Three-toed sloth'],
    },
  },
  {
    slug: 'acg',
    abbr: 'ACG',
    name: {
      es: 'Área de Conservación Guanacaste',
      en: 'Guanacaste Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Guanacaste, se encuentra ubicada al noroeste de Costa Rica, en la provincia de Guanacaste. Está compuesta por Los Parques Nacionales: Santa Rosa, Guanacaste y Rincón de la Vieja; además de la Estación Experimental Forestal Horizontes y el Refugio de Vida Silvestre Bahía Junquillal.\n\nSomos, una de las once Áreas de Conservación que conforman el Sistema Nacional de Áreas de Conservación (SINAC), del Ministerio de Ambiente y Energía (MINAE) del Gobierno de Costa Rica.\n\nAplicamos las políticas de conservación emitidas por el Consejo Nacional de Áreas de Conservación y el Consejo Regional del ACG, llevando a cabo acciones en el manejo y conservación de áreas silvestres protegidas y el agropaisaje (territorios circundantes al área silvestre protegida).\n\nEn el ACG integramos, un bloque continuo de ecosistemas marino-costero, bosque tropical seco, bosque tropical lluvioso y bosque tropical nuboso, en donde se estima que existen aproximadamente 235,000 especies (65% del estimado de las especies en Costa Rica) y un 2.6 % de la biodiversidad mundial.\n\nEl accionar de ACG se basa en la filosofía que llamamos Biodesarrollo. Consideramos el Biodesarrollo como la suma de una serie de acciones y proyectos realizados a través de los Programas del ACG orientados ha demostrar ante la sociedad local, nacional e internacional, que la biodiversidad y ecosistemas son un importante sector productivo de bienes y servicios, que pueden ser aprovechados sin causarles daño, de tal forma que la sociedad integre y valore el área protegida y se perpetúe su conservación. La integración de la sociedad y el área protegida a través del empleo local, la bioalfabetización escolar, los asistentes de investigación y paratáxonomos, las brigadas locales de control de incendios, biosensibilización marina, proyectos de restauración de bosques, servicios ambientales, usos de la tecnología, son algunos ejemplos de como el ACG promueve el Biodesarrollo. El ACG se visualiza a si misma como una "empresa de conservación" donde especialmente a través de sus programas y proyectos la sociedad entiende, aprecia y valora aún más la importancia del área protegida y su conservación.\n\nEn Materia de Manejo de Recursos en las zonas circundantes a las ASP La Gerencia de Manejo de Recursos Naturales es la encargada por administrar, regular y controlar lo relacionado con vida silvestre, aprovechamiento y uso de recursos forestales, y recursos hídricos y cuencas hidrográficas, así como el control y protección en el área del agropasisaje del Área de Conservación de Guanacaste.\n\nBuscamos desarrollar la experiencia, el recurso humano y los recursos económicos necesarios, para cumplir con los objetivos de manejo de los recursos naturales correspondiente a nuestra área de acción.',
      en: 'The Guanacaste Conservation Area is a UNESCO World Heritage Site declared in 1999. It protects one of the last significant remnants of Mesoamerican tropical dry forest and harbors a complete ecological transition from marine ecosystems to highland cloud forests. It is a global benchmark for ecological restoration.',
    },
    headquarters: 'Liberia, Guanacaste',
    address: 'Sub-región Liberia, Guanacaste',
    phone: '(506) 2666-0630',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+Guanacaste+Liberia+Costa+Rica',
    image: acgMapBase64,
    heroImage: acgMapBase64,
    stats: { hectares: '147,000', parks: 12, visitors: '450K' },
    ecosystems: {
      es: ['Bosque seco tropical', 'Bosque nuboso', 'Ecosistemas marinos', 'Manglares'],
      en: ['Tropical dry forest', 'Cloud forest', 'Marine ecosystems', 'Mangroves'],
    },
    biodiversity: {
      es: ['Jaguar', 'Puma', 'Tortuga baula', 'Guacamaya roja'],
      en: ['Jaguar', 'Puma', 'Leatherback sea turtle', 'Scarlet macaw'],
    },
    note: {
      es: 'Patrimonio Natural de la Humanidad UNESCO (1999)',
      en: 'UNESCO World Heritage Site (1999)',
    },
  },
  {
    slug: 'act',
    abbr: 'ACT',
    name: {
      es: 'Área de Conservación Tempisque',
      en: 'Tempisque Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Tempisque protege importantes humedales y manglares que son vitales para la vida marina y las aves migratorias. Abarca la cuenca baja del río Tempisque y la península de Nicoya, incluyendo ecosistemas costeros de gran valor ecológico y refugios de vida silvestre fundamentales para la conservación de especies en peligro.',
      en: 'The Tempisque Conservation Area protects important wetlands and mangroves vital for marine life and migratory birds. It encompasses the lower Tempisque River basin and the Nicoya Peninsula, including coastal ecosystems of great ecological value and wildlife refuges essential for the conservation of endangered species.',
    },
    headquarters: 'Nicoya, Guanacaste',
    address: 'Oficina Regional, Nicoya, Guanacaste',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+Tempisque+Nicoya+Guanacaste+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1536709017021-ce8f99c17e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxDb3N0YSUyMFJpY2ElMjBjb25zZXJ2YXRpb24lMjBwcm90ZWN0ZWQlMjBhcmVhcyUyMG5hdHVyZXxlbnwxfHx8fDE3ODA1NDI4NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1536709017021-ce8f99c17e38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '215,000', parks: 15, visitors: '320K' },
    ecosystems: {
      es: ['Humedales', 'Manglares', 'Bosque seco tropical', 'Ecosistemas costeros'],
      en: ['Wetlands', 'Mangroves', 'Tropical dry forest', 'Coastal ecosystems'],
    },
    biodiversity: {
      es: ['Cocodrilo americano', 'Garza rosada', 'Mono carablanca', 'Iguana verde'],
      en: ['American crocodile', 'Roseate spoonbill', 'White-faced capuchin', 'Green iguana'],
    },
  },
  {
    slug: 'aclac',
    abbr: 'ACLAC',
    name: {
      es: 'Área de Conservación La Amistad Caribe',
      en: 'La Amistad Caribe Conservation Area',
    },
    description: {
      es: 'El Área de Conservación La Amistad Caribe es una Unidad Territorial Administrativamente delimitada del Sistema Nacional de Áreas de Conservación del Ministerio de Ambiente, Energía y Telecomunicaciones (MINAET), que comprende los territorios de los cantones de Siquirres, Matina, Limón y Talamanca, abarcando la mayor parte de la Cordillera de Talamanca, de la provincia de Limón y una parte del cantón de Turrialba de la provincia de Cartago. Su creación por Decreto Ejecutivo del 17 de marzo de 1994, además responde a lo establecido en la Ley de Biodiversidad de Costa Rica, número 7788, y es una de las once Áreas de Conservación en que se divide el territorio nacional.\n\nEn esta Área de Conservación se tiene la visión de que la biodiversidad se conserva, maneja y utiliza en forma sostenible, propiciando la descentralizacíon de competencias hacia las organizaciones de la sociedad civil, garantizando el acceso y uso equitativo de los recursos naturales por la población local. Sobre esta base se han consolidado estructuras de participación ciudadana como nuevos modelos de gestión ambiental; CORAC y los Consejos Locales, que nos orientan a definir un esquema administrativo en función de las condiciones naturales y características propias del recurso, y no como tradicionalmente se hace utilizando únicamente criterios de conveniencia de la administración.\n\nLa extensión del ACLAC es de 620.967,72 hectáreas terrestres, lo que corresponde a un 12% del territorio nacional, con 26.386 hectáreas marinas, con una población de aproximadamente 350.000 habitantes. La totalidad del territorio, cerca de 247.016 hectáreas que incluye el área marina del Área de Conservación y aproximadamente 208.000 hectáreas, corresponden a 8 Territorios Indígenas, de los cuales se encuentran los Bribrí y Cabécares para un total de 33 % del territorio del Área de Conservación.\n\nEl 72% del territorio del Área de Conservación Amistad Caribe, se encuentra bajo cobertura boscosa, lo que la convierte en el Área de Conservación con el mejor índice de integridad ecológica.\n\nCosta Rica ha sido reconocida a nivel mundial por su empeño en proteger la biodiversidad y varios sitios han sido distinguidos por su incalculable valor para la humanidad, y por consiguiente, algunas regiones han sido catalogadas como Reservas de la Biosfera, Sitios de Patrimonio Mundial Natural y como sitios RAMSAR. En el caso del Área de Conservación Amistad Caribe, se cuenta con: Reserva de la Biosfera, la Reserva de la Biosfera La Amistad, el Parque Internacional La Amistad, la cual ostenta la denominación de Sitio de Patrimonio Mundial Natural de nombre cordillera de Talamanca – La Amistad y el Refugio Nacional de Vida Silverstre Gandoca – Manzanillo en la clasificación de Humedal de Importancia Internacional (Sitio RAMSAR). Esta Área Silvestre protegida es la única fronteriza que colinda casualmente con el Sitio RAMSAR Refugio San San Pond Sac de la República de Panamá.',
      en: 'The La Amistad Caribe Conservation Area protects the Caribbean slope of the Talamanca Mountain Range, one of the most biodiverse regions on the continent. It includes part of La Amistad International Park, shared with Panama, and ecosystems ranging from sea level to high-mountain páramos. It is home to numerous indigenous communities.',
    },
    headquarters: 'Guápiles / Limón',
    address: 'Oficina Regional, zona del Caribe costarricense',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+Caribe+Guapiles+Limon+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc4MTA3NjY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '620,000', parks: 10, visitors: '180K' },
    ecosystems: {
      es: ['Bosque tropical húmedo', 'Páramo', 'Arrecifes de coral', 'Bosque nuboso'],
      en: ['Tropical rainforest', 'Páramo', 'Coral reefs', 'Cloud forest'],
    },
    biodiversity: {
      es: ['Tapir de Baird', 'Águila harpía', 'Danta', 'Quetzal resplandeciente'],
      en: ['Baird\'s tapir', 'Harpy eagle', 'Tapir', 'Resplendent quetzal'],
    },
  },
  {
    slug: 'acc',
    abbr: 'ACC',
    name: {
      es: 'Área de Conservación Central',
      en: 'Central Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Central (ACC) es una de las 11 regiones en que está organizado el Sistema Nacional de Áreas de Conservación (SINAC), para atender las competencias en materia de: Áreas silvestres protegidas, gestión forestal, vida silvestre, protección de sistemas hídricos y cuencas hidrográficas. Abarca 31 áreas silvestres protegidas en diferentes categorías de manejo y presenta diversidad de ecosistemas. En su territorio se encuentran fuentes importantes para la conservación del recurso hídrico, además de la presencia de 9 corredores biológicos formalmente establecidos: Paso de las Nubes, Paso de las Lapas, Los Santos, Volcánica Central-Talamanca, Cobri Surac, Montes del Aguacate, Garcimuñoz, así como los Interurbanos María Aguilar y Pará.\n\nEstá conformada por una Sede Regional y veinte unidades funcionales con personal destacado; diez son oficinas subregionales (Alajuela, San Ramón, Grecia, Cartago, Turrialba, Los Santos, Puriscal, Heredia, San José y La Esperanza) y diez son áreas silvestres protegidas.\n\nPor su ubicación en la parte central del país, abarca aproximadamente el 54% de la población, con una superficie de 860.800 ha equivalente al 16,84% del área terrestre del país, del cual el 33,9% corresponde a áreas silvestres protegidas.\n\nDentro del territorio del ACC se incluye la totalidad de la Reserva de Biosfera Cordillera Volcánica Central (declarada en 1988) y parcialmente las Reservas de Biosfera La Amistad (1982), Agua y Paz (2007) y Savegre (2017); cuya designación es otorgada por el Programa Internacional Hombre y la Biosfera de la Organización de las Naciones Unidades para la Educación, la Ciencia y la Cultura (UNESCO).',
      en: 'The Central Conservation Area encompasses the Central Valley and Central Volcanic Mountain Range of Costa Rica. It includes important volcanoes such as Irazú, Turrialba, Barva, and Poás. Despite being surrounded by the country\'s largest population concentration, it protects vital ecosystems providing essential environmental services like drinking water and climate regulation.',
    },
    headquarters: 'San Miguel de Santo Domingo, Heredia',
    address: 'Del segundo cruce de San Miguel de Santo Domingo de Heredia 450 metros al noreste, sobre la carretera Braulio Carrillo',
    phone: '(506) 2268-8091 / 2268-8087',
    email: 'acc.info@sinac.go.cr',
    mapUrl: 'https://www.google.com/maps/search/San+Miguel+Santo+Domingo+Heredia+carretera+Braulio+Carrillo+SINAC+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MTA3NjY3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '238,000', parks: 9, visitors: '520K' },
    ecosystems: {
      es: ['Bosque nuboso', 'Ecosistemas volcánicos', 'Bosque premontano', 'Páramo'],
      en: ['Cloud forest', 'Volcanic ecosystems', 'Premontane forest', 'Páramo'],
    },
    biodiversity: {
      es: ['Quetzal resplandeciente', 'Puma', 'Colibrí montañés', 'Roble encino'],
      en: ['Resplendent quetzal', 'Puma', 'Mountain hummingbird', 'Encino oak'],
    },
  },
  {
    slug: 'acto',
    abbr: 'ACTo',
    name: {
      es: 'Área de Conservación Tortuguero',
      en: 'Tortuguero Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Tortuguero es mundialmente reconocida por ser uno de los sitios de anidación más importantes para la tortuga verde del Caribe. Sus extensos canales, lagunas y bosques inundados forman un ecosistema acuático único. El Parque Nacional Tortuguero es uno de los destinos ecoturísticos más visitados del país.',
      en: 'The Tortuguero Conservation Area is world-renowned as one of the most important nesting sites for the Caribbean green sea turtle. Its extensive canals, lagoons, and flooded forests form a unique aquatic ecosystem. Tortuguero National Park is one of the country\'s most visited ecotourism destinations.',
    },
    headquarters: 'Tortuguero, Limón',
    address: 'Oficina Regional, Tortuguero, Limón',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+Tortuguero+Tortuguero+Limon+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc4MTA3NjY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '310,000', parks: 7, visitors: '410K' },
    ecosystems: {
      es: ['Bosque tropical húmedo', 'Canales y lagunas', 'Playas de anidación', 'Humedales'],
      en: ['Tropical rainforest', 'Canals and lagoons', 'Nesting beaches', 'Wetlands'],
    },
    biodiversity: {
      es: ['Tortuga verde', 'Manatí', 'Mono araña', 'Tucán pico arcoíris'],
      en: ['Green sea turtle', 'Manatee', 'Spider monkey', 'Keel-billed toucan'],
    },
  },
  {
    slug: 'aclap',
    abbr: 'ACLAP',
    name: {
      es: 'Área de Conservación La Amistad Pacífico',
      en: 'La Amistad Pacific Conservation Area',
    },
    description: {
      es: 'El Área de Conservación la Amistad Pacífico (ACLA-P) se creó en junio de 1990, tiene una extensión de 522.792,6 hectáreas, de las cuales 193.738,6 hectáreas están dentro de Áreas Silvestres Protegidas (ASP), 169.414,12 hectáreas son la zona de amortiguamiento de las ASP y 167.985,51 (32% del territorio del ACLA-P) son Corredores Biológicos. El ACLA-P se ubica en el sureste de la Región Pacífico Sur de Costa Rica, en los cantones de Pérez Zeledón, Buenos Aires y Coto Brus; desde San Gerardo de Dota hasta la frontera con Panamá, y desde la línea divisoria de aguas en la Cordillera de Talamanca hasta la Fila Costeña o Brunqueña.\n\nEntre los principales atractivos que se encuentran en esta Área de Conservación se mencionan: se ubica el punto más alto de Costa Rica (Cerro Chirripó), se encuentra un Símbolo Nacional Patrio (Cerro Crestones), posee gran historia geológica de la Cordillera de Talamanca, tiene lagos de origen glaciar, hay diversos ecosistemas como sabanas naturales de altura, páramos subalpinos, extensos bosques nubosos, robledales y humedales de altura (turberas), tiene una gran riqueza biológica y alto endemismo, hay una gran riqueza cultural representada en nueve Territorios Indígenas (Boruca, Térraba, Rey Curré, Coto Brus, Ujarrás, Salitre, Cabagra, China Kichá y Alto Chirripó) de las etnias Bribri, Cabécar, Ngöbe, Térraba, Brunka y Boruca, los descendientes de Chiriquí-Panamá, Honduras, Italia y otros países de la región Centroamericana han propiciado una diversidad de tradiciones campesinas, hay una gran belleza escénica-paisajística, se encuentra el Área Silvestre Protegida terrestre más grande de Costa Rica y la única ASP binacional de C.R. (Parque Internacional de La Amistad), se encuentra la cuenca hidrográfica más grande de Costa Rica: el Grande del Térraba, las Áreas Protegidas y comunidades del ACLA-P cuentan con tres denominaciones internacionales otorgadas por la UNESCO: Reserva de la Biósfera La Amistad, Reserva de la Biósfera Savegre y Sitio de Patrimonio Mundial Reservas de la Cordillera de Talamanca – Parque Nacional la Amistad Costa Rica/Panamá. Además de esto, en el ACLA-P se encuentra el Sitio Ramsar Turberas de Talamanca y el Geo parque Aspirante “Parque Nacional Chirripó” y se promueve un enfoque de responsabilidades compartidas de más de dos décadas.\n\nEl ACLA-P tiene diez Áreas Protegidas, de las cuales tres son áreas privadas con categoría de manejo de Refugio Nacional de Vida Silvestre (Longo Mai, Río General y Montaña del Tigre, tres son del Estado (Parque Nacional Chirripó, Parque Internacional de La Amistad y Reserva Biológica del Bicentenario de la Republica Pájaro Campana) y cuatro son mixtas (parte del Estado y parte privadas): Humedal San Vito, Humedal Palustrino Cerro Paraguas, Zona Protectora las Tablas y Reserva Forestal los Santos.\n\nEn el ACLA-P existen cinco tipos de climas y la precipitación anual promedio es de 3800 mm3 con un promedio de 195 días con lluvia al año. La temperatura media anual se mantiene en 30°C, pero puede variar entre 0°C hasta los 32°C. La vegetación es muy variada, muchas especies son endémicas de cada ecosistema (humedales, turberas, páramo, sabanas y bosque húmedo tropical, húmedo subtropical, muy húmedo subtropical, muy húmedo montano bajo, muy húmedo montano. En esos ecosistemas hay una gran riqueza de especies de todos los grupos, algunas de las cuales tienen poblaciones reducidas o están en peligro de extinción, entre ellas las seis especies de felinos y otros mamíferos silvestres, así como aves migratorias o residentes y anfibios como salamandras y ranas. El Aguilucho Penachudo (Spizaetus ornatus) es la especie insignia del ACLA-P.\n\nDurante más de dos décadas, en el ACLA-P se ha liderado un proceso de responsabilidades compartidas entre el SINAC y la sociedad civil, la cual es representada por grupos organizados de comunidades campesinas e indígenas. Estos actores se han involucrado en la conservación de la biodiversidad y los recursos naturales presentes tanto dentro de las Áreas Protegidas como su Zona de Amortiguamiento. Al mismo tiempo, se ha creado un espacio de diálogo e interacción para buscar soluciones conjuntas a diversos problemas sociales, económicos y ambientales. Estas experiencias han beneficiado tanto a las Áreas Protegidas como a la sociedad civil, pero el mayor ganador es el medio ambiente. Con las organizaciones comunales se ha trabajado temas como la educación ambiental, el monitoreo biológico participativo, brigadas de bomberos forestales voluntarios, manejo de actividades ecoturísticas y restauración-conservación de ecosistemas a través de corredores biológicos.\n\nEn las comunidades aledañas a las Áreas Protegidas del ACLAP existen varios emprendimientos de actores locales que tienen proyectos muy diversos mediante los cuales ofrecen servicios a los visitantes de los Parques Nacionales, y los cuales se complementan con el Turismo Rural Comunitario. Entre se destacan la producción de miel de abeja, helados artesanales de diferentes sabores, cacao orgánico, café de altura, vino y mermelada de mora, vino de flor de Jamaica, cerveza artesanal, yogurt, queso, natilla, panadería y repostería casera, cajetas de coco, pesca de trucha, pollos y cerdos de engorde y otros más. Todo esto se complementa con buenas prácticas como la diversificación de fincas, la regeneración natural de áreas de protección, las plantaciones forestales y manejo de desechos sólidos.',
      en: 'The La Amistad Pacific Conservation Area protects the Pacific slope of the Talamanca Mountain Range, including part of La Amistad International Park, a UNESCO World Heritage Site. It harbors the highest ecosystems in the country, including páramos and oak forests, and is fundamental for protecting watersheds that supply thousands of people.',
    },
    headquarters: 'San Isidro del General, Pérez Zeledón',
    address: 'Oficina Regional, San Isidro del General, Puntarenas',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+La+Amistad+Pacifico+San+Isidro+General+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MTA3NjY3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '830,000', parks: 11, visitors: '150K' },
    ecosystems: {
      es: ['Páramo', 'Bosque de roble', 'Bosque nuboso', 'Bosque premontano húmedo'],
      en: ['Páramo', 'Oak forest', 'Cloud forest', 'Humid premontane forest'],
    },
    biodiversity: {
      es: ['Tapir de Baird', 'Quetzal resplandeciente', 'Puma', 'Águila crestada'],
      en: ['Baird\'s tapir', 'Resplendent quetzal', 'Puma', 'Ornate hawk-eagle'],
    },
  },
  {
    slug: 'acosa',
    abbr: 'ACOSA',
    name: {
      es: 'Área de Conservación Osa',
      en: 'Osa Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Osa es considerada uno de los lugares con mayor biodiversidad del planeta. La Península de Osa alberga el Parque Nacional Corcovado, descrito por National Geographic como "el lugar más intenso biológicamente de la Tierra". Protege bosques primarios, manglares, humedales y ecosistemas marinos de valor incalculable.',
      en: 'The Osa Conservation Area is considered one of the most biodiverse places on the planet. The Osa Peninsula houses Corcovado National Park, described by National Geographic as "the most biologically intense place on Earth." It protects primary forests, mangroves, wetlands, and marine ecosystems of incalculable value.',
    },
    headquarters: 'Golfito, Puntarenas',
    address: '800 metros norte de la pista de aterrizaje de Golfito, Antiguo Naranjal, Golfito, Puntarenas',
    phone: '(506) 2775-1210',
    email: 'acosa.info@sinac.go.cr',
    mapUrl: 'https://www.google.com/maps/search/SINAC+ACOSA+800+norte+pista+aterrizaje+Golfito+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc4MTA3NjY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '420,000', parks: 14, visitors: '280K' },
    ecosystems: {
      es: ['Bosque tropical primario', 'Manglares', 'Ecosistemas marinos', 'Humedales costeros'],
      en: ['Primary tropical forest', 'Mangroves', 'Marine ecosystems', 'Coastal wetlands'],
    },
    biodiversity: {
      es: ['Jaguar', 'Guacamaya roja', 'Tapir de Baird', 'Delfín nariz de botella'],
      en: ['Jaguar', 'Scarlet macaw', 'Baird\'s tapir', 'Bottlenose dolphin'],
    },
  },
  {
    slug: 'acopac',
    abbr: 'ACOPAC',
    name: {
      es: 'Área de Conservación Pacífico Central',
      en: 'Pacific Central Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Pacífico Central protege una franja costera e interior de gran importancia ecológica en la costa pacífica de Costa Rica. Incluye el famoso Parque Nacional Manuel Antonio, uno de los parques más visitados del país, y el Parque Nacional Carara, zona de transición entre el bosque seco y húmedo que alberga la mayor población de guacamayas rojas del Pacífico Central.',
      en: 'The Pacific Central Conservation Area protects a coastal and inland strip of great ecological importance on Costa Rica\'s Pacific coast. It includes the famous Manuel Antonio National Park, one of the most visited parks in the country, and Carara National Park, a transition zone between dry and wet forest that harbors the largest population of scarlet macaws in the Central Pacific.',
    },
    headquarters: 'Quepos, Puntarenas',
    address: 'Oficina Regional, Quepos, Puntarenas',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+Pacifico+Central+Quepos+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjBuYXR1cmUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc4MTA3NjY3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '185,000', parks: 8, visitors: '680K' },
    ecosystems: {
      es: ['Bosque tropical de transición', 'Ecosistemas costeros', 'Manglares', 'Bosque húmedo'],
      en: ['Transitional tropical forest', 'Coastal ecosystems', 'Mangroves', 'Humid forest'],
    },
    biodiversity: {
      es: ['Guacamaya roja', 'Mono tití', 'Cocodrilo americano', 'Perezoso de dos dedos'],
      en: ['Scarlet macaw', 'Squirrel monkey', 'American crocodile', 'Two-toed sloth'],
    },
  },
  {
    slug: 'acmc',
    abbr: 'ACMC',
    name: {
      es: 'Área de Conservación Marina Cocos',
      en: 'Cocos Island Marine Conservation Area',
    },
    description: {
      es: 'El Área de Conservación Marina Cocos administra la Isla del Coco, Patrimonio Natural de la Humanidad UNESCO y uno de los mejores sitios de buceo del mundo. Esta isla oceánica, ubicada a 532 km de la costa pacífica, es un laboratorio natural para el estudio de la evolución y alberga especies endémicas únicas. Sus aguas circundantes protegen una extraordinaria biodiversidad marina.',
      en: 'The Cocos Island Marine Conservation Area manages Cocos Island, a UNESCO World Heritage Site and one of the best diving sites in the world. This oceanic island, located 532 km off the Pacific coast, is a natural laboratory for studying evolution and harbors unique endemic species. Its surrounding waters protect extraordinary marine biodiversity.',
    },
    headquarters: 'San José (Oficina Administrativa)',
    phone: '(506) 2291-1215 / 2291-1216',
    email: 'acmc.info@sinac.go.cr',
    mapUrl: 'https://www.google.com/maps/search/SINAC+Area+Conservacion+Marina+Cocos+San+Jose+Costa+Rica',
    image: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDb3N0YSUyMFJpY2ElMjByYWluZm9yZXN0fGVufDF8fHx8MTc4MTA3NjY3OXww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920',
    stats: { hectares: '1,997,000', parks: 2, visitors: '3K' },
    ecosystems: {
      es: ['Ecosistemas marinos pelágicos', 'Arrecifes de coral', 'Bosque tropical insular', 'Aguas profundas'],
      en: ['Pelagic marine ecosystems', 'Coral reefs', 'Insular tropical forest', 'Deep waters'],
    },
    biodiversity: {
      es: ['Tiburón martillo', 'Mantarraya gigante', 'Tortuga carey', 'Delfín nariz de botella'],
      en: ['Hammerhead shark', 'Giant manta ray', 'Hawksbill turtle', 'Bottlenose dolphin'],
    },
    note: {
      es: 'Área completamente marina. Patrimonio Natural de la Humanidad UNESCO. Isla del Coco.',
      en: 'Entirely marine area. UNESCO World Heritage Site. Cocos Island.',
    },
  },
];

export function getAreaBySlug(slug: string): ConservationAreaData | undefined {
  return CONSERVATION_AREAS_DATA.find((area) => area.slug === slug);
}
