// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Zyptal',
  tagline: 'High-Performance Web Scraping & Data Extraction API',
  favicon: 'img/icons/favicon-192x192.png',
  
  // Favicon configuration
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'shortcut icon',
        href: '/img/icons/favicon.ico',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/icons/favicon-32x32.png',
        sizes: '32x32',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/icons/favicon-64x64.png',
        sizes: '64x64',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/icons/favicon-96x96.png',
        sizes: '96x96',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/icons/favicon-128x128.png',
        sizes: '128x128',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        href: '/img/icons/favicon-192x192.png',
        sizes: '192x192',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/icons/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#5E30C5',
      },
    },
  ],

  // Set the production url of your site here
  url: 'https://zyptal.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zyptal', // Usually your GitHub org/user name.
  projectName: 'zyptal', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zyptal/zyptal-docs/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/zyptal/zyptal-docs/tree/main/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/zyptal-social-card.jpg',
      navbar: {
        title: 'Zyptal',
        logo: {
          alt: 'Zyptal Logo',
          src: 'img/z3.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/pricing', label: 'Pricing', position: 'left'},
          {to: '/api', label: 'API', position: 'left'},
          {to: '/use-cases', label: 'Use Cases', position: 'left'},
              {
                label: 'Web3 Payment',
                to: '/payment',
              },
          {to: '/payment', label: 'Web3 Payment', position: 'left'},
          {
            href: 'https://github.com/zyptal',
            label: 'GitHub',
            position: 'right',
          },
          {
            to: '/login',
            label: 'Login',
            position: 'right',
          },
          {
            to: '/signup',
            label: 'Sign Up',
            position: 'right',
            className: 'button button--primary button--md',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
              {
                label: 'API Reference',
                to: '/docs/api-reference',
              },
              {
                label: 'Pricing',
                to: '/pricing',
              },
              {
                label: 'Use Cases',
              
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Web3 Payment',
                to: '/payment',
              },
              {
                label: 'Tutorials',
                to: '/docs/tutorials',
              },
              {
                label: 'Changelog',
                to: '/changelog',
              },
              {
                label: 'Status',
                href: 'https://status.zyptal.com',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                to: '/about',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy',
              },
              {
                label: 'Terms of Service',
                to: '/terms',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/zyptal',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/zyptalapi',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/zyptal',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/company/zyptal',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zyptal, Inc. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['bash', 'json', 'python', 'javascript', 'typescript'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
