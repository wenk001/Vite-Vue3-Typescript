<script setup lang="ts">
import { onMounted, ref, watch} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Menu from '@/views/layout/components/Menu.vue'
import Head from '@/views/layout/components/Head.vue'
const collapsed = ref(false)
const router = useRouter()
const route = useRoute()
const activeMenu = ref('/home')
const menuRecordList: any = ref([])
const handleCloseMenu = (url: any) => {
  let index = menuRecordList.value.findIndex((v: any) => { return v.url === url })
  menuRecordList.value.splice(index, 1)
  saveMenuList()
  if(index > 0){
    goToUrl(menuRecordList.value[index - 1].url)
  }else{
    goToUrl('/home')
  }
}
const goToUrl = (url: any) => {
  activeMenu.value = url
  router.push({path: url})
}
const closeAll = () => {
  menuRecordList.value = []
  saveMenuList()
  goToUrl('/home')
}
const addMenu = (par: any) => {
  if(menuRecordList.value.findIndex((v: any) => { return v.url === par.url }) === -1){
    menuRecordList.value.push(par)
    saveMenuList()
  }
  activeMenu.value = par.url
}
const menuList = ref(['home'])
const saveMenuList = () => {
  let par: any = []
  menuRecordList.value.forEach((v: any) => {
    par.push(v.url.split('/')[1])
  })
  menuList.value = ['home', ...par]
  sessionStorage.setItem('menuRecordList', JSON.stringify(menuRecordList.value))
}
onMounted(() => {
  if(sessionStorage.getItem('menuRecordList')){
    let par = JSON.parse((sessionStorage.getItem('menuRecordList') as any))
    menuRecordList.value = par
    activeMenu.value = route.path
    saveMenuList()
  }
})
</script>

<template>
  <div class="layout">
    <n-layout has-sider>
      <n-layout-sider  
        collapse-mode="width"
        :collapsed-width="0"
        :width="240"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        show-trigger="bar" 
        :native-scrollbar="false">
        <Menu @addMenu="addMenu"/>
      </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <Head/>
      </n-layout-header>
      <n-layout-content :native-scrollbar="false">
        <div class="menuRecord">
          <n-tabs type="card" closable :value="activeMenu" @close="handleCloseMenu" @update:value="goToUrl">
            <n-tab :closable="false" name="/home">
              首页
            </n-tab>
            <n-tab v-for="(i,k) in menuRecordList" :key="k" :name="i.url">
              {{i.name}}
            </n-tab>
            <template #suffix>
              <n-button v-if="menuRecordList.length > 0" text @click="closeAll">关闭全部</n-button>
            </template>
          </n-tabs>
        </div>
        <router-view v-slot="{ Component }">
          <keep-alive :include="menuList">
            <component :is="Component"/>
          </keep-alive>
        </router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
  </div>
</template>

<style scoped lang="less">
.layout{
  .n-layout-header{
    height: 50px;
    background: @gColor;
  }
  .n-layout-sider {
    height: 100vh;
    background: @gColor;
  }
  .n-layout-content {
    height: calc(100vh - 50px);
  }
  .menuRecord{
    box-sizing: border-box;
    padding: 6px 24px;
    height: 50px;
  }
}
</style>
