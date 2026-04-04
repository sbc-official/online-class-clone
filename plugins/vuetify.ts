import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#1867C0',
            'primary-darken-1': '#1F5592',
            secondary: '#48A9A6',
            'secondary-darken-1': '#018786',
            success: '#4CAF50',
            error: '#B00020',
            warning: '#FB8C00',
            info: '#2196F3',
            background: '#FFFFFF',
            surface: '#FFFFFF',
            'surface-bright': '#FFFFFF',
            'surface-light': '#EEEEEE',
            'surface-variant': '#424242',
            'on-surface-variant': '#EEEEEE',
          },
        },
      },
    },
    defaults: {
      VBtn: {
        variant: 'flat',
        style: 'text-transform: none; letter-spacing: 0;',
      },
    },
  })

  app.vueApp.use(vuetify)
})
