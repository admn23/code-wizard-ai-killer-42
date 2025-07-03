
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

const SEO = ({ title, description, keywords, canonical }: SEOProps) => {
  const siteUrl = 'https://codingkiller.com';
  const fullTitle = `${title} | Coding Killer - AI Powered Coding Assistant`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical ? `${siteUrl}${canonical}` : siteUrl} />
      <meta property="og:image" content={`${siteUrl}/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png`} />
    </Helmet>
  );
};

export default SEO;
