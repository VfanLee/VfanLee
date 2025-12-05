const routes = [
  {
    path: '/',
    redirect: '/home',
  },

  // Home
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
  },

  // 联系我
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/contact/index.vue'),
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home',
  },
]

export default routes
