import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './use-cases.module.css';

// Function to safely render SVG icons
function SVGIcon({ svgContent }) {
  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

const UseCases = [
  {
    title: 'Financial Data',
    description: 'Extract market data, financial reports, and investment insights with precision and reliability.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/><path d="M21 3h-3V1h-2v2H8V1H6v2H3v18h18V3zm-2 16H5V8h14v11z"/></svg>',
    features: [
      'Real-time stock prices and market data',
      'Financial reports and SEC filings',
      'Company news and announcements',
      'Investment research and analysis',
      'Economic indicators and trends',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/financial-data',
  },
  {
    title: 'Healthcare',
    description: 'Gather medical research, clinical trials data, and healthcare information securely.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>',
    features: [
      'Medical research papers and studies',
      'Clinical trial data and results',
      'Healthcare provider information',
      'Drug pricing and availability',
      'Medical device specifications',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/healthcare',
  },
  {
    title: 'Retail & E-commerce',
    description: 'Monitor product prices, inventory, and competitor data across multiple platforms.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',
    features: [
      'Product pricing and availability',
      'Competitor product monitoring',
      'Customer reviews and ratings',
      'Inventory tracking',
      'Promotional offers and discounts',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/retail-ecommerce',
  },
  {
    title: 'Sports & News',
    description: 'Stay updated with real-time sports scores, news articles, and media content.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M23 7V1h-6v2H7V1H1v6h2v10H1v6h6v-2h10v2h6v-6h-2V7h2zM3 3h2v2H3V3zm2 18H3v-2h2v2zm12-2H7v-2H5V7h2V5h10v2h2v10h-2v2zm4 2h-2v-2h2v2zM19 5V3h2v2h-2zm-5.27 9h-3.49l-.73 2H7.89l3.4-9h1.4l3.41 9h-1.63l-.74-2zm-3.04-1.26h2.61L12 8.91l-1.31 3.83z"/></svg>',
    features: [
      'Real-time sports scores and statistics',
      'News articles and headlines',
      'Player and team information',
      'Event schedules and results',
      'Media content and analysis',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/sports-news',
  },
  {
    title: 'Research & Academia',
    description: 'Collect academic papers, research data, and scholarly information for analysis.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
    features: [
      'Academic papers and publications',
      'Research data and findings',
      'Citation information',
      'Conference proceedings',
      'Grant and funding information',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/research',
  },
  {
    title: 'Custom Solutions',
    description: 'Build your own custom data extraction pipeline with our flexible API.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
    features: [
      'Custom data extraction workflows',
      'Specialized industry data',
      'Integration with existing systems',
      'Tailored AI extraction models',
      'Dedicated support and consulting',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
  },
];

function UseCase({ useCase }) {
  return (
    <div className={styles.useCase}>
      <div className={styles.useCaseIcon}>
        <SVGIcon svgContent={useCase.icon} />
      </div>
      <h2>{useCase.title}</h2>
      <p className={styles.useCaseDescription}>{useCase.description}</p>
      <div className={styles.useCaseFeatures}>
        <h3>Key Features</h3>
        <ul>
          {useCase.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className={styles.useCaseFooter}>
        <Link
          className="button button--outline button--primary"
          to={useCase.ctaLink}>
          {useCase.cta}
        </Link>
      </div>
    </div>
  );
}

export default function UseCasesPage() {
  return (
    <Layout
      title="Use Cases | Zyptal"
      description="Discover how Zyptal's data extraction API can be used in various industries and applications">
      <div className={styles.useCasesHero}>
        <div className="container">
          <h1>Powerful Data Extraction for Every Industry</h1>
          <p>Discover how Zyptal's API can help you extract the data you need for your specific use case.</p>
          <div className={styles.useCasesHeroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/signup">
              Get Started Free
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/docs/introduction">
              View Documentation
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.useCasesIntro}>
          <h2>Tailored Solutions for Every Industry</h2>
          <p>
            Zyptal provides specialized data extraction solutions for various industries and use cases.
            Whether you need financial data, healthcare information, or retail insights, our API can help you extract the data you need.
          </p>
        </div>

        <div className={styles.useCasesGrid}>
          {UseCases.map((useCase, index) => (
            <UseCase key={index} useCase={useCase} />
          ))}
        </div>

        <div className={styles.customSolutionsSection}>
          <h2>Need a Custom Solution?</h2>
          <p>
            We understand that every business has unique data extraction needs. Our team can work with you to create a custom solution that meets your specific requirements.
          </p>
          <div className={styles.customSolutionsFeatures}>
            <div className={styles.customSolutionsFeature}>
              <SVGIcon svgContent='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.24 0 .46-.18.49-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>' />
              <h3>Custom Data Extraction</h3>
              <p>We can build custom data extraction pipelines for your specific needs.</p>
            </div>
            <div className={styles.customSolutionsFeature}>
              <SVGIcon svgContent='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M21 11.18V9.72c0-.47-.16-.92-.46-1.28L16.6 3.72c-.38-.46-.94-.72-1.54-.72H8.94c-.6 0-1.15.26-1.54.72L3.46 8.44c-.3.36-.46.81-.46 1.28v1.45c0 .8.48 1.52 1.23 1.83v6.5c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5v-6.5c.75-.31 1.23-1.03 1.23-1.83zM12.95 3H15l4.66 5.62h-5.88l-.83-5.62zM9 3h1.05l.83 5.62H5.34L9 3zm-3 8.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zM13 18h-2v-6h2v6zm4 0h-2v-6h2v6zm2-9.5h-12v9.75c0 .14.11.25.25.25h11.5c.14 0 .25-.11.25-.25V8.5zm1-1.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/></svg>' />
              <h3>Specialized AI Models</h3>
              <p>Our AI team can develop specialized models for your industry-specific data.</p>
            </div>
            <div className={styles.customSolutionsFeature}>
              <SVGIcon svgContent='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-9-3.82l-2.09-2.09L6.5 13.5 10 17l6.01-6.01-1.41-1.41z"/></svg>' />
              <h3>Integration Support</h3>
              <p>We can help you integrate our API with your existing systems and workflows.</p>
            </div>
            <div className={styles.customSolutionsFeature}>
              <SVGIcon svgContent='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg>' />
              <h3>Dedicated Support</h3>
              <p>Get dedicated support from our team of data extraction experts.</p>
            </div>
          </div>
          <div className={styles.customSolutionsCta}>
            <Link
              className="button button--primary button--lg"
              to="/contact">
              Contact Sales
            </Link>
          </div>
        </div>

        <div className={styles.testimonialSection}>
          <h2>What Our Customers Say</h2>
          <div className={styles.testimonials}>
            <div className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <p>"Zyptal has revolutionized how we gather financial data. Their API is fast, reliable, and provides exactly the data we need."</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialName}>John Smith</div>
                <div className={styles.testimonialTitle}>CTO, FinTech Innovations</div>
              </div>
            </div>
            <div className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <p>"We've been using Zyptal for our e-commerce price monitoring, and it's been a game-changer. The data is accurate and delivered in real-time."</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialName}>Sarah Johnson</div>
                <div className={styles.testimonialTitle}>Head of Data, RetailPro</div>
              </div>
            </div>
            <div className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <p>"As a research institution, we need reliable data extraction. Zyptal's API has helped us gather research papers and data with ease."</p>
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialName}>Dr. Michael Chen</div>
                <div className={styles.testimonialTitle}>Research Director, Global Research Institute</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
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
              to="/pricing">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 