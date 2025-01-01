import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },

  // Home
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  // About
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },
  // Contact
  {
    path: '/contact',
    component: Layout,
    children: [
      {
        path: '',
        name: 'contact',
        component: () => import('@/views/contact/index.vue'),
      },
    ],
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
]

export default routes
