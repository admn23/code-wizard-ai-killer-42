
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add base meta tags
document.addEventListener('DOMContentLoaded', function() {
  // Add viewport meta tag
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(viewport);

  // Add charset meta tag
  const charset = document.createElement('meta');
  charset.setAttribute('charset', 'UTF-8');
  document.head.insertBefore(charset, document.head.firstChild);

  // Add base Open Graph meta tags
  const ogType = document.createElement('meta');
  ogType.setAttribute('property', 'og:type');
  ogType.content = 'website';
  document.head.appendChild(ogType);

  const ogUrl = document.createElement('meta');
  ogUrl.setAttribute('property', 'og:url');
  ogUrl.content = window.location.origin;
  document.head.appendChild(ogUrl);

  const ogImage = document.createElement('meta');
  ogImage.setAttribute('property', 'og:image');
  ogImage.content = `${window.location.origin}/placeholder.svg`;
  document.head.appendChild(ogImage);

  // Add Twitter Card meta tags
  const twitterCard = document.createElement('meta');
  twitterCard.name = 'twitter:card';
  twitterCard.content = 'summary_large_image';
  document.head.appendChild(twitterCard);

  // Add theme color
  const themeColor = document.createElement('meta');
  themeColor.name = 'theme-color';
  themeColor.content = '#22C55E';
  document.head.appendChild(themeColor);
});

createRoot(document.getElementById("root")!).render(<App />);
