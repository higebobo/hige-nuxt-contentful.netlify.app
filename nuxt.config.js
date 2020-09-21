require('dotenv').config() // 追記

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'hige-nuxt-contentful.netlify.app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    'plugins/contentful'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/markdownit'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  markdownit: {
    injected: true,   // 「$md」でどこからでも使えるようにする
    breaks: true      // 改行を<br/>に変換する
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  env: {
    // contentful
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_BLOG_POST_TYPE_ID: process.env.CTF_BLOG_POST_TYPE_ID,
    CTF_CDA_ACCESS_TOKEN: process.env.CTF_CDA_ACCESS_TOKEN
  }
}
