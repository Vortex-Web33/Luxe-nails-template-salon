/**
 * ════════════════════════════════════════════════════════════════════════
 *  CONFIGURACIÓN CENTRAL — LUXE NAIL STUDIO
 * ════════════════════════════════════════════════════════════════════════
 *  Este es el ÚNICO archivo que debes editar al clonar el template.
 *  Todo el sitio (SEO, sitemap, robots, llms.txt, JSON-LD, secciones)
 *  se genera a partir de los dos objetos exportados: SITE y CONTENT.
 * ════════════════════════════════════════════════════════════════════════
 */

// ───────────────────── Tipos ─────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: 'zap' | 'shield' | 'gauge' | 'sparkles' | 'globe' | 'heart';
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface SiteConfig {
  /** Nombre corto de la marca — aparece en header, title y OG. */
  name: string;
  /** Razón social — footer y Schema.org. */
  legalName: string;
  /** Frase corta junto al nombre. */
  tagline: string;
  /** Dominio de producción SIN barra final. Ej: https://midominio.com */
  url: string;
  /** Descripción SEO (~155 caracteres). */
  description: string;
  /** Idioma principal del <html lang>. Ej: es, en, fr */
  locale: string;
  /** Locale completo para Open Graph. Ej: es-ES, en-US */
  localeRegion: string;
  /** Color de la barra del navegador móvil. Ej: #4f46e5 */
  themeColor: string;
  /** Palabras clave SEO. */
  keywords: string[];
  /** Ruta de la imagen OG/Twitter (en public/). */
  ogImage: string;
  /** Usuario de X/Twitter, con @. Deja vacío si no aplica. */
  twitterHandle: string;
  contact: {
    email: string;
    phone: string;
    address: string;
    hours: string;
  };
  social: { name: string; url: string }[];
  nav: NavItem[];
}

// ───────────────────── SITE ─────────────────────

export const SITE: SiteConfig = {
  name: 'LUXE NAIL STUDIO',
  legalName: 'Luxe Nail Studio S.L.',
  tagline: 'Elegancia al alcance de tus manos',
  url: 'https://luxenailstudio.com',
  description:
    'Salón de uñas de lujo en Madrid. Manicura, pedicura, gel y nail art con productos premium en un oasis de bienestar y elegancia.',
  locale: 'es',
  localeRegion: 'es-ES',
  themeColor: '#d48a8a',
  keywords: [
    'manicura Madrid',
    'uñas gel',
    'nail art',
    'pedicura spa',
    'salón uñas lujo',
    'Luxe Nail Studio',
  ],
  ogImage: '/og.svg',
  twitterHandle: '',
  contact: {
    email: 'hola@luxenailstudio.com',
    phone: '+34 910 123 456',
    address: 'Calle Serrano 42, 28001 Madrid, España',
    hours: 'Lun–Sáb, 10:00–20:00',
  },
  social: [
    { name: 'Instagram', url: 'https://instagram.com/luxenailstudio' },
    { name: 'Facebook', url: 'https://facebook.com/luxenailstudio' },
  ],
  nav: [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Reservar', href: '#contacto' },
  ],
};

// ───────────────────── CONTENT ─────────────────────

export interface PageContent {
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: Stat[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Feature[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    highlights: string[];
    stats: Stat[];
  };
  services: Service[];
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    action: { label: string; href: string };
  };
}

