# ROLE: Senior UI/UX Designer & Frontend Expert (SINAC Institutional Portal)
# CONTEXT: You are building a premium, modern interactive dashboard component for the Conservation Areas of SINAC (Costa Rica). The design must follow a strict Premium Dark Mode with nature-inspired accents (Deep Charcoal backgrounds, Emerald/Turquoise highlights) and an advanced Bento Box grid with Glassmorphism cards.

# GLOBAL SCOPE & AUTOMATIC FRAME GENERATION RULE:
- Do NOT require the user to manually select an existing frame.
- Automatically CREATE a new dedicated Desktop Frame (Width: 1440px, Height: variable/auto) to host this entire development.
- Apply Auto-Layout to the generated frame to keep all inner structures pixel-perfect, clean, and fully organized.
- STRICT RULE: Do NOT modify, alter, or touch any other section outside this new component.

# ASSETS & LOGO CONFIGURATION:
- Navigation Bar: In the top-left area, insert the official SINAC logo using this direct URL: https://cocosisland.org/wp-content/uploads/2018/11/logo-sinac.png
- Placeholders: Since local asset folders are currently being synchronized, use high-quality Unsplash environment/nature placeholders for the background container and card image thumbnails.

# COMPONENT STRUCTURE (BENTO BOX GRID + MAP SPLIT):
- Divide the frame into a 2-column dashboard setup:
  - RIGHT COLUMN (60% Width): An interactive full-height map visualization container representing Costa Rica's geography with 11 clear interactive marker pins.
  - LEFT COLUMN (40% Width): A scrollable content viewport that changes dynamically. When a user clicks "Ver todas las áreas" or clicks a specific marker pin on the map, it smoothly renders an elegant Glassmorphism info-card displaying the exact verified data from the dataset below.
  - Interactive Action: Every single card must feature a prominent functional button styled with a Turquoise background (#00CED1) labeled "Ver ubicación en Google Maps" that triggers the exact URL provided in the dataset.

# VERIFIED INSTITUTIONAL DATASET (11 CONSERVATION AREAS):
Use ONLY the following officially verified data. Do not alter, hallucinate, or simplify any address, phone number, or URL:

1. ÁREA DE CONSERVACIÓN ARENAL HUETAR NORTE (ACAHN)
   - Sede: Ciudad Quesada, San Carlos, Alajuela
   - Dirección: 150 norte y 200 este del Hospital de San Carlos, Ciudad Quesada, San Carlos, Alajuela
   - Teléfono: (506) 2460-0055 / 2460-1412
   - Correo: acahn.info@sinac.go.cr
   - Google Maps URL: https://www.google.com/maps/search/150+norte+200+este+Hospital+San+Carlos+Ciudad+Quesada+Alajuela+Costa+Rica
   - Reseña: Resguarda ecosistemas boscosos y humedales del norte del país, enfocada en la protección del recurso hídrico y la biodiversidad de llanuras.

2. ÁREA DE CONSERVACIÓN ARENAL TEMPISQUE (ACAT)
   - Sede: Tilarán, Guanacaste
   - Dirección: De las instalaciones de la Fuerza Pública 275 metros al Sur, contiguo a la Estación de Bomberos, edificio blanco esquinero, Tilarán, Guanacaste
   - Teléfono: (506) 2695-5180
   - Google Maps URL: https://www.google.com/maps/search/Fuerza+Publica+Tilaran+Guanacaste+Costa+Rica+SINAC+ACAT
   - Reseña: Protege la cuenca hidrográfica del Arenal y zonas de vida que van desde el bosque seco tropical hasta el bosque nuboso, vital para la energía nacional.

3. ÁREA DE CONSERVACIÓN GUANACASTE (ACG)
   - Sede: Liberia, Guanacaste
   - Dirección: Sub-región Liberia, Guanacaste
   - Teléfono: (506) 2666-0630
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Guanacaste+Liberia+Costa+Rica
   - Nota: Patrimonio Natural de la Humanidad UNESCO (1999)
   - Reseña: Ejemplo mundial de restauración ecológica que abarca desde ambientes marinos y bosque seco hasta bosques lluviosos nublados.

4. ÁREA DE CONSERVACIÓN TEMPISQUE (ACT)
   - Sede: Nicoya, Guanacaste
   - Dirección: Oficina Regional, Nicoya, Guanacaste
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Tempisque+Nicoya+Guanacaste+Costa+Rica
   - Reseña: Enfocada en la conservación de la Península de Nicoya y la cuenca baja del Río Tempisque, protegiendo manglares y sistemas de acuíferos críticos.

5. ÁREA DE CONSERVACIÓN CARIBE (ACLAC)
   - Sede: Guápiles / Limón
   - Dirección: Oficina Regional, zona del Caribe costarricense
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Caribe+Guapiles+Limon+Costa+Rica
   - Reseña: Resguarda la exuberante biodiversidad de las llanuras del Caribe, canales tortuosos, selvas tropicales lluviosas y arrecifes coralinos clave.

6. ÁREA DE CONSERVACIÓN CENTRAL (ACC)
   - Sede: San Miguel de Santo Domingo, Heredia
   - Dirección: Del segundo cruce de San Miguel de Santo Domingo de Heredia 450 metros al noreste, sobre la carretera Braulio Carrillo
   - Teléfono: (506) 2268-8091 / 2268-8087
   - Correo: acc.info@sinac.go.cr
   - Google Maps URL: https://www.google.com/maps/search/San+Miguel+Santo+Domingo+Heredia+carretera+Braulio+Carrillo+SINAC+Costa+Rica
   - Reseña: Gestiona las áreas protegidas de la zona con mayor densidad demográfica del país, incluyendo volcanes emblemáticos y cuencas de captación de agua potable.

7. ÁREA DE CONSERVACIÓN LA AMISTAD CARIBE (ACLAC)
   - Sede: Turrialba, Cartago
   - Dirección: Oficina Regional, Turrialba, Cartago
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+La+Amistad+Caribe+Turrialba+Costa+Rica
   - Reseña: Co-gestiona la vertiente atlántica de la Cordillera de Talamanca, caracterizada por una alta presencia de territorios indígenas y biodiversidad excepcional.

8. ÁREA DE CONSERVACIÓN LA AMISTAD PACÍFICO (ACLAP)
   - Sede: San Isidro del General, Pérez Zeledón
   - Dirección: Oficina Regional, San Isidro del General, Puntarenas
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+La+Amistad+Pacifico+San+Isidro+General+Costa+Rica
   - Reseña: Custodia las cumbres más altas de Costa Rica en la Cordillera de Talamanca, con ecosistemas de páramo únicos y especies endémicas.

9. ÁREA DE CONSERVACIÓN OSA (ACOSA)
   - Sede: Golfito, Puntarenas
   - Dirección: 800 metros norte de la pista de aterrizaje de Golfito, Antiguo Naranjal, Golfito, Puntarenas
   - Teléfono: (506) 2775-1210
   - Correo: acosa.info@sinac.go.cr
   - Google Maps URL: https://www.google.com/maps/search/SINAC+ACOSA+800+norte+pista+aterrizaje+Golfito+Costa+Rica
   - Reseña: Protege la mayor concentración de biodiversidad del país en la Península de Osa, incluyendo selvas vírgenes y el Golfo Dulce.

10. ÁREA DE CONSERVACIÓN PACÍFICO CENTRAL (ACOPAC)
    - Sede: Quepos, Puntarenas
    - Dirección: Oficina Regional, Quepos, Puntarenas
    - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Pacifico+Central+Quepos+Costa+Rica
    - Reseña: Zona de transición ecológica entre el norte seco y el sur húmedo, resguardando parches críticos de bosque e importantes litorales marinos.

11. ÁREA DE CONSERVACIÓN MARINA COCOS (ACMC)
    - Sede: San José (Oficina Administrativa)
    - Teléfono: (506) 2291-1215 / 2291-1216
    - Correo: acmc.info@sinac.go.cr
    - Google Maps URL: https://www.google.com/maps/search
    - Reseña: Protege un oasis de biodiversidad marina en el Océano Pacífico, la Isla del Coco, famosa mundialmente por sus poblaciones de tiburones y aguas prístinas.

# DESIGN & LAYOUT REQUIREMENTS:
- Typography: Use clean, highly readable Sans-serif fonts with clear mathematical hierarchies for Titles, Subtitles, and Body texts.
- Layout System: Apply absolute pixel precision with Auto-Layout, proper gaps (e.g., 16px, 24px) for cards, and smooth micro-interactions (Hover scales, opacity transitions) for buttons and active states.