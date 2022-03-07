<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { Balloon, CaretDownOutline, BicycleSharp, Barbell, BarChart, Body, BriefcaseSharp, BowlingBall, Boat, Beer } from '@vicons/ionicons5'
import { asideIndex } from '@/api/layout/layout'


const iconList: any = {
  'Balloon': Balloon,
  'BicycleSharp': BicycleSharp,
  'Barbell': Barbell,
  'BarChart': BarChart,
  'Body': Body,
  'BriefcaseSharp': BriefcaseSharp,
  'BowlingBall': BowlingBall,
  'Boat': Boat,
  'Beer': Beer
}
const props = defineProps({
  collapsed: Boolean
})

const menuOptions: any = ref([])
const renderMenuLabel = (option: any) => {
  if (option.object.url) {
    return h(
      RouterLink,
      { to: { path: option.object.url } },
      { default: () => option.text as string }
    )
  }
  return option.text as string
}
const renderIcon = (icon: any) => {
  if(iconList[icon]){
    return () => h(NIcon, null, { default: () => h(iconList[icon]) })
  }
  return () => { return true }
}
const expandIcon = (option: any) => {
  if(option.children.length > 0){
    return h(NIcon, null, { default: () => h(CaretDownOutline) })
  }
  return null
}
const deepObject = (obj: any) => {
  obj.forEach((v: any) => {
    v.icon = renderIcon(v.icon)
    if(v.children.length > 0){
      deepObject(v.children)
    }
  })
}
const AsideIndex = async () => {
  let { data } = await asideIndex({})
  if(data.code === 200){
    deepObject(data.data.functionList)
    menuOptions.value = data.data.functionList
  }
  console.log(menuOptions.value)
}
onMounted(() => {
  AsideIndex()
})      
</script>

<template>
  <div class="menu">
    <div class="logo">磅旗科技</div>
    <n-menu
      accordion
      children-field="children"
      key-field="id"
      label-field="text"
      :collapsed="collapsed"
      :collapsed-width="0"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :render-label="renderMenuLabel"
      :expand-icon="expandIcon"
    />
  </div>
</template>

<style scoped lang="less">
.menu{
  .logo{
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
