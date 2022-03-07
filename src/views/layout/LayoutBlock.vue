<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menu from '@/views/layout/components/Menu.vue'
import Head from '@/views/layout/components/Head.vue'
const collapsed = ref(false)
const menuRecordList = ref([
  {
    name: 'test1',
    url: '/home'
  },
  {
    name: 'test2',
    url: '/'
  }
])
const handleCloseMenu = () => {

}
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
        <Menu/>
      </n-layout-sider>
    <n-layout>
      <n-layout-header>
        <Head/>
      </n-layout-header>
      <n-layout-content :native-scrollbar="false">
        <div class="menuRecord">
          <n-tabs type="card" closable @close="handleCloseMenu">
            <template #prefix>
              <n-button text @click="">首页</n-button>
            </template>
            <n-tab v-for="(i,k) in menuRecordList" :key="k" :name="i.name">
              {{i.name}}
            </n-tab>
            <template #suffix>
              <n-button text>关闭全部</n-button>
            </template>
          </n-tabs>
        </div>
        <keep-alive include="TaskApplication">
          <router-view ></router-view>
        </keep-alive>
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
