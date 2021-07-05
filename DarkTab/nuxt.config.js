export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DarkTab',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'A task managing tool'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        property: 'og:title',
        content: 'DarkTab'
      },
      {
        property: 'og:description',
        content: 'A task managing tool'
      },
      {
        property: 'og:image',
        content: '/img/tasks-512.png'
      },
      {
        property: 'og:url',
        content: 'https://dark-tab.web.app'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/img/favicon.png'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      }
    ],
    script: [{
      src: '/swStarter.js'
    }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/space-mono/stylesheet.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/files/'
  },
  generate: {
    dir: 'DarkTab',
    subFolders: false
  }
}
