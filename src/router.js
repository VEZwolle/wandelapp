import { createRouter, createWebHistory } from 'vue-router'
import App from './components/App'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: App
    },
    {
      name: 'checkpoint',
      path: '/:code?/:video?',
      component: App,
      props: true
    },
    {
      name: 'info',
      path: '/info',
      component: App,
      props: { page: 'info' }
    },
    {
      name: 'download',
      path: '/download',
      component: App,
      props: { page: 'download' }
    }
  ]
})

router.afterEach((to) => {
  window.gtag('config', process.env.VUE_APP_GOOGLE_ANALYTICS_ID, {
    page_path: to.path
  })
})

export default router
