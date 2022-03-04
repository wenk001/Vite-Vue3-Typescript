<script setup lang="ts">
import {  ref, nextTick, onMounted  } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { add, update, findOn } from '@/api/taskApplication/taskApplication'

const props = defineProps({
  showModal: Boolean,
  title: String,
  id: String
})
const showModal = ref(props.showModal)
const formRef = ref<FormInst | null>(null)
const model: any = ref({
  ip: '',
  brand: '',
  provider: '',
  brandName: ''
})
const rules: FormRules = {
  ip: [
    {
      required: true,
      message: '请输入ip',
      trigger: ['input', 'blur']
    }
  ],
  brand: [
    {
      required: true,
      message: '请输入品牌',
      trigger: ['input', 'blur']
    }
  ],
  provider: [
    {
      required: true,
      message: '请输入类型',
      trigger: ['input', 'blur']
    }
  ],
  brandName: [
    {
      required: true,
      message: '请输入名称',
      trigger: ['input', 'blur']
    }
  ],
}
const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      if(props.id){
        model.value.id = props.id
        Update(model.value)
      }else{
        Add(model.value)
      }
    }
  })
}
const FindOn = async (id: any) => {
  let { data } = await findOn({id: id})
  if(data.code === 200){
    Object.assign(model,data.data)
  }
}
const Add = async (par: any) => {
  let { data } = await add(par)
  if(data.code === 200){
    (window as any).$message.success('添加成功！')
    showModal.value = false
    close(1)
  }
}
const Update = async (par: any) => {
  let { data } = await update(par)
  if(data.code === 200){
    (window as any).$message.success('修改成功！')
    showModal.value = false
    close(1)
  }
}
onMounted(() => {
  if(props.id){
    FindOn(props.id)
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
    <n-card style="width: 400px" :title="title">
        <template #header-extra></template>
        <n-form ref="formRef" label-placement="left" :label-width="80" :model="model" :rules="rules">
          <n-form-item path="ip" label="IP">
            <n-input
              v-model:value="model.ip"
            />
          </n-form-item>
          <n-form-item path="brand" label="品牌">
            <n-input
              v-model:value="model.brand"
            />
          </n-form-item>
          <n-form-item path="provider" label="类型">
            <n-input
              v-model:value="model.provider"
            />
          </n-form-item>
          <n-form-item path="brandName" label="名称">
            <n-input
              v-model:value="model.brandName"
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

</style>