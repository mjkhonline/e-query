import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "E-Query Doc",
  description: "an easy and effortless API calls manager to reduce and optimize your API calls, on the client.",
  lang: 'en-US',
  base: '/e-query/',
  lastUpdated: true,
  head:[
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/logo.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/logo.png"}]
  ],

  themeConfig: {
    logo: 'logo.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get Started', link: '/get-started' }
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
