import heroEditorialLibrary from '../assets/images/hero_editorial_library_1794560044669.jpg';
import coverNocturnoMadrid from '../assets/images/cover_nocturno_madrid_1794560043881.jpg';
import coverCahiersSeine from '../assets/images/cover_cahiers_seine_1794560045562.jpg';
import coverCartografiaSilencio from '../assets/images/cover_cartografia_silencio_1794560044986.jpg';
import coverArquitecturaLuz from '../assets/images/cover_arquitectura_luz_1794560044727.jpg';
import { BookItem } from '../types';

export const HERO_IMAGE = heroEditorialLibrary;

export const INITIAL_BOOKS: BookItem[] = [
  {
    id: 'nocturno-madrid',
    title: {
      es: 'Nocturno de la Imprenta',
      fr: 'Nocturne de l’Imprimerie',
    },
    subtitle: {
      es: 'Crónica de un taller tipográfico en el Madrid de 1962',
      fr: 'Chronique d’un atelier typographique dans le Madrid de 1962',
    },
    author: 'Mateo Salvatierra',
    category: 'fiction',
    editionLang: 'es',
    price: 18,
    pages: 248,
    year: 2026,
    isbn: '978-84-94821-01-4',
    binding: {
      es: 'Edición digital cosida · Pliego 1',
      fr: 'Édition numérique reliée · Cahier 1',
    },
    synopsis: {
      es: 'Cuando las prensas se detienen a medianoche, un joven cajista descubre en los plomos olvidados una correspondencia clandestina capaz de reescribir la historia cultural de la ciudad.',
      fr: 'Lorsque les presses s’arrêtent à minuit, un jeune compositeur découvre dans les plombs oubliés une correspondance clandestine capable de réécrire l’histoire culturelle de la ville.',
    },
    coverImage: coverNocturnoMadrid,
    coverStyle: 'obsidian-gold',
    chapters: [
      {
        id: 'ch-1',
        title: {
          es: 'I. El olor del plomo tibio',
          fr: 'I. L’odeur du plomb tiède',
        },
        paragraphs: {
          es: [
            'A las once y media de la noche la calle de la Madera quedaba reducida al chasquido intermitente de los tranvías lejanos y al zumbido grave de la Minerva. Don Anselmo apagaba siempre la lámpara del escaparate antes de guardar las galeradas bajo llave.',
            'En la mesa de composición, los tipos móviles descansaban como pequeños soldados de antimonio y estaño. Cada letra invertida exigía una lectura paciente al revés, un pacto silencioso entre los dedos manchados de tinta y la memoria.',
            'Aquella noche encontré entre los lingotes de reserva una caja de madera sin etiquetar. Dentro no había versales Bodoni ni filetes de latón, sino dieciséis cuartillas envueltas en papel de seda ámbar.',
          ],
          fr: [
            'À onze heures et demie du soir, la rue de la Madera se réduisait au claquement intermittent des tramways lointains et au bourdonnement grave de la presse. Don Anselmo éteignait toujours la lampe de la vitrine avant d’enfermer les épreuves à double tour.',
            'Sur le marbre de composition, les caractères mobiles reposaient tels de petits soldats d’antimoine et d’étain. Chaque lettre inversée exigeait une lecture patiente à l’envers, un pacte silencieux entre les doigts tachés d’encre et la mémoire.',
            'Cette nuit-là, je trouvai parmi les lingots de réserve une boîte en bois sans étiquette. À l’intérieur, point de capitales Bodoni ni de filets en laiton, mais seize feuillets enveloppés dans du papier de soie ambré.',
          ],
        },
      },
      {
        id: 'ch-2',
        title: {
          es: 'II. Cartas en papel verjurado',
          fr: 'II. Lettres sur papier vergé',
        },
        paragraphs: {
          es: [
            'La primera hoja estaba fechada en noviembre y carecía de firma. La caligrafía, firme y ligeramente inclinada hacia la derecha, detallaba los nombres de tres librerías entre Lavapiés y París donde los paquetes llegaban sin remitente.',
            'Comprendí entonces por qué las cajas de papel verjurado que descargábamos los martes pesaban más de lo habitual y por qué el maestro tipógrafo insistía en revisar personalmente los márgenes de cada colofón.',
          ],
          fr: [
            'La première feuille était datée de novembre et ne portait aucune signature. La calligraphie, ferme et légèrement inclinée vers la droite, énumérait les noms de trois librairies entre Madrid et Paris où les colis parvenaient sans expéditeur.',
            'Je compris alors pourquoi les caisses de papier vergé que nous déchargions le mardi pesaient plus lourd que d’ordinaire, et pourquoi le maître typographe tenait à vérifier lui-même les marges de chaque colophon.',
          ],
        },
      },
      {
        id: 'ch-3',
        title: {
          es: 'III. La prueba de imprenta',
          fr: 'III. L’épreuve d’atelier',
        },
        paragraphs: {
          es: [
            'Antes del alba imprimí un único pliego de prueba. La tinta negra mordió la fibra del algodón con una nitidez casi solemne, revelando que el verdadero oficio del libro no consiste en conservar el pasado, sino en darle voz cuando todos duermen.',
          ],
          fr: [
            'Avant l’aube, j’imprimai une unique feuille d’essai. L’encre noire mordit la fibre du coton avec une netteté presque solennelle, révélant que le véritable métier du livre ne consiste pas à figer le passé, mais à lui rendre sa voix lorsque tout s’endort.',
          ],
        },
      },
    ],
  },
  {
    id: 'cahiers-seine',
    title: {
      es: 'Cuadernos de la Orilla Izquierda',
      fr: 'Cahiers de la Rive Gauche',
    },
    subtitle: {
      es: 'Ensayos breves sobre cafés, librerías y lentitud urbana',
      fr: 'Brefs essais sur les cafés, les librairies et la lenteur urbaine',
    },
    author: 'Claire Moreau-Delacroix',
    category: 'essay',
    editionLang: 'fr',
    price: 16,
    pages: 192,
    year: 2026,
    isbn: '978-2-957410-12-8',
    binding: {
      es: 'Ensayo · Edición París',
      fr: 'Essai · Édition Paris',
    },
    synopsis: {
      es: 'Un recorrido íntimo por el arte de leer en voz baja frente al Sena, reflexionando sobre el tiempo lento, las bibliotecas personales y la arquitectura emocional de la página.',
      fr: 'Une traversée intime de l’art de lire à mi-voix face à la Seine, méditant sur le temps long, les bibliothèques personnelles et l’architecture sensible de la page.',
    },
    coverImage: coverCahiersSeine,
    coverStyle: 'parchment-indigo',
    chapters: [
      {
        id: 'ch-1',
        title: {
          es: 'I. La geometría de una mesa de mármol',
          fr: 'I. Géométrie d’une table de bistrot',
        },
        paragraphs: {
          es: [
            'Leer en un café no es aislarse del mundo; es elegir una distancia justa entre el murmullo ajeno y la cadencia de una frase. A las nueve de la mañana, la luz del invierno parisino entra oblicua y convierte la página en una pequeña isla de claridad.',
            'Quien anota al margen con lápiz blando sabe que el libro no termina en la última línea: continúa en las conversaciones que suscita y en los regresos inesperados años después.',
          ],
          fr: [
            'Lire dans un café n’est pas s’isoler du monde ; c’est choisir la juste distance entre la rumeur extérieure et la cadence d’une phrase. À neuf heures du matin, la lumière d’hiver entre de biais et transforme la page en un îlot de clarté.',
            'Celui qui annote en marge au crayon tendre sait que le livre ne s’achève jamais à la dernière ligne : il se prolonge dans les dialogues qu’il suscite et dans les retours inattendus des années plus tard.',
          ],
        },
      },
      {
        id: 'ch-2',
        title: {
          es: 'II. Elogio de la estantería incompleta',
          fr: 'II. Éloge de l’étagère inachevée',
        },
        paragraphs: {
          es: [
            'Toda biblioteca viva conserva huecos: espacios destinados a volúmenes que aún no conocemos o que prestamos sin esperar recibo. La obsesión por completar colecciones cierra el paso al azar, que es el mejor bibliotecario.',
          ],
          fr: [
            'Toute bibliothèque vivante préserve des vides : des espaces promis aux volumes encore inconnus ou prêtés sans reconnaissance de dette. L’obsession de tout classer ferme la porte au hasard, qui demeure le meilleur des bibliothécaires.',
          ],
        },
      },
    ],
  },
  {
    id: 'cartografia-silencio',
    title: {
      es: 'Cartografía del Silencio',
      fr: 'Cartographie du Silence',
    },
    subtitle: {
      es: 'Poemas escritos al borde del invierno atlántico',
      fr: 'Poèmes écrits au bord de l’hiver atlantique',
    },
    author: 'Inés Valcárcel',
    category: 'poetry',
    editionLang: 'es',
    price: 14,
    pages: 128,
    year: 2025,
    isbn: '978-84-94821-09-0',
    binding: {
      es: 'Poesía bilingüe · Edición vitela',
      fr: 'Poésie bilingue · Édition vélin',
    },
    synopsis: {
      es: 'Treinta y cuatro poemas breves sobre la bruma costera, la persistencia de la luz y las palabras que sobreviven cuando cae la tarde en el norte.',
      fr: 'Trente-quatre poèmes brefs sur la brume côtière, la persistance de la lumière et les mots qui demeurent lorsque tombe le soir dans le nord.',
    },
    coverImage: coverCartografiaSilencio,
    coverStyle: 'parchment-indigo',
    chapters: [
      {
        id: 'ch-1',
        title: {
          es: 'I. Bitácora de la niebla',
          fr: 'I. Journal de la brume',
        },
        paragraphs: {
          es: [
            'Donde termina el mapa empieza la marea lenta / y el pulso de la piedra recuerda el nombre del viento.',
            'No guardes en el cofre las sílabas del alba: / déjalas secar al sol como redes recién tendidas sobre la sal.',
          ],
          fr: [
            'Là où s’achève la carte commence la marée lente / et le pouls de la pierre se souvient du nom du vent.',
            'Ne garde pas au coffre les syllabes de l’aube : / laisse-les sécher au soleil comme des filets neufs posés sur le sel.',
          ],
        },
      },
      {
        id: 'ch-2',
        title: {
          es: 'II. Estancias de cal',
          fr: 'II. Demeures de chaux',
        },
        paragraphs: {
          es: [
            'Una ventana abierta basta para medir el año: / primero el olor a lluvia, luego el peso dorado de septiembre.',
          ],
          fr: [
            'Une fenêtre ouverte suffit à mesurer l’année : / d’abord l’odeur de pluie, puis le poids doré de septembre.',
          ],
        },
      },
    ],
  },
  {
    id: 'arquitectura-luz',
    title: {
      es: 'Tratado de la Luz Oblicua',
      fr: 'Traité de la Lumière Oblique',
    },
    subtitle: {
      es: 'Horizonte, hormigón y silencio en la arquitectura moderna',
      fr: 'Horizon, béton et silence dans l’architecture moderne',
    },
    author: 'Henrik Soler & Luc Delvaux',
    category: 'architecture',
    editionLang: 'fr',
    price: 24,
    pages: 312,
    year: 2026,
    isbn: '978-2-957410-28-9',
    binding: {
      es: 'Monografía ilustrada · Edición especial',
      fr: 'Monographie · Édition spéciale',
    },
    synopsis: {
      es: 'Un estudio riguroso sobre cómo los grandes maestros del siglo XX esculpieron el vacío mediante aberturas precisas que transforman la piedra en un reloj solar habitable.',
      fr: 'Une étude rigoureuse sur la manière dont les grands maîtres du XXe siècle ont sculpté le vide par des percées précises transformant la pierre en cadran solaire habitable.',
    },
    coverImage: coverArquitecturaLuz,
    coverStyle: 'obsidian-gold',
    chapters: [
      {
        id: 'ch-1',
        title: {
          es: 'I. El umbral como instrumento óptico',
          fr: 'I. Le seuil comme instrument optique',
        },
        paragraphs: {
          es: [
            'Antes de ser refugio térmico, un muro es una frontera entre dos intensidades luminosas. Cuando un arquitecto recorta una rendija vertical en el hormigón visto, no introduce aire: introduce tiempo medible sobre el suelo.',
            'En las obras más sobrias, la materia desaparece al mediodía para reaparecer a las cinco de la tarde convertida en diagonal cálida.',
          ],
          fr: [
            'Avant d’être un abri thermique, un mur est une frontière entre deux intensités lumineuses. Lorsqu’un architecte découpe une fente verticale dans le béton brut, il n’introduit pas seulement de l’air : il inscrit un temps mesurable sur le sol.',
            'Dans les œuvres les plus sobres, la matière s’efface à midi pour reparaître à cinq heures sous la forme d’une diagonale chaleureuse.',
          ],
        },
      },
      {
        id: 'ch-2',
        title: {
          es: 'II. Acústica de la piedra desnuda',
          fr: 'II. Acoustique de la pierre nue',
        },
        paragraphs: {
          es: [
            'La proporción de una sala se percibe primero con el oído. Un paso firme bajo una bóveda bien trazada devuelve la medida exacta del espacio sin necesidad de encender ninguna lámpara.',
          ],
          fr: [
            'La proportion d’une salle se perçoit d’abord à l’oreille. Un pas assuré sous une voûte justement tracée restitue la mesure exacte du lieu sans qu’il soit besoin d’allumer la moindre lampe.',
          ],
        },
      },
    ],
  },
  {
    id: 'anatomia-margen',
    title: {
      es: 'Anatomía del Margen',
      fr: 'Anatomie de la Marge',
    },
    subtitle: {
      es: 'Manual práctico sobre proporción áurea y diseño editorial',
      fr: 'Manuel pratique sur le nombre d’or et le design éditorial',
    },
    author: 'Álvaro Menéndez',
    category: 'essay',
    editionLang: 'es',
    price: 19,
    pages: 214,
    year: 2025,
    isbn: '978-84-94821-15-1',
    binding: {
      es: 'Manual tipográfico · Lino burdeos',
      fr: 'Manuel typographique · Lin bordeaux',
    },
    synopsis: {
      es: 'Desde los cánones de Van de Graaf hasta las retículas digitales contemporáneas: una guía clara y aplicable para diseñadores, editores y autores que maquetan sus propios libros.',
      fr: 'Des canons de Van de Graaf aux grilles numériques contemporaines : un guide clair et concret pour les designers, éditeurs et auteurs qui mettent en page leurs propres livres.',
    },
    coverStyle: 'crimson-linen',
    chapters: [
      {
        id: 'ch-1',
        title: {
          es: 'I. Por qué respira una página',
          fr: 'I. Pourquoi une page respire',
        },
        paragraphs: {
          es: [
            'El margen nunca es espacio desperdiciado: es el lugar donde descansan los pulgares y donde la vista toma impulso antes de iniciar la línea siguiente.',
            'Una caja tipográfica de sesenta y cinco caracteres permite que el ojo realice cada salto de línea con naturalidad, evitando la fatiga incluso tras dos horas de lectura continua.',
          ],
          fr: [
            'La marge n’est jamais un espace perdu : c’est le lieu où reposent les pouces et où le regard prend son élan avant d’aborder la ligne suivante.',
            'Une justification de soixante-cinq signes permet à l’œil d’enchaîner chaque retour à la ligne avec aisance, évitant toute fatigue même après deux heures de lecture continue.',
          ],
        },
      },
      {
        id: 'ch-2',
        title: {
          es: 'II. El ritmo de los capítulos',
          fr: 'II. Le rythme des chapitres',
        },
        paragraphs: {
          es: [
            'Iniciar cada capítulo con una caída generosa ofrece al lector una pausa silenciosa entre escenas. En la edición digital, conservar ese aire equivale a abrir una puerta sin prisa.',
          ],
          fr: [
            'Amorcer chaque chapitre par un blanc généreux offre au lecteur une pause silencieuse entre deux scènes. Dans l’édition numérique, préserver cette respiration revient à ouvrir une porte sans hâte.',
          ],
        },
      },
    ],
  },
  {
    id: 'chroniques-horloger',
    title: {
      es: 'Crónicas del Relojero de Lyon',
      fr: 'Chroniques de l’Horloger de Lyon',
    },
    subtitle: {
      es: 'Relatos breves sobre engranajes, memoria y precisión',
      fr: 'Nouvelles sur les engrenages, la mémoire et la précision',
    },
    author: 'Étienne Vasseur',
    category: 'fiction',
    editionLang: 'fr',
    price: 15,
    pages: 176,
    year: 2026,
    isbn: '978-2-957410-33-3',
    binding: {
      es: 'Relatos · Edición París-Lyon',
      fr: 'Nouvelles · Édition Paris-Lyon',
    },
    synopsis: {
      es: 'Siete relatos entrelazados en torno a un taller de relojería donde cada cliente entrega, junto a un mecanismo averiado, una historia que parecía detenida en el tiempo.',
      fr: 'Sept nouvelles entrelacées autour d’un atelier d’horlogerie où chaque client confie, avec un mécanisme arrêté, une histoire qu’il croyait figée dans le temps.',
    },
    coverStyle: 'obsidian-gold',
    chapters: [
      {
        id: 'ch-1',
        title: {
          es: 'I. El péndulo de la rue Mercière',
          fr: 'I. Le balancier de la rue Mercière',
        },
        paragraphs: {
          es: [
            'Ningún reloj se detiene por capricho; suele hacerlo cuando una gota de aceite envejece o cuando alguien olvida darle cuerda el mismo domingo en que cambia de ciudad.',
            'Sobre el tapete verde de mi mesa, los rubíes diminutos brillaban como brasas mínimas bajo la lupa de latón.',
          ],
          fr: [
            'Aucune montre ne s’arrête par caprice ; elle cède le plus souvent lorsqu’une goutte d’huile vieillit ou quand quelqu’un oublie de la remonter le dimanche même d’un départ.',
            'Sur le tapis vert de mon établi, les minuscules rubis luisaient comme de fines braises sous la loupe de laiton.',
          ],
        },
      },
      {
        id: 'ch-2',
        title: {
          es: 'II. Inventario de horas perdidas',
          fr: 'II. Inventaire des heures perdues',
        },
        paragraphs: {
          es: [
            'Al devolver cada reloj reparado anotaba en mi libreta negra la hora exacta en que volvía a latir, convencido de que medir el tiempo es una forma discreta de cuidarlo.',
          ],
          fr: [
            'En rendant chaque garde-temps réparé, je consignais dans mon carnet noir l’heure exacte où il reprenait vie, convaincu que mesurer le temps est une manière discrète d’en prendre soin.',
          ],
        },
      },
    ],
  },
];

