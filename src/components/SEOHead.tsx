import React, { useEffect } from 'react';
import { JobListing } from '../types';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  keywords?: string;
  jobPosting?: JobListing | null;
  breadcrumbs?: BreadcrumbItem[];
}

const DEFAULT_TITLE = 'Dakarlaton — Premier Jobs & Careers in Saudi Arabia, UAE, Qatar & GCC';
const DEFAULT_DESC =
  'Discover premier career opportunities and verified talent across Saudi Arabia, UAE, Qatar, Oman, Bahrain & Kuwait across engineering, technology, design, business, and leadership.';
const BASE_URL = 'https://dakarlaton.com';
const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  keywords,
  jobPosting,
  breadcrumbs,
}) => {
  useEffect(() => {
    const activeTitle = title ? `${title} | Dakarlaton` : DEFAULT_TITLE;
    const activeDesc = description || DEFAULT_DESC;
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const activeCanonical = `${BASE_URL}${cleanPath}`;

    // 1. Update Title
    document.title = activeTitle;

    // Helper to update or create meta tags
    const setMeta = (selector: string, attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('meta[name="description"]', 'name', 'description', activeDesc);
    setMeta('meta[name="title"]', 'name', 'title', activeTitle);
    if (keywords) {
      setMeta('meta[name="keywords"]', 'name', 'keywords', keywords);
    }

    // 3. OpenGraph Tags
    setMeta('meta[property="og:title"]', 'property', 'og:title', activeTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', activeDesc);
    setMeta('meta[property="og:url"]', 'property', 'og:url', activeCanonical);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[property="og:type"]', 'property', 'og:type', ogType);

    // 4. Twitter / X Tags
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', activeTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', activeDesc);
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', activeCanonical);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', activeCanonical);

    // 6. Schema.org JSON-LD structured data
    let dynamicSchemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (!dynamicSchemaScript) {
      dynamicSchemaScript = document.createElement('script');
      dynamicSchemaScript.id = 'dynamic-page-schema';
      dynamicSchemaScript.type = 'application/ld+json';
      document.head.appendChild(dynamicSchemaScript);
    }

    const schemaGraph: any[] = [];

    // Breadcrumb schema if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaGraph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`,
        })),
      });
    }

    // Google for Jobs Schema.org JobPosting if active job
    if (jobPosting) {
      const locationParts = (jobPosting.location || 'Saudi Arabia').split(',');
      const city = locationParts[0]?.trim() || 'Riyadh';
      const country = locationParts[1]?.trim() || 'Saudi Arabia';
      const currency = jobPosting.salary?.includes('AED') ? 'AED' : 'SAR';

      schemaGraph.push({
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: jobPosting.title,
        description: `${jobPosting.description || ''}\n\n${jobPosting.aboutRole || ''}\n\nResponsibilities:\n${(
          jobPosting.responsibilities || []
        ).join('\n')}\n\nRequirements:\n${(jobPosting.requirements || []).join('\n')}`,
        datePosted: jobPosting.postedDate || '2026-08-20',
        validThrough: '2026-12-31T23:59:59Z',
        employmentType: jobPosting.type === 'Part-time' ? 'PART_TIME' : 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: jobPosting.company,
          sameAs: BASE_URL,
          logo: jobPosting.companyLogo || DEFAULT_IMAGE,
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: city,
            addressRegion: city,
            addressCountry: country.includes('UAE') ? 'AE' : 'SA',
          },
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: currency,
          value: {
            '@type': 'QuantitativeValue',
            unitText: 'MONTH',
            value: jobPosting.salary,
          },
        },
        applicantLocationRequirements: {
          '@type': 'Country',
          name: ['Saudi Arabia', 'United Arab Emirates', 'Qatar', 'Oman', 'Bahrain', 'Kuwait'],
        },
      });
    }

    if (schemaGraph.length > 0) {
      dynamicSchemaScript.textContent = JSON.stringify(
        schemaGraph.length === 1 ? schemaGraph[0] : { '@context': 'https://schema.org', '@graph': schemaGraph }
      );
    } else {
      dynamicSchemaScript.textContent = '';
    }
  }, [title, description, canonicalPath, ogImage, ogType, keywords, jobPosting, breadcrumbs]);

  return null;
};
