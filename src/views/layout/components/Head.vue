<script setup lang="ts">
import { h, defineComponent } from 'vue'
import type { Component } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'


const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
const options = [
        {
          label: '修改密码',
          key: 'editPassword',
          icon: renderIcon(EditIcon)
        },
        {
          label: '退出登录',
          key: 'logout',
          icon: renderIcon(LogoutIcon)
        }
      ]
const handleSelect = (key: any) => {
    console.log(key)
}
</script>

<template>
  <div class="head">
    <n-dropdown :options="options" @select="handleSelect">
        <n-button text>
            <template #icon>
            <n-icon>
                <user-icon />
            </n-icon>
            </template>
            用户名
        </n-button>
    </n-dropdown>
  </div>
</template>

<style scoped lang="less">
.head{
 width: 100%;
 height: 100%;
 box-sizing: border-box;
 padding-right: 24px;
 display: flex;
 flex-flow: row-reverse;
 justify-items: center;
}
</style>
