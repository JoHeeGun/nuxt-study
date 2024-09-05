// import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-swiper',
    '@pinia/nuxt',
    '@nuxt/devtools',
  ],
  css: [
    '@/assets/css/main.css',
  ], 
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  app: {
    head: {
      title: 'denver nuxt3'
    }
  },
   
  
})