export const SAMPLE_MANUSCRIPTS = {
  es: `# El Jardín de las Letras Perdidas

## Capítulo 1. La llegada a la biblioteca
Cuando el tren nocturno cruzó el viaducto de piedra, la niebla cubría ya los tejados de pizarra. Llevaba en la maleta tres cuadernos sin numerar y una pluma cargada con tinta sepia.

La puerta de roble cedió sin ruido. En el centro de la sala, bajo una lámpara de latón, descansaba un manuscrito abierto esperando la última revisión antes de entrar en prensa.

## Capítulo 2. Notas sobre el oficio
Editar un texto consiste en escuchar su cadencia interna. A veces basta suprimir un adjetivo innecesario para que toda la escena recupere su claridad original.

Cada capítulo que añadas con el símbolo # o ## aparecerá automáticamente en el índice del lector digital.`,
  fr: `# Le Jardin des Lettres Retrouvées

## Chapitre 1. L’arrivée à la bibliothèque
Lorsque le train de nuit franchit le viaduc de pierre, la brume couvrait déjà les toits d’ardoise. Je portais dans ma valise trois cahiers non numérotés et un stylo-plume chargé d’encre sépia.

La porte de chêne s’ouvrit sans un bruit. Au centre de la salle, sous une lampe en laiton, reposait un manuscrit ouvert attendant sa dernière relecture avant la mise sous presse.

## Chapitre 2. Notes sur le métier
Éditer un texte, c’est écouter sa cadence intérieure. Il suffit parfois de retrancher un adjectif superflu pour que toute la scène retrouve sa clarté originelle.

Chaque titre précédé de # ou ## crée automatiquement un chapitre dans le lecteur numérique.`,
};
