// nuxt.config.ts
declare const process: {
  env: { [key: string]: string | undefined }
}

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // ✅ SSR ՄԻԱՑՆԵԼ (Այս կետը կարևորագույնն է)
  ssr: true,

  alias: {
    '~': './app',
    '@': './app'
  },

  modules: [
    '@nuxtjs/i18n'
  ],

  site: {
    url: process.env.BASE_URL || 'https://www.autoswift.shop',
    name: process.env.SITE_NAME || 'AutoSwift'
  },

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'https://www.autoswift.shop',
      apiBase: process.env.API_BASE_URL || 'https://autback.onrender.com',
      siteName: process.env.SITE_NAME || 'AutoSwift',
      defaultOgImage: 'https://www.autoswift.shop/images/og-image.jpg',
      logoUrl: 'https://www.autoswift.shop/dd.jfif'
    }
  },

  sitemap: {
    enabled: true,
    gzip: true,
    exclude: ['/admin/**']
  },

  // ✅ RENDER CONFIGURATION
  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    minify: true,
    // ✅ Caching for better performance
    headers: {
      'Cache-Control': 'public, max-age=3600'
    }
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'hy'
      },
      title: 'AutoSwift - ավտոմեքենաների խանութ',
      titleTemplate: '%s · AutoSwift',
      
      link: [
        {
          rel: 'icon',
          type: 'image/jpeg',
          href: '/aa.jpg'
        },
        {
          rel: 'canonical',
          href: 'https://www.autoswift.shop'
        },
        // ✅ Preconnect to API
        {
          rel: 'preconnect',
          href: 'https://autback.onrender.com'
        }
      ],

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#667eea' },
        {
          name: 'description',
          content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։'
        },
        {
          name: 'keywords',
          content: 'ավտոմեքենա, մեքենա գնել, ավտոմեծ, վաճառք'
        },

        // ✅ FACEBOOK / OPEN GRAPH - ՀԻՄՆԱԿԱՆ
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:site_name',
          content: 'AutoSwift'
        },
        {
          property: 'og:locale',
          content: 'hy_AM'
        },
        {
          property: 'og:url',
          content: 'https://www.autoswift.shop'
        },
        {
          property: 'og:title',
          content: 'AutoSwift - ավտոմեքենաների խանութ'
        },
        {
          property: 'og:description',
          content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։'
        },
        {
          property: 'og:image',
          content: 'https://www.autoswift.shop/images/logs.jpg'
        },
        {
          property: 'og:image:width',
          content: '1200'
        },
        {
          property: 'og:image:height',
          content: '630'
        },
        {
          property: 'og:image:type',
          content: 'image/jpeg'
        },
        {
          property: 'og:image:alt',
          content: 'AutoSwift - ավտոմեքենաների խանութ'
        },

        // ✅ TWITTER CARD
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: '@AutoSwiftAM'
        },
        {
          name: 'twitter:title',
          content: 'AutoSwift - ավտոմեքենաների խանութ'
        },
        {
          name: 'twitter:description',
          content: 'AutoSwift – մեծ ընտրանի ավտոմեքենաներ անվտանգ ներմուծման և վաճառքի ծառայություններով։'
        },
        {
          name: 'twitter:image',
          content: 'https://www.autoswift.shop/images/logs.jpg'
        },

        // ✅ MOBILE & APP
        {
          name: 'mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        },
        {
          name: 'apple-mobile-web-app-title',
          content: 'AutoSwift'
        },

        // ✅ SEO
        {
          name: 'robots',
          content: 'index, follow'
        },
        {
          name: 'language',
          content: 'Armenian'
        }
      ]
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'hy',
    baseUrl: 'https://www.autoswift.shop',
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
  }
})