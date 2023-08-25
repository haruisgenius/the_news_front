import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("../views/UserHome.vue")
    },
    {
      path: '/news-content/:serialNumber?',
      name: 'NewsContent',
      component: () => import('../views/NewsContent.vue')
    },
    {
      path: '/manager-home',
      name: 'ManagerHome',
      component: () => import('../views/ManagerHome.vue')
    },
    {
      path: '/create-news',
      name: 'CreateNews',
      component: () => import('../views/CreateNews.vue')
    },
    {
      path: '/update-news/:serialNumber?',
      name: 'UpdateNews',
      component: () => import('../views/UpdateNews.vue')
    },
    
  ]
})

export default router
