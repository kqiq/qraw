import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './api.module.css';

// Function to safely render SVG icons
function SVGIcon({ svgContent }) {
  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
}

const ApiEndpoints = [
  {
    title: 'Web Scraping',
    endpoint: '/v1/scrape',
    method: 'POST',
    description: 'Extract data from any website with our high-performance scraping engine.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19 4H5c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H5V8h14v10z"/><path d="M7 10h10v2H7z"/><path d="M7 14h7v2H7z"/></svg>',
    code: `curl -X POST "https://api.zyptal.com/v1/scrape" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "url": "https://example.com",
    "render_js": true,
    "wait_for": ".product-details"
  }'`,
    response: `{
  "status": "success",
  "url": "https://example.com",
  "html": "<!DOCTYPE html><html>...</html>",
  "text": "Example Domain Example...",
  "timestamp": "2023-06-15T14:22:33Z"
}`,
  },
  {
    title: 'Search Engine Results',
    endpoint: '/v1/search',
    method: 'POST',
    description: 'Extract search results from major search engines like Google, Bing, and more.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    code: `curl -X POST "https://api.zyptal.com/v1/search" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "query": "best smartphones 2023",
    "engine": "google",
    "num_results": 10
  }'`,
    response: `{
  "status": "success",
  "query": "best smartphones 2023",
  "engine": "google",
  "results": [
    {
      "title": "Best Smartphones of 2023 - Top Rated...",
      "url": "https://example.com/smartphones",
      "description": "Our comprehensive guide to..."
    },
    // More results...
  ]
}`,
  },
  {
    title: 'AI Extraction',
    endpoint: '/v1/extract',
    method: 'POST',
    description: 'Extract structured data from websites using AI and natural language prompts.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M21 11.18V9.72c0-.47-.16-.92-.46-1.28L16.6 3.72c-.38-.46-.94-.72-1.54-.72H8.94c-.6 0-1.15.26-1.54.72L3.46 8.44c-.3.36-.46.81-.46 1.28v1.45c0 .8.48 1.52 1.23 1.83v6.5c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5v-6.5c.75-.31 1.23-1.03 1.23-1.83zM12.95 3H15l4.66 5.62h-5.88l-.83-5.62zM9 3h1.05l.83 5.62H5.34L9 3zm-3 8.25c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zM13 18h-2v-6h2v6zm4 0h-2v-6h2v6zm2-9.5h-12v9.75c0 .14.11.25.25.25h11.5c.14 0 .25-.11.25-.25V8.5zm1-1.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z"/></svg>',
    code: `curl -X POST "https://api.zyptal.com/v1/extract" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "url": "https://example.com/product",
    "ai_prompt": "Extract product name, price, and features"
  }'`,
    response: `{
  "status": "success",
  "url": "https://example.com/product",
  "structured_data": {
    "product_name": "Premium Smartphone X",
    "price": "$999",
    "features": [
      "6.7-inch OLED display",
      "5G connectivity",
      "Triple camera system"
    ]
  }
}`,
  },
  {
    title: 'Batch Processing',
    endpoint: '/v1/batch',
    method: 'POST',
    description: 'Process multiple URLs in a single request for efficient data extraction.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>',
    code: `curl -X POST "https://api.zyptal.com/v1/batch" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "urls": [
      "https://example.com/page1",
      "https://example.com/page2",
      "https://example.com/page3"
    ],
    "render_js": true
  }'`,
    response: `{
  "status": "success",
  "job_id": "batch_12345",
  "results": [
    {
      "url": "https://example.com/page1",
      "status": "success",
      "html": "<!DOCTYPE html><html>...</html>"
    },
    // More results...
  ]
}`,
  },
];

function ApiEndpoint({ endpoint }) {
  return (
    <div className={styles.apiEndpoint}>
      <h2>
        <div style={{ display: 'inline-block', marginRight: '10px', verticalAlign: 'middle' }}>
          <SVGIcon svgContent={endpoint.icon} />
        </div>
        {endpoint.title}
      </h2>
      <div className={styles.endpointPath}>
        <span className={styles.endpointMethod}>{endpoint.method}</span>
        <code>{endpoint.endpoint}</code>
      </div>
      <p>{endpoint.description}</p>
      
      <div className={styles.codeBlocks}>
        <div className={styles.codeBlock}>
          <h3>Request</h3>
          <pre>
            <code>{endpoint.code}</code>
          </pre>
        </div>
        <div className={styles.codeBlock}>
          <h3>Response</h3>
          <pre>
            <code>{endpoint.response}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'JavaScript Rendering',
    description: 'Extract data from JavaScript-heavy websites and single-page applications with our advanced rendering engine.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v5.7c0 4.83-3.4 9.19-7 10.36-3.6-1.17-7-5.53-7-10.36v-5.7l7-3.12z"/><path d="M11 7h2v8h-2z"/><path d="M11 17h2v2h-2z"/></svg>'
  },
  {
    title: 'Proxy Management',
    description: 'Automatically handle proxy rotation and IP management to avoid rate limiting and blocking.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
  },
  {
    title: 'Custom Headers',
    description: 'Set custom headers, cookies, and user agents to simulate real browser behavior.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'
  },
  {
    title: 'Pagination Support',
    description: 'Easily extract data from paginated content with our built-in pagination support.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'
  },
  {
    title: 'Error Handling',
    description: 'Comprehensive error handling and reporting to help you debug and optimize your data extraction.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>'
  },
  {
    title: 'Rate Limiting',
    description: 'Intelligent rate limiting to ensure your requests are processed efficiently without overwhelming target servers.',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>'
  },
];

