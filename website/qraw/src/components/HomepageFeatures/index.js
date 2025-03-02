import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

// SVG Icon component for features
function SVGIcon({ svg }) {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}

const FeatureList = [
  {
    title: 'High-Performance Scraping',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#feature-gradient-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="feature-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
    </svg>`,
    description: (
      <>
        Extract data from any website with our high-speed scraping engine. 
        Process up to 1,000 raw scrapes per minute and 100 AI-powered scrapes per minute.
      </>
    ),
  },
  {
    title: 'Search Engine Data',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#feature-gradient-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="feature-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>`,
    description: (
      <>
        Extract search results from Google, Bing, Yahoo, DuckDuckGo, and more.
        Get structured data from search engine results pages with ease.
      </>
    ),
  },
  {
    title: 'AI-Powered Extraction',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#feature-gradient-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="feature-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
      <path d="M21.18 8.02c-1-2.3-2.85-4.17-5.16-5.18"></path>
      <path d="M12 2v8"></path>
      <path d="M12 12.5v.5"></path>
      <path d="M12 18v.5"></path>
      <path d="M7 12.5h5"></path>
      <path d="M7 18h5"></path>
    </svg>`,
    description: (
      <>
        Transform raw data into structured formats with our AI pipeline.
        Extract specific fields and insights using natural language prompts.
      </>
    ),
  },
];

function Feature({icon, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <SVGIcon svg={icon} />
        </div>
        <div className={styles.featureContent}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.featuresTitle}>Powerful Data Extraction Tools</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
