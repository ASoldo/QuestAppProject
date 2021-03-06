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
    ],
    script: [
		  {
			src: "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
		  }
		],
  },
  env: {
		// MoralisServerUrl: 'https://p7wtiopjprfk.usemoralis.com:2053/server',
		MoralisServerUrl: process.env.MORALIS_SERVER_URL,
		MoralisAppId: process.env.MORALIS_APP_ID,
		// MoralisAppId: '3JI4zjKRRDeqAPc7SUrxWcyEZrSHMiCR3J9S9YRE',
		ContractId: process.env.CONTRACT_ID,
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
    // { src: '~/plugins/web3.client.js', mode: 'client' },
    { src: '~/plugins/moralis.client.js', mode: 'client' },

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-leaflet',
    '@nuxtjs/apollo',
     // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  oneSignal: {
    init: {
      appId: '384752d8-c273-4e52-96c4-dbe7642638bf',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
          disable: false
      }
    }
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
  },
  pwa: {
    icon: false, // disables the icon module
    manifest: {
      name: 'Quest App',
      lang: 'en',
      useWebmanifestExtension: false
    }
  },
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
    /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
  },
  // Custom server configurations
  server: {
    port: process.env.PORT || 8080, // default: 3000
    host: '0.0.0.0', // default: localhost,
    timing: false
  },
}
