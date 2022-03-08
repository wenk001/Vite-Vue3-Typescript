<script setup lang="ts">
import {  ref, reactive, onMounted  } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { addFloor, updateFloor, findOneFloor } from '@/api/floor/floor'

const props = defineProps({
  showModal: Boolean,
  title: String,
  id: String
})
const showModal = ref(props.showModal)
const formRef = ref<FormInst | null>(null)
const model: any = reactive({
  buildingId: '', // 楼栋ID
  code: '', // 楼层编码
  image1: '', // 图片
  intro: '', // 简介
  mapCode: '', // 地图编码
  mapFile: '', // 地图文件
  mapZoom: '', // 地图缩放
  name: '', // 楼层名称
  opStatus: '', // 状态
  themeFile: '' // 主题文件
})
const rules: FormRules = {
  buildingId: [
    {
      required: true,
      message: '请输入ip',
      trigger: ['input', 'blur']
    }
  ],
  code: [
    {
      required: true,
      message: '请输入品牌',
      trigger: ['input', 'blur']
    }
  ],
  image1: [
    {
      required: true,
      message: '请输入类型',
      trigger: ['input', 'blur']
    }
  ],
  intro: [
    {
      required: true,
      message: '请输入电量',
      trigger: ['input', 'blur']
    }
  ],
  mapCode: [
    {
      required: true,
      message: '请输入设备编码',
      trigger: ['input', 'blur']
    }
  ],
  mapFile: [
    {
      required: true,
      message: '请输入连接状态',
      trigger: ['input', 'blur']
    }
  ],
  mapZoom: [
    {
      required: true,
      message: '请输入楼层ID',
      trigger: ['input', 'blur']
    }
  ],
  name: [
    {
      required: true,
      message: '请输入模式',
      trigger: ['input', 'blur']
    }
  ],
  opStatus: [
    {
      required: true,
      message: '请输入质量',
      trigger: ['input', 'blur']
    }
  ],
  themeFile: [
    {
      required: true,
      message: '请输入状态',
      trigger: ['input', 'blur']
    }
  ],
}
const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      if(props.id){
        model.id = props.id
        Update(model)
      }else{
        Add(model)
      }
    }
  })
}
const FindOne = async (id: any) => {
  let { data } = await findOneFloor({id: id})
  if(data.code === 200){
    Object.assign(model,data.data)
  }
}
const Add = async (par: any) => {
  let { data } = await addFloor(par)
  if(data.code === 200){
    (window as any).$message.success('添加成功！')
    showModal.value = false
    close(1)
  }
}
const Update = async (par: any) => {
  let { data } = await updateFloor(par)
  if(data.code === 200){
    (window as any).$message.success('修改成功！')
    showModal.value = false
    close(1)
  }
}
onMounted(() => {
  if(props.id){
    FindOne(props.id)
  }
})
const emit = defineEmits(['close'])
const close = (type: any) => {
  showModal.value = false
  emit("close", type)
}
</script>

<template>
<n-modal v-model:show="showModal" @mask-click="close(0)">
    <n-card style="width: 700px">
        <template #header>
          <div class="head">
            {{title}}
          </div>
        </template>
        <n-form ref="formRef" inline style="flex-wrap: wrap;justify-content: space-between;"  label-placement="left" :label-width="80" :model="model" :rules="rules">
          <n-form-item path="buildingId" label="楼栋ID">
            <n-input
              v-model:value="model.buildingId"
            />
          </n-form-item>
          <n-form-item path="code" label="楼层编码">
            <n-input
              v-model:value="model.code"
            />
          </n-form-item>
          <n-form-item path="image1" label="图片">
            <n-input
              v-model:value="model.image1"
            />
          </n-form-item>
          <n-form-item path="intro" label="简介">
            <n-input
              v-model:value="model.intro"
            />
          </n-form-item>
          <n-form-item path="mapCode" label="地图编码">
            <n-input
              v-model:value="model.mapCode"
            />
          </n-form-item>
          <n-form-item path="mapFile" label="地图文件">
            <n-input
              v-model:value="model.mapFile"
            />
          </n-form-item>
          <n-form-item path="mapZoom" label="地图缩放">
            <n-input
              v-model:value="model.mapZoom"
            />
          </n-form-item>
          <n-form-item path="name" label="楼层名称">
            <n-input
              v-model:value="model.name"
            />
          </n-form-item>
          <n-form-item path="opStatus" label="状态">
            <n-input
              v-model:value="model.opStatus"
            />
          </n-form-item>
          <n-form-item path="themeFile" label="主题文件">
            <n-input
              v-model:value="model.themeFile"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="model-footer">
            <div class="model-btn">
              <n-button attr-type="button" size="small" @click="close(0)">取消</n-button>
              <n-button type="primary" size="small" @click="onSubmit">确认</n-button>
            </div>
          </div>
        </template>
        <template #action></template>
      </n-card>
    </n-modal>
</template>

<style scoped lang="less">
.n-card-header{
  background: @gColor;
}
</style>