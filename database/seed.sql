-- Insertar Áreas de Conservación de Costa Rica
INSERT OR IGNORE INTO areas_conservacion (id, slug, abreviatura, nombre_es, nombre_en, descripcion_es, descripcion_en, headquarters, direccion, telefono, email, map_url, hero_image, hectareas, parques_count, visitantes_anuales) VALUES
('acg', 'acg', 'ACG', 'Área de Conservación Guanacaste', 'Guanacaste Conservation Area', 
 'Ubicada en el noroeste de Costa Rica. Protege bosques secos, nubosos y marinos, Patrimonio de la Humanidad UNESCO.',
 'Located in northwestern Costa Rica. Protects dry, cloud, and marine forests, a UNESCO World Heritage site.',
 'Estación Biológica Santa Rosa, Liberia, Guanacaste', 'Liberia, Guanacaste, Costa Rica', '+506 2666-5051', 'acg@sinac.go.cr', 
 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?auto=format&fit=crop&w=1080&q=80',
 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?auto=format&fit=crop&w=1920&q=80',
 '163,000 ha', 4, '45K/año'),

('accn', 'accn', 'ACCN', 'Área de Conservación Arenal Huetar Norte', 'Arenal Huetar Norte Conservation Area', 
 'Comprende la región norte de Costa Rica, albergando el Refugio de Vida Silvestre Caño Negro y el Volcán Arenal.',
 'Encompasses the northern region of Costa Rica, home to the Caño Negro Wildlife Refuge and Arenal Volcano.',
 'Ciudad Quesada, San Carlos, Alajuela', 'Barrio El Carmen, Ciudad Quesada, Alajuela', '+506 2460-1412', 'accn@sinac.go.cr',
 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?auto=format&fit=crop&w=1080&q=80',
 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?auto=format&fit=crop&w=1920&q=80',
 '505,630 ha', 6, '180K/año'),

('acot', 'acot', 'ACOT', 'Área de Conservación Tempisque', 'Tempisque Conservation Area', 
 'Protege la cuenca del Río Tempisque, la Península de Nicoya y humedales de importancia internacional.',
 'Protects the Tempisque River basin, the Nicoya Peninsula and wetlands of international importance.',
 'Nicoya, Guanacaste', 'Nicoya centro, Guanacaste', '+506 2685-5667', 'acot@sinac.go.cr',
 'https://images.unsplash.com/photo-1610486810243-7053e1a8fa19?auto=format&fit=crop&w=1080&q=80',
 'https://images.unsplash.com/photo-1610486810243-7053e1a8fa19?auto=format&fit=crop&w=1920&q=80',
 '145,000 ha', 5, '60K/año'),

('acmc', 'acmc', 'ACMC', 'Área de Conservación Marina Cocos', 'Cocos Island Marine Conservation Area', 
 'Administra la mítica Isla del Coco, Patrimonio Mundial UNESCO y meca del buceo internacional.',
 'Manages the legendary Cocos Island, UNESCO World Heritage Site and world-renowned diving haven.',
 'Puntarenas, Costa Rica', 'Golfito / Puntarenas', '+506 2258-7181', 'acmc@sinac.go.cr',
 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?auto=format&fit=crop&w=1080&q=80',
 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?auto=format&fit=crop&w=1920&q=80',
 '1,997,000 ha', 2, '3K/año');

-- Insertar Parques Nacionales
INSERT OR IGNORE INTO parques_nacionales (id, area_conservacion_id, slug, nombre_es, nombre_en, descripcion_es, descripcion_en, imagen_url, tarifa_nacional, tarifa_extranjero, horario) VALUES
('pn-volcan-tenorio', 'accn', 'pn-volcan-tenorio', 'Parque Nacional Volcán Tenorio (Río Celeste)', 'Volcán Tenorio National Park (Río Celeste)',
 'Famoso por las mágicas aguas turquesas del Río Celeste, la catarata y sus senderos en bosque nuboso.',
 'Famous for the magical turquoise waters of Río Celeste, impressive waterfall, and cloud forest trails.',
 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
 900.00, 12.00, '8:00 AM - 2:00 PM'),

