// Allow usage of `process.env` without @types/node
declare const process: {
  env: { [key: string]: string | undefined }
}

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: { enabled: true },

  alias: {
    '~': './app',
    '@': './app'
  },

  modules: [
    '@nuxtjs/i18n'
  ],

  // ✅ Nuxt 4 SEO base
  site: {
    url: process.env.BASE_URL || 'http://localhost:3000',
    name: process.env.SITE_NAME || 'AutoWeb'
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
      apiBase: process.env.API_BASE_URL || 'https://autback.onrender.com',

      siteName: process.env.SITE_NAME || 'AutoWeb',
      defaultOgImage: '/images/hero-bg.jpg'
    }
  },

  // ✅ Built-in sitemap
  sitemap: {
    enabled: true,
    gzip: true,
    exclude: ['/admin/**']
  },

  app: {
    head: {
      title: 'AutoWeb - Ուղիղ ավտոմեքենաների խանութ',
      titleTemplate: '%s · AutoWeb',
      meta: [
        { name: 'theme-color', content: '#667eea' },
        {
          name: 'description',
          content: 'AutoWeb – large selection of cars with secure import and sales services.'
        },
        {
          property: 'og:site_name',
          content: process.env.SITE_NAME || 'AutoWeb'
        },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'hy',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    lazy: true,

    locales: [
      { code: 'hy', iso: 'hy-AM', name: 'Հայերեն', file: 'hy.json' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],

    langDir: 'locales',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true
    }
  },

  // ✅ Render.com-ի համար օպտիմիզացիա
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true
  }
})