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
// AGV管理
const taskApplication = [
  {
    path: '/taskApplication',
    component: () => import('@/views/taskApplication/TaskApplication.vue'),
    name: 'TaskApplication'
  }
]
const routes: any = [
  ...login,
  {
    path: '/',
    component: () => import('@/views/layout/LayoutBlock.vue'),
    name:'Layout',
    redirect: '/home',
    children: [
      ...home, ...taskApplication
    ],
  }
]
const whiteList: any = ['/login']

export { routes, whiteList}