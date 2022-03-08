<script setup lang="ts">
import {  ref, reactive, onMounted  } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { add, update, findOne } from '@/api/taskApplication/taskApplication'

const props = defineProps({
  showModal: Boolean,
  title: String,
  id: String
})
const showModal = ref(props.showModal)
const formRef = ref<FormInst | null>(null)
const model: any = reactive({
  ip: '', // ip
  brand: '', // 设备品牌
  charge: '', // 电量
  code: '', // 设备编码
  conneStatus: '', // 连接状态
  floorId: '', // 楼层ID
  model: '', //模式
  positiQuality: '', //质量
  provider: '', // 类型
  status: '', //状态
  useStatus: '' // 可用状态
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
  charge: [
    {
      required: true,
      message: '请输入电量',
      trigger: ['input', 'blur']
    }
  ],
  code: [
    {
      required: true,
      message: '请输入设备编码',
      trigger: ['input', 'blur']
    }
  ],
  conneStatus: [
    {
      required: true,
      message: '请输入连接状态',
      trigger: ['input', 'blur']
    }
  ],
  floorId: [
    {
      required: true,
      message: '请输入楼层ID',
      trigger: ['input', 'blur']
    }
  ],
  model: [
    {
      required: true,
      message: '请输入模式',
      trigger: ['input', 'blur']
    }
  ],
  positiQuality: [
    {
      required: true,
      message: '请输入质量',
      trigger: ['input', 'blur']
    }
  ],
  status: [
    {
      required: true,
      message: '请输入状态',
      trigger: ['input', 'blur']
    }
  ],
  useStatus: [
    {
      required: true,
      message: '请输入可用状态',
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
  let { data } = await findOne({id: id})
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
          <n-form-item path="charge" label="电量">
            <n-input
              v-model:value="model.charge"
            />
          </n-form-item>
          <n-form-item path="code" label="设备编码">
            <n-input
              v-model:value="model.code"
            />
          </n-form-item>
          <n-form-item path="conneStatus" label="连接状态">
            <n-input
              v-model:value="model.conneStatus"
            />
          </n-form-item>
          <n-form-item path="floorId" label="楼层ID">
            <n-input
              v-model:value="model.floorId"
            />
          </n-form-item>
          <n-form-item path="model" label="模式">
            <n-input
              v-model:value="model.model"
            />
          </n-form-item>
          <n-form-item path="positiQuality" label="质量">
            <n-input
              v-model:value="model.positiQuality"
            />
          </n-form-item>
          <n-form-item path="provider" label="类型">
            <n-input
              v-model:value="model.provider"
            />
          </n-form-item>
          <n-form-item path="status" label="状态">
            <n-input
              v-model:value="model.status"
            />
          </n-form-item>
          <n-form-item path="useStatus" label="可用状态">
            <n-input
              v-model:value="model.useStatus"
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