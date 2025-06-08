import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'RaiseUP - Professional Training & Certification Platform',
  description = 'Advance your career with expert-led training courses and industry-recognized certifications. Join thousands of professionals who have transformed their careers with RaiseUP.',
  keywords = 'training, certification, professional development, courses, education, career advancement',
  image = 'https://lovable.dev/opengraph-image-p98pqg.png',
  url = 'https://raiseup.com',
  type = 'website'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "RaiseUP",
          "description": description,
          "url": url,
          "logo": "https://raiseup.com/logo.png",
          "sameAs": [
            "https://www.linkedin.com/company/raiseup",
            "https://twitter.com/raiseup",
            "https://www.facebook.com/raiseup"
          ]
        })}
      </script>
    </Helmet>
  );
};