export const CONTENT: PageContent = {
  hero: {
    eyebrow: 'Elegancia al alcance de tus manos',
    title: 'UÑAS',
    highlight: 'QUE Empoderan.',
    subtitle:
      'Elegancia al alcance de tus manos — Descubre un oasis de belleza donde cada detalle importa. Tratamientos premium con la máxima higiene y estilo.',
    primaryCta: { label: 'RESERVA TU CITA', href: '#contacto' },
    secondaryCta: { label: 'Explorar Servicios', href: '#servicios' },
    stats: [],
  },
  features: {
    eyebrow: 'Por qué elegirnos',
    title: 'Cuidado premium, uñas perfectas',
    subtitle: 'Técnicas impecables, productos de alta gama y un ambiente diseñado para tu relax.',
    items: [
      {
        icon: 'sparkles',
        title: 'Productos Premium',
        description: 'Solo marcas de alta gama, veganas y cruelty-free para un acabado impecable.',
      },
      {
        icon: 'shield',
        title: 'Higiénico y Seguro',
        description: 'Esterilización medical-grade y protocolos de higiene rigurosos en cada servicio.',
      },
      {
        icon: 'heart',
        title: 'Técnicas Expertas',
        description:
          'Artistas certificadas con formación continua en las últimas tendencias internacionales.',
      },
    ],
  },
  about: {
    eyebrow: 'Bienvenidos a Luxe Nail Studio',
    title: 'BELLEZA. CUIDADO. CONFIANZA.',
    paragraphs: [
      'En Luxe Nail Studio creemos que cada detalle importa. Nuestra filosofía une elegancia atemporal con técnicas de vanguardia para realzar tu belleza natural y hacerte sentir segura, cuidada y radiante en cada visita.',
      'Más que un salón, somos un oasis de tranquilidad en el corazón de Madrid. Un espacio boutique donde la música suave, los aromas relajantes y el trato cercano convierten cada cita en un ritual de bienestar y desconexión.',
    ],
    highlights: [
      'Atención personalizada y asesoría de estilo',
      'Ambiente boutique con música y aromas relajantes',
      'Productos premium y técnicas de vanguardia',
    ],
    stats: [
      { value: '10k+', label: 'Servicios realizados' },
      { value: '98%', label: 'Clientas recurrentes' },
      { value: '15+', label: 'Técnicas exclusivas' },
    ],
  },
  services: [
    {
      name: 'Manicura Clásica',
      description:
        'Manicura clásica con limado perfecto, cutículas cuidadas y esmaltado de larga duración para un acabado natural y elegante.',
    },
    {
      name: 'Extensiones de Gel',
      description:
        'Extensiones de gel esculpidas a medida, resistentes y ultraligeras, con forma y longitud personalizadas para una manicura impecable.',
    },
    {
      name: 'Nail Art',
      description:
        'Diseños artísticos exclusivos, desde minimalistas hasta alta joyería en tus uñas, creados por nuestras nail artists expertas.',
    },
    {
      name: 'Pedicura Premium',
      description:
        'Pedicura spa de lujo con exfoliación, masaje y esmaltado premium para unos pies suaves, bonitos y totalmente renovados.',
    },
  ],
  testimonials: {
    eyebrow: 'Reseñas',
    title: 'Lo que dicen nuestras clientas',
    items: [
      {
        quote:
          'Una experiencia de lujo total. El trato es exquisito, la higiene impecable y mis uñas nunca habían lucido tan perfectas.',
        name: 'Sofía R.',
        role: 'Empresaria',
      },
      {
        quote:
          'Las mejores manos de Madrid. Me asesoraron en el diseño y el resultado superó todas mis expectativas. ¡Ya soy clienta fija!',
        name: 'Claudia M.',
        role: 'Diseñadora gráfica',
      },
      {
        quote:
          'El oasis de calma que necesitaba. Salgo siempre relajadísima y con una manicura que dura semanas intacta. 100% recomendado.',
        name: 'Valeria L.',
        role: 'Abogada',
      },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Preguntas frecuentes',
    items: [
      {
        question: '¿Cuánto dura una cita en Luxe Nail Studio?',
        answer:
          'Depende del servicio: una Classic Manicure dura unos 45 minutos, las Gel Extensions entre 90 y 120 minutos y el Nail Art se calcula según el diseño. Siempre confirmamos la duración al reservar para que organices tu día sin prisas.',
      },
      {
        question: '¿Utilizáis productos hipoalergénicos y veganos?',
        answer:
          'Sí. Trabajamos exclusivamente con marcas premium, veganas, cruelty-free e hipoalergénicas. Todos los productos están dermatológicamente testados y son aptos para pieles sensibles.',
      },
      {
        question: '¿Cada cuánto debo hacer el retoque?',
        answer:
          'Recomendamos retoque cada 2-3 semanas para manicura gel y cada 3-4 semanas para pedicura. Así mantienes el brillo, la forma y la salud natural de la uña.',
      },
      {
        question: '¿Cuál es vuestra política de cancelación?',
        answer:
          'Puedes cancelar o reprogramar sin coste hasta 24 horas antes de tu cita. Las cancelaciones tardías o no-shows tienen un cargo del 50% del servicio para respetar el tiempo de nuestras técnicas.',
      },
    ],
  },
  cta: {
    title: 'RESERVA TU CITA HOY',
    subtitle:
      'Entra al lujo. Sal sintiéndote hermosa. — Reserva online en 30 segundos y recibe un diagnóstico gratuito.',
    action: { label: 'RESERVAR AHORA', href: '#contacto' },
  },
};
