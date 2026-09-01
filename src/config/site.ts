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
  // T1: Dominio canónico final — sitemap, robots Sitemap y <link rel="canonical"> (Seo.astro) usan este valor.
  // El deploy beta luxe-nails-beta.vercel.app es SOLO preview temporal; NO cambiar SITE.url a ese host.
  // astro.config.ts site: SITE.url y absolute() en seo.ts dependen de este valor.
  url: 'https://luxenailstudio.com',
  description:
    'Manicura, uñas de gel y nail art en Madrid — Luxe Nail Studio en Serrano 42, Salamanca. Productos premium, 5/5 estrellas. Reserva tu manicura hoy mismo.',
  locale: 'es',
  localeRegion: 'es-ES',
  themeColor: '#d48a8a',
  keywords: [
    'manicura Madrid',
    'uñas de gel Madrid',
    'nail art Madrid',
    'pedicura spa Salamanca',
    'salón de uñas de lujo Madrid',
    'Luxe Nail Studio Serrano',
    'manicura semipermanente Madrid',
    'uñas acrílicas Chamartín',
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
    { label: 'Inicio', href: '/#inicio' },
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Galería', href: '/#galeria' },
    { label: 'Reservar manicura', href: '/#contacto' },
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
      'Descubre nuestro oasis de belleza en Serrano 42, pleno barrio de Salamanca — a minutos de Chamartín y del centro de Madrid. Manicura, gel y nail art desde 25€, de 45 a 120 min, con productos premium, máxima higiene y un estilo impecable.',
    primaryCta: { label: 'Reservar manicura en Madrid', href: '#contacto' },
    secondaryCta: { label: 'Ver manicura clásica Madrid', href: '#servicios' },
    stats: [],
  },
  features: {
    eyebrow: 'Manicura en Madrid — Por qué elegirnos',
    title: 'Servicios Exclusivos de Manicura en Madrid',
    subtitle:
      'Técnicas impecables, productos de alta gama y un ambiente diseñado para tu relax en pleno Salamanca, a dos pasos de Chamartín. Atendemos a clientas de todo Madrid centro con manicura desde 25€ y duración de 45 a 120 min. Reserva tu cita hoy.',
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
    eyebrow: 'Bienvenidos a Luxe Nail Studio — Manicura en Madrid, Salamanca',
    title: 'BELLEZA. CUIDADO. MANICURA EN MADRID.',
    paragraphs: [
      'En Luxe Nail Studio creemos que cada detalle importa. Nuestra filosofía une elegancia atemporal con técnicas de vanguardia para realzar tu belleza natural y hacerte sentir segura, cuidada y radiante en cada visita. Ubicadas en Serrano 42, en el corazón del barrio de Salamanca — a 5 min de Chamartín y muy cerca de Chamberí y Retiro — atendemos a clientas de todo Madrid centro con manicura y uñas de gel desde 25€ y servicios de 45 a 120 minutos según diseño.',
      'Más que un salón, somos un oasis de tranquilidad en el corazón de Madrid. Un espacio boutique donde la música suave, los aromas relajantes y el trato cercano convierten cada cita en un ritual de bienestar y desconexión. Referentes en Salamanca para manicura semipermanente, extensiones de gel y nail art, combinamos productos veganos premium y esterilización medical-grade. Reserva online en 30 segundos y disfruta de un resultado impecable que dura semanas.',
    ],
    highlights: [
      'Atención personalizada y asesoría de estilo en manicura Madrid — diseño a medida desde 25€',
      'Ambiente boutique en Salamanca, con música suave y aromas relajantes a pasos de Chamartín',
      'Productos premium veganos y técnicas de vanguardia — duración 45 a 120 min, acabado impecable',
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
        'Manicura clásica en Madrid centro con limado perfecto, cutículas cuidadas y esmaltado de larga duración para un acabado natural y elegante. Dura 45 min, desde 25€, en Serrano 42 (Salamanca), a minutos de Chamartín. Ideal para el día a día, con opción semipermanente y asesoría de estilo incluida.',
    },
    {
      name: 'Extensiones de Gel',
      description:
        'Extensiones de gel en Madrid esculpidas a medida, resistentes y ultraligeras, con forma y longitud personalizadas para una manicura impecable. De 90 a 120 min, desde 45€, en nuestro estudio de Salamanca, junto a Chamartín. Acabado natural, brillo espejo y duración de 3 a 4 semanas sin descascarillados.',
    },
    {
      name: 'Nail Art',
      description:
        'Nail art exclusivo en Madrid — desde minimalista hasta alta joyería en tus uñas — creado por nuestras nail artists expertas en Serrano 42. Duración según diseño (60–120 min), desde 30€, con técnicas tendencia en Salamanca y Chamartín. Cada diseño es único y 100% personalizado a tu estilo.',
    },
    {
      name: 'Pedicura Premium',
      description:
        'Pedicura spa de lujo en Madrid con exfoliación, masaje y esmaltado premium para unos pies suaves, bonitos y totalmente renovados. Sesión de 60 min, desde 35€, en Serrano 42, barrio de Salamanca, cercano a Chamartín. Higiene medical-grade y esmaltes veganos de larga duración para un bienestar total.',
    },
  ],
  testimonials: {
    eyebrow: 'Reseñas 5/5 en Madrid',
    title: 'Reseñas de Manicura en Madrid — Lo que dicen nuestras clientas',
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
    eyebrow: 'FAQ Manicura Madrid',
    title: 'Preguntas Frecuentes sobre Manicura en Madrid',
    items: [
      {
        question: '¿Cuánto dura una cita de manicura en Madrid en Luxe Nail Studio?',
        answer:
          'Depende del servicio en nuestro salón de Serrano 42, Salamanca: la manicura clásica dura unos 45 minutos (desde 25€), las extensiones de gel entre 90 y 120 minutos (desde 45€) y el nail art se calcula según el diseño. Atendemos a clientas de Chamartín, Chamberí y todo Madrid centro. Siempre confirmamos la duración al reservar para que organices tu día sin prisas.',
      },
      {
        question: '¿Utilizáis productos hipoalergénicos y veganos para uñas en Madrid?',
        answer:
          'Sí. En Luxe Nail Studio, referente en Salamanca y Chamartín, trabajamos exclusivamente con marcas premium, veganas, cruelty-free e hipoalergénicas. Todos los productos están dermatológicamente testados y son aptos para pieles sensibles.',
      },
      {
        question: '¿Cada cuánto debo hacer el retoque de uñas de gel en Madrid?',
        answer:
          'Recomendamos retoque cada 2-3 semanas para manicura gel y cada 3-4 semanas para pedicura en nuestro estudio de Serrano 42. Así mantienes el brillo, la forma y la salud natural de la uña, con duración impecable entre visitas.',
      },
      {
        question: '¿Cuál es vuestra política de cancelación en Luxe Nail Studio Madrid?',
        answer:
          'Puedes cancelar o reprogramar sin coste hasta 24 horas antes de tu cita en Serrano 42, Salamanca. Las cancelaciones tardías o no-shows tienen un cargo del 50% del servicio para respetar el tiempo de nuestras técnicas y a las clientas de Madrid que esperan cita.',
      },
    ],
  },
  cta: {
    title: 'Reserva tu Manicura en Madrid Hoy',
    subtitle:
      'Entra al lujo en Serrano 42, barrio de Salamanca — a un paso de Chamartín y del centro de Madrid. Sal sintiéndote hermosa con tu manicura, gel o nail art desde 25€, de 45 a 120 min, con productos premium y diagnóstico gratuito. Reserva online en 30 segundos y asegura tu cita hoy.',
    action: { label: 'Reservar manicura en Madrid', href: '#contacto' },
  },
};
