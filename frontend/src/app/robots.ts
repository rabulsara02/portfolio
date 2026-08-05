import type { MetadataRoute } from 'next';
import { person } from '@/content/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
    sitemap: `${person.siteUrl}/sitemap.xml`,
  };
}