const sdks = [
  {
    title: 'Python',
    description: 'Our Python SDK makes it easy to integrate Zyptal into your Python applications.',
    installCommand: 'pip install zyptal',
    docsLink: '/docs/sdks/python',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.619H5.92s-2.927-.332-2.927 4.282c0 4.613 2.554 4.455 2.554 4.455h1.524v-2.132s-.083-2.554 2.513-2.554zm-.392-5.436a.794.794 0 1 1 0-1.589.794.794 0 0 1 0 1.589z"/><path d="M14.323 15.28h-4.328s-2.432-.039-2.432 2.35v3.951s.367 2.392 5.145 2.392c4.574 0 4.289-1.983 4.289-1.983l-.006-2.054h-4.363v-.619h6.097s2.927.332 2.927-4.282c0-4.614-2.554-4.455-2.554-4.455h-1.524v2.132s.082 2.554-2.513 2.554zm.392 5.436a.794.794 0 1 1 0 1.589.794.794 0 0 1 0-1.589z"/></svg>'
  },
  {
    title: 'JavaScript',
    description: 'Use our JavaScript SDK for browser and Node.js applications.',
    installCommand: 'npm install zyptal',
    docsLink: '/docs/sdks/javascript',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"/></svg>'
  },
  {
    title: 'PHP',
    description: 'Integrate Zyptal into your PHP applications with our PHP SDK.',
    installCommand: 'composer require zyptal/zyptal-php',
    docsLink: '/docs/sdks/php',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zm-2.595-1.382h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/></svg>'
  },
  {
    title: 'Ruby',
    description: 'Our Ruby SDK makes it easy to use Zyptal in your Ruby applications.',
    installCommand: 'gem install zyptal',
    docsLink: '/docs/sdks/ruby',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="#5E30C5"><path d="M20.156.083c3.033.525 3.893 2.598 3.829 4.77L24 4.822 22.635 22.71 4.89 23.926h-.016C3.433 23.864.15 23.729 0 19.139l1.645-3 2.819 6.586.503 1.172 2.805-9.144-.03.007.016-.03 9.255 2.956-1.396-5.431-.99-3.9 8.82-.569-.615-.51L16.5 2.114 20.159.073l-.003.01zM0 19.089v.026-.029.003zM5.13 5.073c3.561-3.533 8.157-5.621 9.922-3.84 1.762 1.777-.105 6.105-3.673 9.636-3.563 3.532-8.103 5.734-9.864 3.957-1.766-1.777.045-6.217 3.612-9.75l.003-.003z"/></svg>'
  },
];

export default function ApiPage() {
  return (
    <Layout
      title="API | Zyptal"
      description="Powerful API for web scraping, search engine data extraction, and AI-powered structured data">
      <div className={styles.apiHero}>
        <div className="container">
          <h1>Powerful API for Data Extraction</h1>
          <p>Extract data from any website with our high-performance API. Whether you need raw HTML, structured data, or AI-powered insights, Zyptal has you covered.</p>
          <div className={styles.apiHeroButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/api-reference/overview">
              API Reference
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/signup">
              Get API Key
            </Link>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.apiIntro}>
          <h2>Simple Integration, Powerful Results</h2>
          <p>
            Zyptal's API is designed to be easy to use while providing powerful data extraction capabilities. 
            With just a few lines of code, you can extract data from any website, search engine, or web application.
          </p>
        </div>

        <div className={styles.apiEndpoints}>
          {ApiEndpoints.map((endpoint, index) => (
            <ApiEndpoint key={index} endpoint={endpoint} />
          ))}
        </div>

        <div className={styles.apiFeatures}>
          <h2>Key API Features</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <SVGIcon svgContent={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.apiDocumentation}>
          <h2>SDKs & Libraries</h2>
          <p>We provide official SDKs for popular programming languages to make integration even easier.</p>
          <div className={styles.documentationLinks}>
            {sdks.map((sdk, index) => (
              <div key={index} className={styles.documentationLink}>
                <div className={styles.featureIcon}>
                  <SVGIcon svgContent={sdk.icon} />
                </div>
                <h3>{sdk.title}</h3>
                <p>{sdk.description}</p>
                <pre>
                  <code>{sdk.installCommand}</code>
                </pre>
                <Link
                  className="button button--outline button--primary"
                  to={sdk.docsLink}>
                  View Documentation
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.ctaSection}>
          <h2>Ready to start extracting data?</h2>
          <p>Sign up for a free account and get your API key today.</p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/signup">
              Sign Up Free
            </Link>
            <Link
              className="button button--outline button--secondary button--lg"
              to="/docs/quickstart">
              View Quickstart Guide
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 