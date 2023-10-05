import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "E-Query Doc",
  description: "an easy and effortless API calls manager to reduce and optimize your API calls, on the client.",
  lang: 'en-US',
  lastUpdated: true,

  themeConfig: {
    logo: 'imgs/logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/getting-started' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'useQuery()', link: '/use-query' },
          { text: 'Options', link: '/options' },
          { text: 'getQuery()', link: '/get-query' },
          { text: 'Other APIs', link: '/more-api' },
          { text: 'Contribute', link: '/contribute' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mjkhonline/e-query' }
    ],

    search: {
      provider: 'local'
    }
  }
})
