# ROLE: Senior UI/UX Designer (SINAC Institutional Portal)
# CONTEXT: You are building a premium, modern interactive dashboard component for the Conservation Areas of SINAC (Costa Rica). The design must follow a strict Premium Dark Mode with nature-inspired accents (Deep Charcoal backgrounds, Emerald/Turquoise highlights) and an advanced Bento Box grid with Glassmorphism cards.

# GLOBAL SCOPE & AUTOMATIC FRAME GENERATION RULE:
- Do NOT require the user to manually select an existing frame.
- Automatically CREATE a new dedicated Desktop Frame (Width: 1440px, Height: variable/auto) to host this entire development.
- Apply Auto-Layout to the generated frame to keep all inner structures pixel-perfect, clean, and fully organized.

# ASSETS & LOGO CONFIGURATION:
- Navigation Bar: In the top-left area, insert the official SINAC logo using this direct URL: https://cocosisland.org/wp-content/uploads/2018/11/logo-sinac.png
- Placeholders: Use high-quality Unsplash environment/nature placeholders for the background container and card image thumbnails.

# COMPONENT STRUCTURE (BENTO BOX GRID + MAP SPLIT):
- Divide the frame into a 2-column dashboard setup:
  - RIGHT COLUMN (60% Width): A map visualization container.
  - LEFT COLUMN (40% Width): A scrollable content viewport holding elegant Glassmorphism info-cards displaying the exact verified data from the dataset below.
  - Interactive Action: Every single card must feature a prominent functional button styled with a Turquoise background (#00CED1) labeled "Ver ubicación en Google Maps" that links to the exact URL provided in the dataset.

# VERIFIED INSTITUTIONAL DATASET (11 CONSERVATION AREAS):
Use ONLY the following officially verified data. Do not alter or simplify any address, phone number, or URL:

1. ÁREA DE CONSERVACIÓN ARENAL HUETAR NORTE (ACAHN)
   - Sede: Ciudad Quesada, San Carlos, Alajuela
   - Dirección: 150 norte y 200 este del Hospital de San Carlos, Ciudad Quesada, San Carlos, Alajuela
   - Teléfono: (506) 2460-0055 / 2460-1412
   - Correo: acahn.info@sinac.go.cr
   - Google Maps URL: https://www.google.com/maps/search/150+norte+200+este+Hospital+San+Carlos+Ciudad+Quesada+Alajuela+Costa+Rica

2. ÁREA DE CONSERVACIÓN ARENAL TEMPISQUE (ACAT)
   - Sede: Tilarán, Guanacaste
   - Dirección: De las instalaciones de la Fuerza Pública 275 metros al Sur, contiguo a la Estación de Bomberos, edificio blanco esquinero, Tilarán, Guanacaste
   - Teléfono: (506) 2695-5180
   - Google Maps URL: https://www.google.com/maps/search/Fuerza+Publica+Tilaran+Guanacaste+Costa+Rica+SINAC+ACAT

3. ÁREA DE CONSERVACIÓN GUANACASTE (ACG)
   - Sede: Liberia, Guanacaste
   - Dirección: Sub-región Liberia, Guanacaste
   - Teléfono: (506) 2666-0630
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Guanacaste+Liberia+Costa+Rica
   - Nota: Patrimonio Natural de la Humanidad UNESCO (1999)

4. ÁREA DE CONSERVACIÓN TEMPISQUE (ACT)
   - Sede: Nicoya, Guanacaste
   - Dirección: Oficina Regional, Nicoya, Guanacaste
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Tempisque+Nicoya+Guanacaste+Costa+Rica

5. ÁREA DE CONSERVACIÓN CARIBE (ACLAC)
   - Sede: Guápiles / Limón
   - Dirección: Oficina Regional, zona del Caribe costarricense
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Caribe+Guapiles+Limon+Costa+Rica

6. ÁREA DE CONSERVACIÓN CENTRAL (ACC)
   - Sede: San Miguel de Santo Domingo, Heredia
   - Dirección: Del segundo cruce de San Miguel de Santo Domingo de Heredia 450 metros al noreste, sobre la carretera Braulio Carrillo
   - Teléfono: (506) 2268-8091 / 2268-8087
   - Correo: acc.info@sinac.go.cr
   - Google Maps URL: https://www.google.com/maps/search/San+Miguel+Santo+Domingo+Heredia+carretera+Braulio+Carrillo+SINAC+Costa+Rica

7. ÁREA DE CONSERVACIÓN LA AMISTAD CARIBE (ACLAC)
   - Sede: Turrialba, Cartago
   - Dirección: Oficina Regional, Turrialba, Cartago
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+La+Amistad+Caribe+Turrialba+Costa+Rica

8. ÁREA DE CONSERVACIÓN LA AMISTAD PACÍFICO (ACLAP)
   - Sede: San Isidro del General, Pérez Zeledón
   - Dirección: Oficina Regional, San Isidro del General, Puntarenas
   - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+La+Amistad+Pacifico+San+Isidro+General+Costa+Rica

9. ÁREA DE CONSERVACIÓN OSA (ACOSA)
   - Sede: Golfito, Puntarenas
   - Dirección: 800 metros norte de la pista de aterrizaje de Golfito, Antiguo Naranjal, Golfito, Puntarenas
   - Teléfono: (506) 2775-1210
   - Correo: acosa.info@sinac.go.cr
   - Google Maps URL: https://www.google.com/maps/search/SINAC+ACOSA+800+norte+pista+aterrizaje+Golfito+Costa+Rica

10. ÁREA DE CONSERVACIÓN PACÍFICO CENTRAL (ACOPAC)
    - Sede: Quepos, Puntarenas
    - Dirección: Oficina Regional, Quepos, Puntarenas
    - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Pacifico+Central+Quepos+Costa+Rica

11. ÁREA DE CONSERVACIÓN MARINA COCOS (ACMC)
    - Sede: San José (Oficina Administrativa)
    - Teléfono: (506) 2291-1215 / 2291-1216
    - Correo: acmc.info@sinac.go.cr
    - Google Maps URL: https://www.google.com/maps/search/SINAC+Area+Conservacion+Marina+Cocos+San+Jose+Costa+Rica
    - Nota: Área completamente marina. Administra la Isla del Coco, Patrimonio Natural de la Humanidad UNESCO.

# DESIGN & LAYOUT REQUIREMENTS:
- Typography: Use clean, highly readable Sans-serif fonts with clear visual hierarchies for Titles, Subtitles, and Body texts.
- Layout System: Apply absolute pixel precision with Auto-Layout, proper gaps (e.g., 16px, 24px) for cards, and ensure high contrast.