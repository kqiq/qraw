import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './pricing.module.css';

const GeneralPlans = [
  {
    title: 'Free',
    price: '$0',
    description: 'Perfect for testing and small projects',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#4CD90B"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>',
    features: [
      '10 requests per month',
      'Basic web scraping',
      'Search engine results',
      'API access',
      'Documentation',
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
    highlight: false,
  },
  {
    title: 'Student',
    price: '$2',
    description: 'For academic and research projects',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
    features: [
      '200 requests per month',
      'Full web scraping capabilities',
      'Search engine results',
      'JavaScript rendering',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup?plan=student',
    highlight: false,
  },
  {
    title: 'Researcher',
    price: '$8',
    description: 'For academic and research institutions',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',
    features: [
      '1,000 requests per month',
      'Advanced web scraping',
      'Search engine results',
      'JavaScript rendering',
      'Basic AI extraction',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup?plan=researcher',
    highlight: false,
  },
  {
    title: 'Developer',
    price: '$20',
    description: 'For professional developers and small teams',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#4CD90B"><path d="M7 5h10v2h2V3c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v4h2V5zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17l1.41 1.42zM10 15.17L6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59L10 15.17zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2v2z"/></svg>',
    features: [
      '2,000 requests per month',
      'Advanced web scraping',
      'Search engine results',
      'JavaScript rendering',
      'AI extraction',
      'Batch processing',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup?plan=developer',
    highlight: true,
  },
  {
    title: 'Enterprise',
    price: '$50',
    description: 'For businesses with high-volume needs',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>',
    features: [
      '5,000 requests per month',
      'Advanced web scraping',
      'Search engine results',
      'JavaScript rendering',
      'Advanced AI extraction',
      'Batch processing',
      'Dedicated support',
      'Custom solutions',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlight: false,
  },
];

const SpecializedPlans = [
  {
    title: 'Financial Data',
    price: 'From $30',
    description: 'Specialized for financial data extraction',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>',
    features: [
      '2,500 requests per month',
      'Financial data extraction',
      'Market data',
      'Stock information',
      'Financial reports',
      'AI-powered insights',
      'Priority support',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/financial-data',
    highlight: false,
  },
  {
    title: 'Healthcare',
    price: 'From $30',
    description: 'Specialized for healthcare data extraction',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/></svg>',
    features: [
      '2,500 requests per month',
      'Healthcare data extraction',
      'Medical research',
      'Clinical trials',
      'Healthcare information',
      'AI-powered insights',
      'Priority support',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/healthcare',
    highlight: false,
  },
  {
    title: 'Retail & E-commerce',
    price: 'From $30',
    description: 'Specialized for retail and e-commerce data',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',
    features: [
      '2,500 requests per month',
      'Product data extraction',
      'Price monitoring',
      'Inventory tracking',
      'Competitor analysis',
      'AI-powered insights',
      'Priority support',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/retail-ecommerce',
    highlight: false,
  },
  {
    title: 'Sports & News',
    price: 'From $30',
    description: 'Specialized for sports and news data',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M22 3l-1.67 1.67L18.67 3 17 4.67 15.33 3l-1.66 1.67L12 3l-1.67 1.67L8.67 3 7 4.67 5.33 3 3.67 4.67 2 3v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V3zM11 19H4v-6h7v6zm9 0h-7v-2h7v2zm0-4h-7v-2h7v2zm0-4H4V8h16v3z"/></svg>',
    features: [
      '2,500 requests per month',
      'Sports data extraction',
      'News article extraction',
      'Real-time scores',
      'Media content',
      'AI-powered insights',
      'Priority support',
    ],
    cta: 'Learn More',
    ctaLink: '/use-cases/sports-news',
    highlight: false,
  },
  {
    title: 'Custom',
    price: 'Custom',
    description: 'Tailored to your specific needs',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#4CD90B"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>',
    features: [
      'Custom request volume',
      'Whitelisted URLs',
      'Custom configurations',
      'Dedicated infrastructure',
      'Advanced AI capabilities',
      'Dedicated support',
      'Custom solutions',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlight: true,
  },
];

const AIPlans = [
  {
    title: 'AI Basic',
    price: '$15',
    description: 'AI-powered data extraction for small projects',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M21 11.18V9.72c0-.47-.16-.92-.46-1.28L16.6 3.72c-.38-.46-.94-.72-1.54-.72H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-8.82l-.6.6c-.57.57-1.32.9-2.12.9H17c-1.66 0-3-1.34-3-3s1.34-3 3-3h3.28c.8 0 1.55.33 2.12.9l.6.6zM5 16h6v2H5v-2zm0-5h6v2H5v-2zm0-5h6v2H5V6z"/></svg>',
    features: [
      '500 AI-powered extractions',
      'Structured data extraction',
      'Natural language prompts',
      'Basic AI insights',
      'Email support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup?plan=ai-basic',
    highlight: false,
  },
  {
    title: 'AI Pro',
    price: '$35',
    description: 'Advanced AI capabilities for professionals',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#4CD90B"><path d="M21.67 18.17l-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41zm-2.83 1.42l-4.24-4.24.71-.71 4.24 4.24-.71.71z"/><path d="M17.34 10.19l1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71l-.7-.71-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15 1.06 1.05zm-7.98 5.15l-4.24 4.24-.71-.71 4.24-4.24.71.71z"/></svg>',
    features: [
      '1,500 AI-powered extractions',
      'Advanced structured data extraction',
      'Complex natural language prompts',
      'Advanced AI insights',
      'Media parsing',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup?plan=ai-pro',
    highlight: true,
  },
  {
    title: 'AI Enterprise',
    price: '$75',
    description: 'Enterprise-grade AI capabilities',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#5E30C5"><path d="M15 9H9v6h6V9zm-2 4h-2v-2h2v2zm8-2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2zm-4 6H7V7h10v10z"/></svg>',
    features: [
      '4,000 AI-powered extractions',
      'Advanced structured data extraction',
      'Complex natural language prompts',
      'Advanced AI insights',
      'Media parsing',
      'Custom AI models',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact',
    highlight: false,
  },
];

function PricingCard({ plan }) {
  return (
    <div className={`${styles.pricingCard} ${plan.highlight ? styles.highlight : ''}`}>
      <div className={styles.pricingHeader}>
        <h3>
          <span dangerouslySetInnerHTML={{ __html: plan.icon }} style={{ marginRight: '10px' }} />
          {plan.title}
        </h3>
        <div className={styles.price}>{plan.price}</div>
        <p>{plan.description}</p>
      </div>
      <div className={styles.pricingFeatures}>
        <ul>
          {plan.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className={styles.pricingFooter}>
        <Link
          className={`button button--lg ${plan.highlight ? 'button--primary' : 'button--outline button--secondary'}`}
          to={plan.ctaLink}>
          {plan.cta}
        </Link>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <Layout
      title="Pricing | Zyptal"
      description="Flexible pricing plans for web scraping, data extraction, and AI-powered insights">
      <div className={styles.pricingHero}>
        <div className="container">
          <h1>Flexible Pricing for Every Need</h1>
          <p>Choose the plan that works best for you, from individual developers to enterprise solutions.</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.pricingSection}>
          <h2>General Plans</h2>
          <p>Our standard plans for web scraping and data extraction needs.</p>
          <div className={styles.pricingGrid}>
            {GeneralPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        <div className={styles.pricingSection}>
          <h2>AI-Powered Plans</h2>
          <p>Specialized plans for AI-powered data extraction and insights.</p>
          <div className={styles.pricingGrid}>
            {AIPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        <div className={styles.pricingSection}>
          <h2>Industry-Specific Plans</h2>
          <p>Tailored solutions for specific industries and use cases.</p>
          <div className={styles.pricingGrid}>
            {SpecializedPlans.map((plan, index) => (
              <PricingCard key={index} plan={plan} />
            ))}
          </div>
        </div>

        <div className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>What counts as a request?</h3>
              <p>A request is counted each time you call our API to extract data from a URL. Batch requests count as multiple requests based on the number of URLs processed.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Can I upgrade or downgrade my plan?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Do you offer custom plans?</h3>
              <p>Yes, we offer custom plans for businesses with specific needs. Contact our sales team to discuss your requirements.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>Is there a free trial?</h3>
              <p>Yes, all paid plans come with a 7-day free trial. You can cancel anytime during the trial period.</p>
            </div>
            <div className={styles.faqItem}>
              <h3>What kind of support do you offer?</h3>
              <p>We offer email support for all plans, with priority support for higher-tier plans. Enterprise plans include dedicated support.</p>
            </div>
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2>Not sure which plan is right for you?</h2>
          <p>Our team is here to help you choose the best plan for your needs.</p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/contact">
              Contact Sales
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/docs/intro">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 