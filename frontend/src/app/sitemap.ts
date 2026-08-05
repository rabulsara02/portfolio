import type { MetadataRoute } from 'next';
import { person } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: person.siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
