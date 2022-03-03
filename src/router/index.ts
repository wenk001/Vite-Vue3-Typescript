import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '@/utils/cookie'
// 还有 createWebHistory 和 createMemoryHistory
import { routes, whiteList } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if(token){
    // 存在token（登录后有token）
    if(to.path === '/login'){
      // 已登录情况下则跳转到首页
      next('/home')
    }else{
      // 否则直接跳转
      next()
    }
  }else{
    // 不存在token，根据白名单来跳转
    if(whiteList.includes(to.path)){
      // 在白名单内，无限制，直接跳转
      next()
    }else{
      // 否则跳转到登录页面
      next('/login')
    }
  }

})

export default router
