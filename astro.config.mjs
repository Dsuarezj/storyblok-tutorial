import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import storyblok from '@storyblok/astro'
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
const env = loadEnv("", process.cwd(), 'STORYBLOK')

let storyblokispreview = env.STORYBLOK_IS_PREVIEW;
console.log('***** storyblokispreview', storyblokispreview)
export default defineConfig({
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: storyblokispreview === 'yes',
      output: 'static',
      components: {
        page: 'storyblok/Page',
        config: 'storyblok/Config',
        feature: 'storyblok/Feature',
        grid: 'storyblok/Grid',
        teaser: 'storyblok/Teaser',
        hero: 'storyblok/Hero',
        'popular-articles': 'storyblok/PopularArticles',
        'all-articles': 'storyblok/AllArticles',
        article: 'storyblok/Article',
      },
    }),
    tailwind()
  ],
  vite: {
    plugins: [basicSsl()],
    server: {
      https: true,
    },
  },
  adapter: vercel()
})