('pn-cano-negro', 'accn', 'pn-cano-negro', 'Refugio Nacional de Vida Silvestre Caño Negro', 'Caño Negro National Wildlife Refuge',
 'Un humedal de importancia RAMSAR clave para aves migratorias, pesca deportiva de sábalo y tours en bote.',
 'A RAMSAR wetland of international importance crucial for migratory birds, fishing, and boat tours.',
 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
 800.00, 10.00, '6:00 AM - 4:00 PM'),

('pn-manuel-antonio', 'acot', 'pn-manuel-antonio', 'Parque Nacional Manuel Antonio', 'Manuel Antonio National Park',
 'Famoso por sus hermosas playas caribeñas/pacíficas y abundante vida silvestre como perezosos y monos.',
 'Famous for beautiful beaches and abundant wildlife including sloths and monkeys.',
 'https://images.unsplash.com/photo-1610486810243-7053e1a8fa19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
 1800.00, 18.00, '7:00 AM - 4:00 PM'),

('pn-volcan-arenal', 'accn', 'pn-volcan-arenal', 'Parque Nacional Volcán Arenal', 'Arenal Volcano National Park',
 'Hogar del majestuoso Volcán Arenal y campos de lava de erupciones pasadas.',
 'Home to the imposing Arenal Volcano surrounded by lush tropical rainforest.',
 'https://images.unsplash.com/photo-1592593210599-492c25d93ef9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80',
 1000.00, 15.00, '8:00 AM - 4:00 PM');

-- Insertar Servicios
INSERT OR IGNORE INTO servicios (id, nombre_es, nombre_en, icono) VALUES
(1, 'Acepta pago con Tarjeta', 'Accepts Credit Cards', 'CreditCard'),
(2, 'Agua Potable', 'Drinking Water', 'Droplet'),
(3, 'Estacionamiento', 'Parking', 'Car'),
(4, 'Servicios Sanitarios', 'Restrooms', 'Users'),
(5, 'Sendero Accesible', 'Accessible Trail', 'Footprints'),
(6, 'Centro de Información', 'Information Center', 'Info'),
(7, 'Área para acampar', 'Camping Area', 'Tent'),
(8, 'Guía Naturalista', 'Naturalist Guide', 'Compass');

-- Insertar Atractivos
INSERT OR IGNORE INTO atractivos (id, nombre_es, nombre_en, icono) VALUES
(1, 'Aguas Termales', 'Hot Springs', 'Flame'),
(2, 'Mirador', 'Viewpoint', 'Eye'),
(3, 'Avistamientos', 'Wildlife Sighting', 'Binoculars'),
(4, 'Cataratas', 'Waterfall', 'Waves'),
(5, 'Ríos', 'Rivers', 'Droplets'),
(6, 'Canales', 'Canals', 'Anchor');

-- Insertar Usuario Administrador inicial
INSERT OR IGNORE INTO usuarios (id, nombre, email, password_hash, rol, area_conservacion_id) VALUES
(1, 'Admin SINAC Caño Negro', 'admin.cano-negro@sinac.go.cr', '$2b$10$e8T73nK...dummyhash', 'SuperAdmin', 'accn');

-- Insertar Noticias iniciales
INSERT OR IGNORE INTO noticias (id, titulo_es, titulo_en, resumen_es, resumen_en, contenido_es, contenido_en, imagen_url, fecha_publicacion, categoria) VALUES
(1, 'Nuevas regulaciones de visitación en Caño Negro', 'New visitation regulations in Caño Negro',
 'SINAC anuncia mejoras en los horarios y reservas digitales para proteger el humedal.',
 'SINAC announces schedule improvements and digital reservations to protect the wetland.',
 'Con el objetivo de garantizar la conservación del Refugio de Vida Silvestre Caño Negro, el SINAC ha implementado el nuevo sistema de reservación en línea...',
 'In order to guarantee the conservation of Caño Negro Wildlife Refuge, SINAC has implemented the new online booking system...',
 'https://images.unsplash.com/photo-1580259679654-9276b39fd2d5?auto=format&fit=crop&w=1080&q=80',
 '2026-07-01', 'Conservación');
