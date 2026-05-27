// Raaijman-Fabian — persoonlijke CV-pagina op fabian.raaijman.nl.
// Standalone Nuxt 4 app, geen DB/auth/mail. Eén pagina die het CV rendert
// uit shared/data/cv-data.ts. Stap-voor-stap deploy: zie DEPLOY.md in
// Raaijman-Orchestrator.

import type { NuxtConfig } from 'nuxt/schema';

export default {
  compatibilityDate: '2026-05-18',
  devtools: { enabled: process.env.NUXT_DEVTOOLS === 'true' },

  modules: ['@nuxt/ui', '@nuxt/eslint'],

  ui: {
    fonts: false,
    colorMode: false,
    theme: {
      colors: ['primary', 'success', 'error', 'warning', 'info'],
    },
  },

  css: [
    '@fontsource/eb-garamond/400.css',
    '@fontsource/eb-garamond/500.css',
    '@fontsource/eb-garamond/600.css',
    '@fontsource/public-sans/400.css',
    '@fontsource/public-sans/600.css',
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      htmlAttrs: { lang: 'nl' },
      title: 'Fabian Raaijman — CV',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Curriculum Vitae van Fabian Raaijman.' },
      ],
    },
  },

  runtimeConfig: {
    public: {
      baseUrl: '',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  future: {
    compatibilityVersion: 4,
  },
} satisfies NuxtConfig;
