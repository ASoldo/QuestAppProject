import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - quest-app',
    title: 'quest-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'leaflet/dist/leaflet.css',
    'animate.css/animate.css',
    'leaflet-routing-machine/dist/leaflet-routing-machine.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue2-leaflet-markercluster.js', mode:'client'},
    { src: '~/plugins/vuex-persist.client.js', mode: 'client' },
    { src: '~/plugins/leaflet-routing-machine.client.js', mode: 'client' },
    { src: '~/plugins/geocoder.client.js', mode: 'client' },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-leaflet',
    '@nuxtjs/apollo',
  ],
  // Apollo configuration
  // httpEndpoint: 'https://beta.pokeapi.co/graphql/v1beta',
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://iwork-api.herokuapp.com/graphql',
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  // Custom server configurations
  server: {
    port: process.env.PORT || 8080, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  }
}