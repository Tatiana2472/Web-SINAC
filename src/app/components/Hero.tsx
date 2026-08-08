import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';
import { BookingModal } from './BookingModal';
import { InfoModal } from './InfoModal';
import { useLanguage } from '../context/LanguageContext';
import logoSinac from '@/assets/Logo-SINAC.png';

export function Hero() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState<{ title: string; content: string } | null>(null);
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen h-auto w-full overflow-hidden xl:h-screen">
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxWb2xjYW4lMjBUZW5vcmlvJTIwbmF0aW9uYWwlMjBwYXJrJTIwQ29zdGElMjBSaWNhfGVufDF8fHx8MTc4MDU0Mjg3Mnww&ixlib=rb-4.1.0&q=100&w=2560"
          alt="Río Celeste Waterfall at Parque Nacional Volcán Tenorio"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      </div>

      <div className="relative z-10 flex min-h-screen max-w-[1600px] mx-auto items-center px-4 pt-20 pb-10 sm:px-6 sm:pt-24 lg:px-8 lg:pt-0 xl:h-full">
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl space-y-6 text-white sm:space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="inline-block px-4 py-2 bg-[#27C5D8]/20 backdrop-blur-sm border border-[#27C5D8]/30 rounded-full text-[#27C5D8] text-sm font-medium"
              >
                {isEnglish ? 'National System of Conservation Areas' : 'Sistema Nacional de Áreas de Conservación'}
              </motion.div>

              <h1 className="text-3xl font-bold leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-7xl">
                {isEnglish ? 'Discover the natural wealth of' : 'Descubra la riqueza natural de'}{' '}
                <span className="text-[#27C5D8]">Costa Rica</span>
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] sm:text-xl">
                {isEnglish
                  ? 'Protecting biodiversity, promoting sustainable tourism and connecting people with nature.'
                  : 'Protegiendo la biodiversidad, promoviendo el turismo sostenible y conectando a las personas con la naturaleza.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('volcan-tenorio-feature')}
                className="group flex w-full items-center justify-center space-x-2 rounded-full bg-[#27C5D8] px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-[#27C5D8]/30 transition-colors hover:bg-[#1fa5b5] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                <span>{isEnglish ? 'Plan your visit' : 'Planifique su visita'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('conservation-areas')}
                className="w-full rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-base font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
              >
                {isEnglish ? 'Explore protected areas' : 'Explorar áreas protegidas'}
              </motion.button>
            </div>

            <div className="flex flex-wrap items-start gap-x-5 gap-y-4 pt-2 sm:space-x-8 sm:pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#27C5D8]">28%</div>
                <div className="text-sm text-white/70">{isEnglish ? 'of the territory protected' : 'del territorio protegido'}</div>
              </div>
              <div className="hidden h-12 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#27C5D8]">170+</div>
                <div className="text-sm text-white/70">{isEnglish ? 'protected areas' : 'áreas protegidas'}</div>
              </div>
              <div className="hidden h-12 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <div className="text-3xl font-bold text-[#27C5D8]">5%</div>
                <div className="text-sm text-white/70">{isEnglish ? 'global biodiversity' : 'biodiversidad mundial'}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Information cards: stacked on mobile/tablet and floating on desktop. */}
      <div className="relative z-20 mx-auto mt-2 block w-full max-w-[1600px] px-4 pb-10 sm:px-6 lg:px-8 xl:absolute xl:right-8 xl:top-1/2 xl:mt-0 xl:w-72 xl:-translate-y-1/2 xl:px-0 xl:pb-0">
        <div className="flex gap-3 overflow-x-auto pb-3 custom-scrollbar md:grid md:grid-cols-2 xl:block xl:max-h-[75vh] xl:space-y-4 xl:overflow-y-auto xl:pr-2 xl:pb-8">
          {[
            {
              title: isEnglish ? 'Information' : 'Información',
              category: isEnglish ? 'Flora and Fauna' : 'Flora y Fauna',
              image: 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              content: isEnglish ? `The PNVT-ZPT is located on the Guanacaste Volcanic Mountain Range, just 9 kilometers from Bijagua and 28 kilometers from Guatuso, Alajuela. It is located in the districts of Bijagua, Buena Vista, San Rafael and Cote in the province of Alajuela, and the districts of Arenal, Tierras Morenas and Palmira in the province of Guanacaste. 

The climate of the PNVT-ZPT in most of the area receives the climatic influence of the Caribbean with rainfall almost all year round. The average temperature is 23°C, with an annual rainfall average of 3,500 mm. 

The life zones represented in the PNVT are the Tropical Very Humid Forest, Tropical Very Humid Forest transition to Premontane, Premontane Pluvial Forest, which is the largest extension in the park; Lower Montane Pluvial forest and Premontane Very Humid forest. 

The flora is very varied, highlighting a high diversity of palms, heliconias, ferns, bromeliads and orchids, among others. As for the trees, the aguacatillos, sapotes, pilones, lauráceas, marías, oaks and the jícaro danto stand out, which is endemic to this mountain range. Among the fauna present is: Puma, Jaguarundi, Baird's Tapir, Collared Peccary, White-faced monkey, Ocelot, Agouti, Margay, Paca, Tayra, Crested Guan, the Bare-necked Umbrellabird, the Sunbittern, snakes such as the Bushmaster, Fer-de-lance, Jumping Pitviper, Eyelash Viper, Coral snake, Vine snakes, etc.` 
              : `El PNVT-ZPT se localiza sobre la Cordillera Volcánica de Guanacaste, a tan solo 9 kilómetros de Bijagua y 28 kilómetros de Guatuso, Alajuela. Se localiza en los distritos de Bijagua, Buena Vista, San Rafael y Cote de la provincia de Alajuela, y los distritos Arenal, Tierras Morenas y Palmira de la provincia de Guanacaste. 

El clima del PNVT-ZPT en la mayor parte del área recibe la influencia climática del Caribe con precipitaciones durante casi todo el año. La temperatura promedio es de 23°C, con un promedio anual de lluvia es 3.500 mm. 

Las zonas de vida representadas en el PNVT son el Bosque muy Húmedo Tropical, Bosque muy Húmedo Tropical transición a Premontano, Bosque Pluvial Premontano, que es la de mayor extensión en el parque; bosque Pluvial Montano Bajo y bosque muy Húmedo Premontano. 

La flora es muy variada, sobresaliendo una alta diversidad de palmas, heliconias, helechos, bromelias y orquídeas, entre otras. En cuanto a los árboles sobresalen los aguacatillos, sapotes, pilones, lauráceas, marías, robles y el jícaro danto, el cual es endémico de esta cordillera. Entre la fauna presente está: Puma (Felis concolor) León breñero (Felis yegouaroundi) Danta (Tapirus bairdii) Saíno (Tajacu pecari) Mono cariblanco (Cebus capucinus) manigordo (Leopardus pardalis) Guatuza (Dasyprocta punctata) caucel (Leopardus wiedii) Tepescuintle (Agouti paca) Tolomuco (Eira barbara) Pava (Penelope purpurarcens) el Pájaro Sombrilla (Cephalopterus glabricolis) el Ave Sol (Eurypyga helias) serpientes como la Mata Buey, Terciopelo, Mano de Piedra, Bocaracá, Béquer, Coral, Bejuquillas, etc.`,
            },
            {
              title: isEnglish ? 'History' : 'Historia',
              category: isEnglish ? 'Creation & Protection' : 'Creación y Protección',
              image: 'https://images.unsplash.com/photo-1633716898262-0e1469d55bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              content: isEnglish ? `The legal protection of the natural resources of the PNVT and the ZPT began on July 30, 1955 through Law No.1917, which declared a National Park two kilometers around the crater of the Tenorio Volcano.

Initially, in February 1976 the Guanacaste Volcanic Cordillera Forest Reserve was established. In 1978, Executive Decree N.8473-A was reformed, which divided the Reserve into three zones comprising the lands around the Orosí, Miravalles and Tenorio Volcanoes. In 1991 the Tenorio Protection Zone was decreed with 5,553.98 ha and finally, on June 8, 1995, the Tenorio Volcano National Park was created, with an extension of 12,871.53 ha, through executive decree No.24290-MIRENEM, published in the official gazette La Gaceta number 110 of June 8, 1995. 

The national park together with the protection zone protect a territory of 18,402.27 hectares, located between the cantons of Upala and Guatuso in the province of Alajuela, and Cañas and Tilarán in the province of Guanacaste. 

The PNVT-ZPT is an integral part of the Agua y Paz Biosphere Reserve, which was named by UNESCO in September 2007.` 
              : `La protección legal de los recursos naturales del PNVT y la ZPT se inicia el 30 de julio de 1955 mediante la Ley No.1917, la cual declaró Parque Nacional dos kilómetros alrededor del cráter del Volcán Tenorio.

Inicialmente, en febrero de 1976 se establece la Reserva Forestal Cordillera Volcánica de Guanacaste. En 1978 se reformó el Decreto Ejecutivo N.8473-A el cual dividió la Reserva en tres zonas que comprendieron los terrenos alrededor de los Volcanes Orosí, Miravalles y Tenorio. En 1991 se decretó la Zona Protectora Tenorio con 5 553,98 has y finalmente, 8 de junio de 1995, fue creado el Parque Nacional Volcán Tenorio, con una extensión de 12 871.53 has, mediante el decreto ejecutivo No.24290-MIRENEM, publicado en el diario oficial la Gaceta número 110 del día ocho de junio de 1995. 

El parque nacional junto con la zona protectora, protegen un territorio de 18 402.27 hectáreas, localizado entre los cantones de Upala y Guatuso de la provincia de Alajuela, y Cañas y Tilarán de la provincia de Guanacaste. 

El PNVT-ZPT es parte integral de la Reserva de Biosfera Agua y Paz, la cual fue nombrada por la UNESCO en septiembre del 2007.`,
            },
            {
              title: isEnglish ? 'Schedules and rates' : 'Horarios y tarifas',
              category: isEnglish ? 'Information' : 'Información',
              image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              content: isEnglish ? `Schedule:
Open every day, from Monday to Sunday. Entry hours from 08:00 am to 02:00 pm. You can stay in the park until 04:00 pm. The established carrying capacity is 1200 people per day. Only 500 people are allowed simultaneously on the trail.

Ticket purchase:
Ticket purchases are made only through the official website https://serviciosenlinea.sinac.go.cr

Entrance fees with VAT included:
Nationals and/or residents: ¢904
National and/or resident children: ¢565
Non-residents: $13.56
Non-resident children: $5.65
National and/or resident seniors enter for free.
Children under 2 years enter for free.` 
              : `Horario:
Abierto todos los días, de lunes a domingo. Horario de ingreso de 08:00 am a 02:00 pm. Se puede permanecer en el lugar hasta las 04:00 pm. La capacidad de carga establecida es de 1200 personas por día. Solamente se permiten 500 personas simultáneamente en el sendero.

Compra de entradas:
La compra de las entradas se realiza únicamente a través del sitio web oficial https://serviciosenlinea.sinac.go.cr

Tarifas de ingreso con IVA incluido:
Nacionales y/o residentes: ¢904
Niños(as) nacionales y/o residentes: ¢565
No residentes: $13.56
Niños(as) no residentes: $5.65
Adulto mayor nacional y/o residente ingresan gratis.
Niños menores de 2 años ingresan gratis.`,
            },
            {
              title: isEnglish ? 'Services' : 'Servicios',
              category: isEnglish ? 'Park Facilities' : 'Facilidades del Parque',
              image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              content: isEnglish ? `Services:

Drinking water
Restrooms

*Private parking (must be paid)` 
              : `Servicios:

Agua potable
Sanitarios

*Estacionamiento privado (se debe de pagar)`,
            },
            {
              title: isEnglish ? 'Main attractions' : 'Principales atractivos',
              category: isEnglish ? 'Misterios del Tenorio Trail' : 'Sendero Misterios del Tenorio',
              image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              content: isEnglish ? `Main attractions of the Misterios del Tenorio trail.

It is a linear nature trail with a distance of 3 km. Through it, you can visit the main attractions of the Park, such as the waterfall, the viewpoint, the blue lagoon, the borbollones and the Teñidero. In a tour of 6 km in total and an approximate time of 3 hours, you can enjoy the natural beauties of this Protected Wildlife Area.

Celeste River Waterfall: This waterfall, which is approximately 20 meters high, has become the main attraction due to its bluish coloration.

Viewpoint: At this point, you can appreciate three of the four volcanic cones of the Tenorio massif: the main Tenorio one, followed by Tenorio two and Cerro Montezuma.

Blue lagoon: Small pool of intense color.

Boiling mud (borbollones): These are fissures and cracks through which gases from the local volcanic activity escape at high temperature.

Teñidero: Point where the phenomenon that gives the sky blue coloration effect to the river begins. The turquoise color of the water can be seen from many other sectors, but this is the only site where the change in coloration can be seen.` 
              : `Principales atractivos del sendero Misterios del Tenorio.

Es un sendero natural lineal con una distancia de 3 km. A través de él se recorren los principales atractivos del Parque, como la catarata, el mirador, la laguna azul, los borbollones y el Teñidero. En un recorrido de 6 km en total y un tiempo aproximado de 3 horas, usted podrá disfrutar de las bellezas naturales de esta Área Silvestre Protegida.

Catarata Río Celeste: Esta caída de agua, que tiene una altura aproximada de 20 metros, se ha convertido en el principal atractivo por su coloración azulada.

Mirador: En este punto, usted podrá apreciar tres de los cuatro conos volcánicos del macizo Tenorio: el principal Tenorio uno, seguido de Tenorio dos y el Cerro Montezuma.

La laguna azul: Pequeña poza de color intenso.

Los borbollones: Son fisuras y grietas por donde se escapan, a alta temperatura, gases propios de la actividad volcánica del lugar.

El Teñidero: Punto donde se inicia el fenómeno que da el efecto de coloración celeste al río. Desde muchos otros sectores se puede apreciar el color turquesa del agua, pero este es el único sitio donde se aprecia el cambio en la coloración.`,
            },
            {
              title: isEnglish ? 'Recommendations' : 'Recomendaciones',
              category: isEnglish ? 'Guidelines' : 'Regulaciones',
              image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              content: isEnglish ? `Recommendations for your visit:

- Comfortable clothing and footwear are recommended.
- Single-use plastics are not allowed.
- Pets are not allowed.
- Entering the river is not allowed.
- Drones are not allowed.
- Alcoholic beverages are prohibited.
- Smoking is prohibited.
- Always stay on the trail.` 
              : `Recomendaciones para su visita:

- Se recomienda el uso de ropa y calzado cómodo.
- No se permite el ingreso de plásticos de un solo uso.
- No se permite el ingreso de mascotas.
- No se permite ingresar al río.
- No se permite el ingreso de drones.
- Prohibido el ingreso de bebidas alcohólicas.
- Prohibido fumar.
- Mantenerse siempre en el sendero.`,
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              onClick={() => setSelectedInfo({ title: card.title, content: card.content })}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ x: -8, scale: 1.02 }}
              className="group relative h-32 w-[250px] min-w-[250px] min-h-0 shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md cursor-pointer sm:w-[280px] sm:min-w-[280px] md:h-auto md:w-auto md:min-w-0 md:min-h-[180px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <ImageWithFallback
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute top-2 right-2 z-30">
                <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm">
                  <img 
                    src={logoSinac} 
                    alt="SINAC" 
                    className="h-5 object-contain" 
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-xs font-medium text-[#27C5D8] mb-1">{card.category}</div>
                <h3 className="text-sm font-bold text-white">{card.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 xl:block"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollToSection('visit')}
          className="text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </motion.div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        parkName={isEnglish ? 'Volcán Tenorio National Park' : 'Parque Nacional Volcán Tenorio'}
      />
      
      <InfoModal
        isOpen={selectedInfo !== null}
        onClose={() => setSelectedInfo(null)}
        title={selectedInfo?.title || ''}
        content={selectedInfo?.content || ''}
      />
    </section>
  );
}
