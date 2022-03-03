// 登录页
const login = [
  { 
    path: '/login', 
    component: () => import('@/views/login/Login.vue'),
    name: 'Login'
  }
]
// 首页
const home = [
  {
    path: '/home', 
    component: () => import('@/views/home/Home.vue'),
    name: 'Home'
  }
]

const routes: any = [
  ...login,
  {
    path: '/',
    component: () => import('@/views/layout/Layout.vue'),
    name:'Layout',
    redirect: '/home',
    children: [
      ...home
    ],
  }
]
const whiteList: any = ['/login']

export { routes, whiteList}