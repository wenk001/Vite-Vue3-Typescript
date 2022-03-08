<script setup lang="ts">
import {  ref, reactive, onMounted  } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { add, update, findOne } from '@/api/floor/floor'

const props = defineProps({
  showModal: Boolean,
  title: String,
  id: String
})
const showModal = ref(props.showModal)
const formRef = ref<FormInst | null>(null)
const model: any = reactive({
  code: '', // 楼栋编码
  image1: '', // 图片
  indexing: null, // 序号
  intro: '', // 简介
  name: '', // 楼栋名称
  opStatus: '', // 状态
})
const rules: FormRules = {
  code: [
    {
      required: true,
      message: '请输入ip',
      trigger: ['input', 'blur']
    }
  ],
  image1: [
    {
      required: true,
      message: '请输入品牌',
      trigger: ['input', 'blur']
    }
  ],
  indexing: [
    {
      type: 'number',
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
  name: [
    {
      required: true,
      message: '请输入设备编码',
      trigger: ['input', 'blur']
    }
  ],
  opStatus: [
    {
      required: true,
      message: '请输入连接状态',
      trigger: ['input', 'blur']
    }
  ]
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
          <n-form-item path="code" label="楼栋编码">
            <n-input
              v-model:value="model.code"
            />
          </n-form-item>
          <n-form-item path="image1" label="图片">
            <n-input
              v-model:value="model.image1"
            />
          </n-form-item>
          <n-form-item path="indexing" label="序号">
            <n-input-number
              v-model:value="model.indexing"
            />
          </n-form-item>
          <n-form-item path="intro" label="简介">
            <n-input
              v-model:value="model.intro"
            />
          </n-form-item>
          <n-form-item path="name" label="楼栋名称">
            <n-input
              v-model:value="model.name"
            />
          </n-form-item>
          <n-form-item path="opStatus" label="状态">
            <n-input
              v-model:value="model.opStatus"
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