<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

</script>

<template>
  <div class="layout">
    <n-layout has-sider>
      <n-layout-sider bordered>
        海淀桥
      </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>颐和园路</n-layout-header>
      <n-layout-content bordered>
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
    background: rgba(228, 210, 52, 0.2);
  }
  .n-layout-sider {
    height: 100vh;
    background: rgba(27, 175, 106, 0.3);
  }
  .n-layout-content {
    height: calc(100vh - 50px);
    background: rgba(40, 24, 180, 0.4);
  }
}
</style>
