<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menu from '@/views/layout/components/Menu.vue'
import Head from '@/views/layout/components/Head.vue'
const collapsed = ref(false)
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
        <router-view></router-view>
      </n-layout-content>
    </n-layout>
  </n-layout>
  </div>
</template>

<style scoped lang="less">
.layout{
  .n-layout-header{
    height: 50px;
  }
  .n-layout-sider {
    height: 100vh;
    background: rgba(9, 150, 84, 0.301);
  }
  .n-layout-content {
    height: calc(100vh - 50px);
    background: rgba(40, 24, 180, 0.4);
  }
}
</style>
