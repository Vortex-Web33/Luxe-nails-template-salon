import type { FaqItem, Service, SiteConfig, Stat } from '@/config/site';

type JsonLd = Record<string, unknown>;

// T1: Genera URL absoluta con SITE.url como base — sitemap, canonical y OG quedan unificados en el dominio canónico.
// Se llama siempre como absolute(site.ogImage, site.url) donde site.url === SITE.url === Astro.site.
const absolute = (path: string, siteUrl: string) => new URL(path, siteUrl).toString();

export function websiteJsonLd(site: SiteConfig): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    alternateName: site.legalName,
    url: site.url,
    description: site.description,
    inLanguage: site.localeRegion,
    keywords: site.keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: site.legalName,
      url: site.url,
      logo: { '@type': 'ImageObject', url: absolute(site.ogImage, site.url) },
    },
  };
}

export function organizationJsonLd(site: SiteConfig): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressCountry: 'ES',
    },
    areaServed: 'ES',
    openingHours: site.contact.hours,
    logo: { '@type': 'ImageObject', url: absolute(site.ogImage, site.url) },
    sameAs: site.social.map((s) => s.url),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: site.contact.email,
      telephone: site.contact.phone,
      availableLanguage: ['es', 'en'],
    },
  };
}

export function servicesJsonLd(site: SiteConfig, services: Service[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.description,
        provider: { '@type': 'Organization', name: site.name, url: site.url },
        areaServed: 'ES',
      },
    })),
  };
}

export function faqJsonLd(faq: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function statsJsonLd(site: SiteConfig, stats: Stat[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    knowsAbout: stats,
  };
}

/**
 * T3: Schema LocalBusiness — subtipo NailSalon.
 * Dirección PostalAddress detallada + GeoCoordinates + openingHoursSpecification + aggregateRating + hasMap.
 * Usa SITE.url como base para image/url (canónico único).
 */
export function nailSalonJsonLd(site: SiteConfig): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    image: absolute(site.ogImage, site.url),
    telephone: site.contact.phone,
    email: site.contact.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle Serrano 42',
      addressLocality: 'Madrid',
      postalCode: '28001',
      addressRegion: 'Madrid',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4252,
      longitude: -3.6884,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=40.4252,-3.6884',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: site.social.map((s) => s.url),
    areaServed: {
      '@type': 'City',
      name: 'Madrid',
      addressCountry: 'ES',
    },
  };
}
