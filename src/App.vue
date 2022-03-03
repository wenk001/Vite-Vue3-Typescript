<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Message from '@/components/message.vue'
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'
</script>

<template>
<n-message-provider>
  <n-dialog-provider>
    <Message />
  </n-dialog-provider>
</n-message-provider>

<router-view></router-view>
</template>

<style lang="less">
#app {
  margin: 0;
  padding: 0;
}
</style>
