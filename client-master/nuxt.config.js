import { get } from 'axios';
import bodyParser from 'body-parser'
import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  bridge: false,
  capi: true,
  server: {
    port: 8080,
  },

  debug: true,
  unwrapInjectedRef: true,
  head: {
    titleTemplate: "چاپکس | %s",
    title: "چاپکس",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.png"
      }
    ]
  },
  modules: ['@nuxtjs/axios'],
  buildModules: [
    "@nuxtjs/dotenv",
    "@nuxtjs/vuetify",
  ],

  components: [
    {
      path: "~/components/main/",
      pathPrefix: false,
    },
    {
      path: "~/components/global/UI",
      prefix: "ui",
      pathPrefix: false,
    }
  ],
  plugins: [
    {
      src: "~/plugins/global-components",
      mode: "client",
    },
    {
      src: "~/plugins/toasted",
      mode: "client"
    },
    "~/plugins/axios/axios",
    "~/plugins/axios/auth-axios",
    "~/plugins/add-mixins",
    "~/plugins/TiptapVuetify",
    "~/plugins/vue-json-pretty",
    "~/plugins/vue-gtag",
    "~/plugins/vue-json-excel",
    "~/plugins/chart.js"
  ],
  css: ["@fortawesome/fontawesome-svg-core/styles.css", "vue-json-pretty/lib/styles.css"],

  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'https://chapex.iran.liara.run/api/',
      changeOrigin: true
    }
  },
  sitemap: {
    sitemaps: [
      {
        path: '/page-sitemap.xml',
        exclude: [
          '/admin',
          '/admin/**',
          '/auth',
          '/auth/**',
          '/cart',
          '/comment',
          '/deliveryStatus',
          '/designStandard',
          '/designStatus',
          '/payment',
          '/payment/**',
          '/profile',
          '/profile/**',
          '/test',
          '/test/**',
          '/saeidev',
          '/afterPayment',
          '/salePage',
        ],
      },
      {
        path: '/product-sitemap.xml',
        exclude: ['/**'],
        routes: async () => {
          const { data } = await get(`${process.env.BASE_URL_SERVER}/home/getSiteMap/salePage`);
          return data.map((salePage) => `/salePage/${salePage.TPS_FLink}`);
        }
      },
      {
        path: '/category-sitemap.xml',
        exclude: ['/**'],
        routes: async () => {
          const { data } = await get(`${process.env.BASE_URL_SERVER}/home/getSiteMap/category`);
          return data.map((category) => `/category/${category.TD_FCaption}`);
        }
      },
    ],
  },
  vuetify: {
    customVariables: ["~/assets/variables.scss"]
  },
  build: { transpile: ['vuetify/lib', "tiptap-vuetify"] },

  serverMiddleware: [
    { path: '/payment/sepReturn', handler: '~/server-middleware/postRequestHandler.js' },
    bodyParser.json()
  ]
})
