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
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },

  // 项目
  {
    path: '/projects',
    component: Layout,
    children: [
      {
        path: '',
        name: 'projects',
        component: () => import('@/views/projects/index.vue'),
      },
    ],
  },

  // 关于我
  {
    path: '/about',
    component: Layout,
    children: [
      {
        path: '',
        name: 'about',
        component: () => import('@/views/about/index.vue'),
      },
    ],
  },

  // 联系我
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
