import { CategoryKey, Locale } from '../types';

export interface UIStrings {
  brandName: string;
  nav: {
    catalog: string;
    library: string;
    studio: string;
    imprint: string;
  };
  bagButton: string;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    editionLabel: string;
    editionValue: string;
    formatsLabel: string;
    formatsValue: string;
  };
  toolbar: {
    languageLabel: string;
    themeLabel: string;
    themeDark: string;
    themeLight: string;
    searchPlaceholder: string;
    editionFilterLabel: string;
    editionAll: string;
  };
  categories: Record<CategoryKey, string>;
  catalog: {
    heading: string;
    subheading: string;
    resultsCount: string;
    emptyTitle: string;
    emptyBody: string;
    resetFilters: string;
    previewCta: string;
    readFullCta: string;
    addToBagCta: string;
    inBagCta: string;
    ownedLabel: string;
    authorPublishedLabel: string;
    pagesUnit: string;
  };
  library: {
    heading: string;
    subheading: string;
    emptyTitle: string;
    emptyBody: string;
    browseCatalog: string;
    publishWork: string;
    continueReading: string;
    downloadMd: string;
    removeCustom: string;
    chapterLabel: string;
    ofLabel: string;
  };
  studio: {
    heading: string;
    subheading: string;
    dropTitle: string;
    dropSubtitle: string;
    browseFiles: string;
    loadSampleBtn: string;
    loadedFileLabel: string;
    formTitleLabel: string;
    formTitlePlaceholder: string;
    formSubtitleLabel: string;
    formSubtitlePlaceholder: string;
    formAuthorLabel: string;
    formAuthorPlaceholder: string;
    formCategoryLabel: string;
    formEditionLangLabel: string;
    formPriceLabel: string;
    formCoverLabel: string;
    coverOptions: {
      obsidianGold: string;
      parchmentIndigo: string;
      crimsonLinen: string;
    };
    formSynopsisLabel: string;
    formSynopsisPlaceholder: string;
    formContentLabel: string;
    formContentHint: string;
    detectedChapters: string;
    previewDraftBtn: string;
    publishBtn: string;
    clearBtn: string;
    validationTitle: string;
    validationAuthor: string;
    publishedSuccess: string;
    binaryFileNote: string;
  };
  imprint: {
    heading: string;
    body: string;
    pillars: Array<{
      index: string;
      title: string;
      text: string;
    }>;
  };
  reader: {
    sampleBadge: string;
    fullAccessBadge: string;
    chaptersTitle: string;
    fontSizeLabel: string;
    paperThemeLabel: string;
    paperThemes: {
      obsidian: string;
      sepia: string;
      alabaster: string;
    };
    lockedNotice: string;
    unlockCta: string;
    downloadBtn: string;
    prevChapter: string;
    nextChapter: string;
    closeBtn: string;
    metadataIsbn: string;
    metadataBinding: string;
    metadataEdition: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyBody: string;
    exploreBtn: string;
    removeItem: string;
    subtotal: string;
    digitalDelivery: string;
    freeLabel: string;
    total: string;
    customerNameLabel: string;
    customerNamePlaceholder: string;
    customerEmailLabel: string;
    customerEmailPlaceholder: string;
    checkoutBtn: string;
    receiptTitle: string;
    receiptSubtitle: string;
    receiptOrderNo: string;
    receiptUnlocked: string;
    openLibraryBtn: string;
    closeBtn: string;
  };
  toast: {
    addedToBag: string;
    orderComplete: string;
    manuscriptPublished: string;
    manuscriptRemoved: string;
    sampleLoaded: string;
  };
  footer: {
    tagline: string;
    cities: string;
    rights: string;
  };
}

