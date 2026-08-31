import type { FaqItem, Service, SiteConfig, Stat } from '@/config/site';

type JsonLd = Record<string, unknown>;

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
