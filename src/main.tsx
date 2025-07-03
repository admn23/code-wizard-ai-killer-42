
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add basic meta tags
const addBasicMetaTags = () => {
  // Viewport meta tag
  const viewport = document.createElement('meta');
  viewport.name = 'viewport';
  viewport.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(viewport);

  // Basic meta tags
  const charset = document.createElement('meta');
  charset.setAttribute('charset', 'UTF-8');
  document.head.appendChild(charset);

  // Author meta tag
  const author = document.createElement('meta');
  author.name = 'author';
  author.content = 'Coding Killer';
  document.head.appendChild(author);

  // Robots meta tag
  const robots = document.createElement('meta');
  robots.name = 'robots';
  robots.content = 'index, follow';
  document.head.appendChild(robots);
};

addBasicMetaTags();

createRoot(document.getElementById("root")!).render(<App />);
