import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import DashboardButton from "@site/src/components/DashboardButton";

import styles from './index.module.css';

// SVG Icon component for testimonials and use cases
function SVGIcon({ svg }) {
  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
}

// Testimonial data
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Data Scientist at AnalyticsPro',
    quote: 'Zyptal has transformed our research workflow. The AI extraction capabilities save us countless hours of manual data collection.',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#testimonial-gradient-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="testimonial-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
      <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
      <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>`
  },
  {
    name: 'Michael Chen',
    role: 'CTO at TechInnovate',
    quote: 'The reliability and speed of Zyptal\'s API is unmatched. We\'ve integrated it into our core product and our customers love the results.',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#testimonial-gradient-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="testimonial-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>`
  },
  {
    name: 'Emily Rodriguez',
    role: 'E-commerce Manager at ShopGlobal',
    quote: 'We use Zyptal to monitor competitor pricing across thousands of products. The structured data extraction is incredibly accurate.',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#testimonial-gradient-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="testimonial-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>`
  }
];

// Use cases data
const useCases = [
  {
    title: 'Financial Data',
    description: 'Extract market data, financial reports, and investment insights with precision and reliability.',
    link: '/use-cases/financial-data',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#usecase-gradient-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="usecase-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <line x1="12" y1="1" x2="12" y2="23"></line>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      <polyline points="7 9 5 7 3 9"></polyline>
      <polyline points="21 15 19 17 17 15"></polyline>
    </svg>`
  },
  {
    title: 'Healthcare',
    description: 'Gather medical research, clinical trials data, and healthcare information securely.',
    link: '/use-cases/healthcare',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#usecase-gradient-2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="usecase-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 8v8"></path>
      <path d="M8 12h8"></path>
    </svg>`
  },
  {
    title: 'Retail & E-commerce',
    description: 'Monitor product prices, inventory, and competitor data across multiple platforms.',
    link: '/use-cases/retail-ecommerce',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#usecase-gradient-3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="usecase-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>`
  },
  {
    title: 'Sports & News',
    description: 'Stay updated with real-time sports scores, news articles, and media content.',
    link: '/use-cases/sports-news',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#usecase-gradient-4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="usecase-gradient-4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
      <path d="M18 14h-8"></path>
      <path d="M15 18h-5"></path>
      <path d="M10 6h8v4h-8V6Z"></path>
    </svg>`
  },
  {
    title: 'Research & Academia',
    description: 'Collect academic papers, research data, and scholarly information for analysis.',
    link: '/use-cases/research',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#usecase-gradient-5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="usecase-gradient-5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>`
  },
  {
    title: 'Custom Solutions',
    description: 'Build your own custom data extraction pipeline with our flexible API.',
    link: '/use-cases/custom-solutions',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#usecase-gradient-6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <defs>
        <linearGradient id="usecase-gradient-6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#5E30C5" />
          <stop offset="100%" stop-color="#4CD90B" />
        </linearGradient>
      </defs>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`
  }
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            to="/pricing">
            View Pricing
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - High-Performance Web Scraping & Data Extraction API`}
      description="Zyptal provides high-performance web scraping, search engine data extraction, and AI-powered structured data for developers, researchers, and enterprises.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        
        {/* API Showcase Section */}
        <section className={styles.apiShowcase}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <h2>Powerful API for Any Data Extraction Need</h2>
                <p>
                  Extract data from any website with our high-performance API. Whether you need raw HTML, structured data, or AI-powered insights, Zyptal has you covered.
                </p>
                <ul className={styles.apiFeatureList}>
                  <li>✓ Search engine results extraction</li>
                  <li>✓ SPA and JavaScript rendering support</li>
                  <li>✓ AI-powered structured data extraction</li>
                  <li>✓ Media and document parsing</li>
                  <li>✓ Batch processing capabilities</li>
                </ul>
                <Link
                  className="button button--primary button--lg"
                  to="/docs/api-reference/overview">
                  Explore API
                </Link>
              </div>
              <div className="col col--6">
                <div className={styles.codeBlock}>
                  <pre>
                    <code>
{`// Example: Extract structured data with AI
const response = await fetch('https://api.zyptal.com/v1/extract', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/product',
    ai_prompt: 'Extract product name, price, and features'
  })
});

const data = await response.json();
console.log(data.structured_data);`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className={styles.useCases}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Tailored Solutions for Every Industry</h2>
            <div className={styles.useCasesGrid}>
              {useCases.map((useCase, index) => (
                <div className={styles.useCaseCard} key={index}>
                  <div className={styles.useCaseIcon}>
                    <SVGIcon svg={useCase.icon} />
                  </div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.description}</p>
                  <Link to={useCase.link} className={styles.useCaseLink}>
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className={styles.stats}>
          <div className="container">
            <div className="row">
              <div className="col col--4">
                <div className={styles.statItem}>
                  <h2>100+</h2>
                  <p>AI-powered scrapes per minute</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.statItem}>
                  <h2>1,000+</h2>
                  <p>Raw scrapes per minute</p>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.statItem}>
                  <h2>99.9%</h2>
                  <p>Uptime reliability</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className={styles.testimonials}>
          <div className="container">
            <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
            <div className="row">
              {testimonials.map((testimonial, index) => (
                <div className="col col--4" key={index}>
                  <div className={styles.testimonialCard}>
                    <div className={styles.testimonialIcon}>
                      <SVGIcon svg={testimonial.icon} />
                    </div>
                    <div className={styles.testimonialQuote}>
                      <blockquote>"{testimonial.quote}"</blockquote>
                    </div>
                    <div className={styles.testimonialAuthor}>
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className={styles.testimonialAvatar} 
                      />
                      <div className={styles.testimonialInfo}>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className="container">
            <h2>Ready to extract the data you need?</h2>
            <p>Start with our free plan or choose a plan that fits your needs.</p>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--primary button--lg"
                to="/signup">
                Sign Up Free
              </Link>
              <Link
                className="button button--outline button--secondary button--lg"
                to="/contact">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <DashboardButton />
    </Layout>
  );
}
