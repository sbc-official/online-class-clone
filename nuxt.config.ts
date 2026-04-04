import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    '~/assets/css/main.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    plugins: [
      vuetify({ autoImport: true }),
    ],
  },
  app: {
    head: {
      title: 'オンラインクラス',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Lato:wght@400;700&display=swap',
        },
      ],
    },
  },
})