export const TRANSLATIONS: Record<Locale, UIStrings> = {
  es: {
    brandName: 'Editorial Obsidian',
    nav: {
      catalog: 'Catálogo',
      library: 'Biblioteca',
      studio: 'Estudio',
      imprint: 'Sello',
    },
    bagButton: 'Bolsa',
    hero: {
      kicker: 'Colección Bilingüe Español · Francés',
      title: 'Ediciones digitales con alma de imprenta clásica.',
      subtitle:
        'Descubre literatura contemporánea, lee capítulos de muestra sin distracciones y publica tus propios manuscritos en cuestión de segundos.',
      primaryCta: 'Explorar catálogo',
      secondaryCta: 'Publicar manuscrito',
      editionLabel: 'Edición actual',
      editionValue: 'Otoño 2026 · Madrid & París',
      formatsLabel: 'Formatos admitidos',
      formatsValue: 'Markdown · TXT · EPUB · PDF',
    },
    toolbar: {
      languageLabel: 'Idioma',
      themeLabel: 'Papel',
      themeDark: 'Obsidiana',
      themeLight: 'Pergamino',
      searchPlaceholder: 'Buscar por título, autor o temática…',
      editionFilterLabel: 'Edición:',
      editionAll: 'Todas',
    },
    categories: {
      all: 'Todo',
      fiction: 'Ficción',
      essay: 'Ensayo',
      poetry: 'Poesía',
      architecture: 'Arquitectura',
    },
    catalog: {
      heading: 'Colección Seleccionada',
      subheading: 'Obras cuidadas tipográficamente para lectura profunda en pantalla.',
      resultsCount: 'títulos',
      emptyTitle: 'No encontramos títulos con ese filtro',
      emptyBody: 'Prueba limpiar la búsqueda o cambiar la categoría para ver todo el catálogo.',
      resetFilters: 'Restablecer filtros',
      previewCta: 'Leer muestra',
      readFullCta: 'Abrir libro',
      addToBagCta: 'Añadir',
      inBagCta: 'En bolsa',
      ownedLabel: 'En biblioteca',
      authorPublishedLabel: 'Edición de autor',
      pagesUnit: 'págs.',
    },
    library: {
      heading: 'Mi Biblioteca',
      subheading: 'Tus ediciones adquiridas y manuscritos publicados quedan disponibles al instante.',
      emptyTitle: 'Tu estantería digital está lista',
      emptyBody: 'Adquiere cualquier título del catálogo o sube tu primer manuscrito en el Estudio.',
      browseCatalog: 'Ir al catálogo',
      publishWork: 'Subir manuscrito',
      continueReading: 'Leer ahora',
      downloadMd: 'Descargar .md',
      removeCustom: 'Eliminar',
      chapterLabel: 'Capítulo',
      ofLabel: 'de',
    },
    studio: {
      heading: 'Estudio de Publicación',
      subheading:
        'Arrastra un manuscrito (.md, .txt, .epub o .pdf) o edita el texto directamente. Se convierte automáticamente en capítulos legibles.',
      dropTitle: 'Arrastra tu manuscrito aquí',
      dropSubtitle: 'Admite Markdown (.md), Texto (.txt), EPUB y PDF hasta 15 MB',
      browseFiles: 'Seleccionar archivo',
      loadSampleBtn: 'Cargar borrador de ejemplo',
      loadedFileLabel: 'Archivo cargado:',
      formTitleLabel: 'Título de la obra',
      formTitlePlaceholder: 'Ej. Cartas desde el invierno',
      formSubtitleLabel: 'Subtítulo breve',
      formSubtitlePlaceholder: 'Ej. Cuadernos de viaje y memoria',
      formAuthorLabel: 'Autor / Autora',
      formAuthorPlaceholder: 'Ej. Elena Valdés',
      formCategoryLabel: 'Colección',
      formEditionLangLabel: 'Idioma original',
      formPriceLabel: 'Precio (€)',
      formCoverLabel: 'Encuadernación de cubierta',
      coverOptions: {
        obsidianGold: 'Obsidiana y Oro',
        parchmentIndigo: 'Pergamino e Índigo',
        crimsonLinen: 'Lino Burdeos',
      },
      formSynopsisLabel: 'Sinopsis editorial',
      formSynopsisPlaceholder: 'Describe en dos o tres líneas el corazón de la obra…',
      formContentLabel: 'Texto del manuscrito (usa # o ## para separar capítulos)',
      formContentHint: 'Cada encabezado # Título crea automáticamente un capítulo en el lector.',
      detectedChapters: 'capítulos detectados',
      previewDraftBtn: 'Vista previa en lector',
      publishBtn: 'Publicar en catálogo',
      clearBtn: 'Limpiar',
      validationTitle: 'Escribe un título para publicar la obra.',
      validationAuthor: 'Indica el nombre del autor o autora.',
      publishedSuccess: 'Obra publicada en el catálogo y añadida a tu biblioteca.',
      binaryFileNote:
        'Archivo binario registrado. Añade o ajusta abajo la sinopsis y los capítulos de lectura si deseas personalizar la vista previa web.',
    },
    imprint: {
      heading: 'Oficio tipográfico en formato digital',
      body: 'Editorial Obsidian une la exigencia visual de la encuadernación artesanal europea con una herramienta ágil para lectores y autores independientes en español y francés.',
      pillars: [
        {
          index: '01',
          title: 'Lectura sin fricción',
          text: 'Tipografía Playfair Display calibrada en tres tonos de papel —Obsidiana, Sepia y Alabastro— para cuidar la vista.',
        },
        {
          index: '02',
          title: 'Edición bilingüe real',
          text: 'Cambia toda la experiencia entre español y francés al instante, conservando el idioma original de cada obra.',
        },
        {
          index: '03',
          title: 'Del borrador al catálogo',
          text: 'Sube archivos Markdown o texto plano y divídelos en capítulos listos para previsualizar, vender o descargar.',
        },
      ],
    },
    reader: {
      sampleBadge: 'Muestra gratuita',
      fullAccessBadge: 'Edición completa',
      chaptersTitle: 'Índice',
      fontSizeLabel: 'Tamaño',
      paperThemeLabel: 'Fondo',
      paperThemes: {
        obsidian: 'Obsidiana',
        sepia: 'Sepia',
        alabaster: 'Alabastro',
      },
      lockedNotice: 'Estás leyendo el capítulo de muestra. Adquiere la edición completa para desbloquear todos los capítulos y la descarga.',
      unlockCta: 'Añadir a la bolsa',
      downloadBtn: 'Descargar edición (.md)',
      prevChapter: 'Anterior',
      nextChapter: 'Siguiente',
      closeBtn: 'Cerrar lector',
      metadataIsbn: 'ISBN',
      metadataBinding: 'Edición',
      metadataEdition: 'Idioma',
    },
    cart: {
      title: 'Tu Bolsa Editorial',
      emptyTitle: 'Tu bolsa está vacía',
      emptyBody: 'Explora el catálogo y añade tus próximas lecturas para desbloquear la edición completa.',
      exploreBtn: 'Explorar títulos',
      removeItem: 'Quitar',
      subtotal: 'Subtotal',
      digitalDelivery: 'Entrega digital inmediata',
      freeLabel: 'Incluida',
      total: 'Total',
      customerNameLabel: 'Nombre completo',
      customerNamePlaceholder: 'Tu nombre para el recibo',
      customerEmailLabel: 'Correo electrónico',
      customerEmailPlaceholder: 'lector@correo.com',
      checkoutBtn: 'Confirmar pedido',
      receiptTitle: 'Pedido confirmado',
      receiptSubtitle: 'Tus libros ya están disponibles para lectura completa y descarga en Mi Biblioteca.',
      receiptOrderNo: 'N.º de orden',
      receiptUnlocked: 'Ediciones desbloqueadas',
      openLibraryBtn: 'Abrir Mi Biblioteca',
      closeBtn: 'Cerrar',
    },
    toast: {
      addedToBag: 'Añadido a tu bolsa editorial',
      orderComplete: 'Pedido confirmado. Libros añadidos a tu biblioteca.',
      manuscriptPublished: 'Manuscrito publicado en el catálogo',
      manuscriptRemoved: 'Obra eliminada de tu catálogo',
      sampleLoaded: 'Borrador de ejemplo cargado en el estudio',
    },
    footer: {
      tagline: 'Edición independiente, lectura pausada y publicación digital.',
      cities: 'Madrid · París',
      rights: '© 2026 Editorial Obsidian',
    },
  },
  fr: {
    brandName: 'Éditions Obsidienne',
    nav: {
      catalog: 'Catalogue',
      library: 'Bibliothèque',
      studio: 'Atelier',
      imprint: 'Maison',
    },
    bagButton: 'Panier',
    hero: {
      kicker: 'Collection Bilingue Espagnol · Français',
      title: 'Éditions numériques à l’âme d’imprimerie classique.',
      subtitle:
        'Découvrez la littérature contemporaine, lisez des extraits sans distraction et publiez vos propres manuscrits en quelques secondes.',
      primaryCta: 'Explorer le catalogue',
      secondaryCta: 'Publier un manuscrit',
      editionLabel: 'Édition actuelle',
      editionValue: 'Automne 2026 · Madrid & Paris',
      formatsLabel: 'Formats acceptés',
      formatsValue: 'Markdown · TXT · EPUB · PDF',
    },
    toolbar: {
      languageLabel: 'Langue',
      themeLabel: 'Papier',
      themeDark: 'Obsidienne',
      themeLight: 'Parchemin',
      searchPlaceholder: 'Rechercher par titre, auteur ou thème…',
      editionFilterLabel: 'Édition :',
      editionAll: 'Toutes',
    },
    categories: {
      all: 'Tout',
      fiction: 'Fiction',
      essay: 'Essai',
      poetry: 'Poésie',
      architecture: 'Architecture',
    },
    catalog: {
      heading: 'Collection Sélectionnée',
      subheading: 'Des ouvrages mis en page avec soin pour une lecture profonde à l’écran.',
      resultsCount: 'titres',
      emptyTitle: 'Aucun titre ne correspond à ce filtre',
      emptyBody: 'Effacez la recherche ou changez de collection pour afficher tout le catalogue.',
      resetFilters: 'Réinitialiser',
      previewCta: 'Lire l’extrait',
      readFullCta: 'Ouvrir le livre',
      addToBagCta: 'Ajouter',
      inBagCta: 'Dans le panier',
      ownedLabel: 'Dans ma bibliothèque',
      authorPublishedLabel: 'Édition d’auteur',
      pagesUnit: 'pages',
    },
    library: {
      heading: 'Ma Bibliothèque',
      subheading: 'Vos éditions acquises et manuscrits publiés sont accessibles immédiatement.',
      emptyTitle: 'Votre bibliothèque numérique est prête',
      emptyBody: 'Acquérez un titre du catalogue ou déposez votre premier manuscrit dans l’Atelier.',
      browseCatalog: 'Voir le catalogue',
      publishWork: 'Déposer un manuscrit',
      continueReading: 'Lire maintenant',
      downloadMd: 'Télécharger .md',
      removeCustom: 'Supprimer',
      chapterLabel: 'Chapitre',
      ofLabel: 'sur',
    },
    studio: {
      heading: 'Atelier de Publication',
      subheading:
        'Glissez un manuscrit (.md, .txt, .epub ou .pdf) ou saisissez votre texte directement. Les chapitres sont structurés automatiquement.',
      dropTitle: 'Déposez votre manuscrit ici',
      dropSubtitle: 'Accepte Markdown (.md), Texte (.txt), EPUB et PDF jusqu’à 15 Mo',
      browseFiles: 'Choisir un fichier',
      loadSampleBtn: 'Charger un brouillon exemple',
      loadedFileLabel: 'Fichier importé :',
      formTitleLabel: 'Titre de l’ouvrage',
      formTitlePlaceholder: 'Ex. Lettres d’un hiver calme',
      formSubtitleLabel: 'Sous-titre bref',
      formSubtitlePlaceholder: 'Ex. Carnets de voyage et de mémoire',
      formAuthorLabel: 'Auteur / Autrice',
      formAuthorPlaceholder: 'Ex. Claire Beaumont',
      formCategoryLabel: 'Collection',
      formEditionLangLabel: 'Langue originale',
      formPriceLabel: 'Prix (€)',
      formCoverLabel: 'Reliure de couverture',
      coverOptions: {
        obsidianGold: 'Obsidienne & Or',
        parchmentIndigo: 'Parchemin & Indigo',
        crimsonLinen: 'Lin Bordeaux',
      },
      formSynopsisLabel: 'Quatrième de couverture',
      formSynopsisPlaceholder: 'Présentez l’esprit du livre en deux ou trois phrases…',
      formContentLabel: 'Texte du manuscrit (utilisez # ou ## pour séparer les chapitres)',
      formContentHint: 'Chaque titre # crée automatiquement un chapitre dans le lecteur.',
      detectedChapters: 'chapitres détectés',
      previewDraftBtn: 'Aperçu dans le lecteur',
      publishBtn: 'Publier au catalogue',
      clearBtn: 'Effacer',
      validationTitle: 'Veuillez saisir un titre avant de publier.',
      validationAuthor: 'Veuillez indiquer le nom de l’auteur.',
      publishedSuccess: 'Ouvrage publié au catalogue et ajouté à votre bibliothèque.',
      binaryFileNote:
        'Fichier binaire enregistré. Complétez ou ajustez ci-dessous le résumé et les chapitres pour l’aperçu en ligne.',
    },
    imprint: {
      heading: 'L’art typographique au format numérique',
      body: 'Éditions Obsidienne réunit l’exigence de la reliure européenne et la simplicité d’un outil moderne pour les lecteurs et auteurs francophones et hispanophones.',
      pillars: [
        {
          index: '01',
          title: 'Lecture apaisée',
          text: 'Typographie Playfair Display calibrée sur trois papiers — Obsidienne, Sépia et Albâtre — pour un confort durable.',
        },
        {
          index: '02',
          title: 'Maison bilingue',
          text: 'Basculez instantanément entre le français et l’espagnol tout en préservant la langue d’origine de chaque œuvre.',
        },
        {
          index: '03',
          title: 'Du manuscrit au rayon',
          text: 'Importez vos textes Markdown et transformez-les en chapitres prêts à lire, diffuser ou télécharger.',
        },
      ],
    },
    reader: {
      sampleBadge: 'Extrait gratuit',
      fullAccessBadge: 'Édition intégrale',
      chaptersTitle: 'Sommaire',
      fontSizeLabel: 'Corps',
      paperThemeLabel: 'Papier',
      paperThemes: {
        obsidian: 'Obsidienne',
        sepia: 'Sépia',
        alabaster: 'Albâtre',
      },
      lockedNotice: 'Vous lisez l’extrait offert. Ajoutez l’ouvrage au panier pour débloquer tous les chapitres et le téléchargement.',
      unlockCta: 'Ajouter au panier',
      downloadBtn: 'Télécharger l’édition (.md)',
      prevChapter: 'Précédent',
      nextChapter: 'Suivant',
      closeBtn: 'Fermer le lecteur',
      metadataIsbn: 'ISBN',
      metadataBinding: 'Édition',
      metadataEdition: 'Langue',
    },
    cart: {
      title: 'Votre Panier Éditorial',
      emptyTitle: 'Votre panier est vide',
      emptyBody: 'Parcourez le catalogue et sélectionnez vos prochaines lectures pour accéder aux éditions intégrales.',
      exploreBtn: 'Voir le catalogue',
      removeItem: 'Retirer',
      subtotal: 'Sous-total',
      digitalDelivery: 'Livraison numérique immédiate',
      freeLabel: 'Incluse',
      total: 'Total',
      customerNameLabel: 'Nom complet',
      customerNamePlaceholder: 'Votre nom pour le reçu',
      customerEmailLabel: 'Adresse e-mail',
      customerEmailPlaceholder: 'lecteur@exemple.fr',
      checkoutBtn: 'Valider la commande',
      receiptTitle: 'Commande confirmée',
      receiptSubtitle: 'Vos livres sont dès à présent disponibles en lecture intégrale dans Ma Bibliothèque.',
      receiptOrderNo: 'N° de commande',
      receiptUnlocked: 'Éditions débloquées',
      openLibraryBtn: 'Ouvrir Ma Bibliothèque',
      closeBtn: 'Fermer',
    },
    toast: {
      addedToBag: 'Ajouté à votre panier éditorial',
      orderComplete: 'Commande validée. Livres ajoutés à votre bibliothèque.',
      manuscriptPublished: 'Manuscrit publié au catalogue',
      manuscriptRemoved: 'Ouvrage retiré de votre catalogue',
      sampleLoaded: 'Brouillon exemple chargé dans l’atelier',
    },
    footer: {
      tagline: 'Édition indépendante, lecture attentive et publication numérique.',
      cities: 'Madrid · Paris',
      rights: '© 2026 Éditions Obsidienne',
    },
  },
};
