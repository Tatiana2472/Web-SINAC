export const getDestinations = (isEnglish: boolean) => 
  isEnglish ? ['Forest', 'Mountain', 'Beach', 'Volcano'] : ['Bosque', 'Montaña', 'Playa', 'Volcán'];

export const getServices = (isEnglish: boolean) => 
  isEnglish ? [
    'Accepts Credit Cards', 'Drinking Water', 'Lodge', 'Research Lodge',
    'Camping Area', 'Picnic Area', 'Educational Classroom', 'Cafeteria',
    'Landing Field', 'Information Center', 'Showers', 'Electricity',
    'Parking', 'Naturalist Guide', 'Internet', 'Online Payment',
    'First Aid', 'Radio Communication', 'Prior Reservation', 'Accessible Trail',
    'Nature Trail', 'Universal Trail', 'Restrooms', 'Wheelchair',
    'Public Telephone', 'Store', 'Volunteering'
  ] : [
    'Acepta pago con Tarjeta', 'Agua Potable', 'Albergue', 'Albergue para Investigación',
    'Área para acampar', 'Área para Almorzar', 'Aula Educativa', 'Cafetería',
    'Campo Aterrizaje', 'Centro de Información', 'Duchas', 'Electricidad',
    'Estacionamiento', 'Guía Naturalista', 'Internet', 'Pago en línea',
    'Primeros Auxilios', 'Radio Comunicación', 'Reserva Previa', 'Sendero Accesible',
    'Sendero Natural', 'Sendero Universal', 'Servicios Sanitarios', 'Silla de Ruedas',
    'Teléfono Público', 'Tienda', 'Voluntariado'
  ];

export const getAttractions = (isEnglish: boolean) => 
  isEnglish ? [
    'Hot Springs', 'Reefs', 'Diving', 'Canals', 'Waterfall', 'Waterfalls',
    'Cave', 'Cultural', 'Lagoons', 'Viewpoint', 'Rivers', 'Snorkeling', 'Wildlife Sighting'
  ] : [
    'Aguas Termales', 'Arrecifes', 'Buceo', 'Canales', 'Cascada', 'Cataratas',
    'Caverna', 'Cultural', 'Lagunas', 'Mirador', 'Ríos', 'Snorkeling', 'Avistamientos'
  ];

export type NationalPark = {
  id: string;
  name: string;
  image: string;
  description: string;
  destinations: string[];
  services: string[];
  attractions: string[];
};

export const getNationalParks = (isEnglish: boolean): NationalPark[] => [
  {
    id: 'pn-manuel-antonio',
    name: isEnglish ? 'Manuel Antonio National Park' : 'Parque Nacional Manuel Antonio',
    image: 'https://images.unsplash.com/photo-1610486810243-7053e1a8fa19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: isEnglish 
      ? 'Famous for its beautiful beaches and abundant wildlife, including sloths and monkeys.' 
      : 'Famoso por sus hermosas playas y abundante vida silvestre, incluyendo perezosos y monos.',
    destinations: isEnglish ? ['Beach', 'Forest'] : ['Playa', 'Bosque'],
    services: isEnglish 
      ? ['Accepts Credit Cards', 'Drinking Water', 'Parking', 'Restrooms', 'Universal Trail', 'Accessible Trail'] 
      : ['Acepta pago con Tarjeta', 'Agua Potable', 'Estacionamiento', 'Servicios Sanitarios', 'Sendero Universal', 'Sendero Accesible'],
    attractions: isEnglish ? ['Viewpoint', 'Wildlife Sighting'] : ['Mirador', 'Avistamientos'],
  },
  {
    id: 'pn-volcan-arenal',
    name: isEnglish ? 'Arenal Volcano National Park' : 'Parque Nacional Volcán Arenal',
    image: 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: isEnglish 
      ? 'Home to the imposing Arenal Volcano and surrounded by lush tropical forest.' 
      : 'Hogar del imponente Volcán Arenal y rodeado de exuberante bosque tropical.',
    destinations: isEnglish ? ['Volcano', 'Mountain', 'Forest'] : ['Volcán', 'Montaña', 'Bosque'],
    services: isEnglish 
      ? ['Accepts Credit Cards', 'Drinking Water', 'Parking', 'Restrooms', 'Information Center', 'Store'] 
      : ['Acepta pago con Tarjeta', 'Agua Potable', 'Estacionamiento', 'Servicios Sanitarios', 'Centro de Información', 'Tienda'],
    attractions: isEnglish ? ['Hot Springs', 'Viewpoint', 'Wildlife Sighting'] : ['Aguas Termales', 'Mirador', 'Avistamientos'],
  },
  {
    id: 'pn-corcovado',
    name: isEnglish ? 'Corcovado National Park' : 'Parque Nacional Corcovado',
    image: 'https://images.unsplash.com/photo-1536709017021-ce8f99c17e38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: isEnglish 
      ? 'One of the most biologically intense places on earth, with impressive biodiversity.' 
      : 'Uno de los lugares con mayor intensidad biológica del mundo, con una impresionante biodiversidad.',
    destinations: isEnglish ? ['Forest', 'Beach'] : ['Bosque', 'Playa'],
    services: isEnglish 
      ? ['Camping Area', 'Drinking Water', 'Research Lodge', 'Naturalist Guide'] 
      : ['Área para acampar', 'Agua Potable', 'Albergue para Investigación', 'Guía Naturalista'],
    attractions: isEnglish ? ['Waterfall', 'Rivers', 'Wildlife Sighting'] : ['Cascada', 'Ríos', 'Avistamientos'],
  },
  {
    id: 'pn-tortuguero',
    name: isEnglish ? 'Tortuguero National Park' : 'Parque Nacional Tortuguero',
    image: 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: isEnglish 
      ? 'Known as the "Amazon of Costa Rica", famous for its canals and turtle nesting.' 
      : 'Conocido como el "Amazonas de Costa Rica", famoso por sus canales y el desove de tortugas.',
    destinations: isEnglish ? ['Forest', 'Beach'] : ['Bosque', 'Playa'],
    services: isEnglish 
      ? ['Information Center', 'Naturalist Guide', 'Prior Reservation', 'Restrooms'] 
      : ['Centro de Información', 'Guía Naturalista', 'Reserva Previa', 'Servicios Sanitarios'],
    attractions: isEnglish ? ['Canals', 'Rivers', 'Wildlife Sighting', 'Cultural'] : ['Canales', 'Ríos', 'Avistamientos', 'Cultural'],
  },
  {
    id: 'pn-cahuita',
    name: isEnglish ? 'Cahuita National Park' : 'Parque Nacional Cahuita',
    image: 'https://images.unsplash.com/photo-1623385521692-4a591e66619e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
    description: isEnglish 
      ? 'Protects one of the most developed coral reefs on the Caribbean coast.' 
      : 'Protege uno de los arrecifes de coral más desarrollados de la costa caribeña.',
    destinations: isEnglish ? ['Beach', 'Forest'] : ['Playa', 'Bosque'],
    services: isEnglish 
      ? ['Drinking Water', 'Picnic Area', 'Showers', 'Restrooms'] 
      : ['Agua Potable', 'Área para Almorzar', 'Duchas', 'Servicios Sanitarios'],
    attractions: isEnglish ? ['Reefs', 'Snorkeling', 'Diving', 'Wildlife Sighting'] : ['Arrecifes', 'Snorkeling', 'Buceo', 'Avistamientos'],
  }
];
