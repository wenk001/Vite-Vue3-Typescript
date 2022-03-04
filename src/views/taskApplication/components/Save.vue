<script setup lang="ts">
import { h, ref, toRefs, reactive, nextTick, onMounted,defineProps,defineEmits,defineExpose  } from 'vue'
import { FormInst, FormRules } from 'naive-ui'
import { add, update, findOn } from '@/api/taskApplication/taskApplication'

const props = defineProps({
  showModal: Boolean,
  title: String,
  id: String
})
const { showModal, title, id } = toRefs(props)
interface ModelType {
  id: string | null
  ip: string | null
  brand: string | null
  provider: string | null
  brandName: string | null
}
const formRef = ref<FormInst | null>(null)
const model = ref<ModelType>({
  id: '',
  ip: '',
  brand: '',
  provider: '',
  brandName: ''
})
const rules: FormRules = {
  id: [
    {
      required: true,
      message: '请输入id',
      trigger: ['input', 'blur']
    }
  ],
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
const onSubmit = () => {

}
const FindOn = async (id: any) => {
  let { data } = await findOn({id: id})
  if(data.code === 200){

  }
}
onMounted(() => {
  if(id){
    FindOn(id)
  }
})
const emit = defineEmits(['close'])
const close = (type: any) => {
  showModal.value = false
  emit("close", type)
}
defineExpose({
    close
})
</script>

<template>
<n-modal v-model:show="showModal">
    <n-card style="width: 600px" :title="title">
        <template #header-extra></template>
        <n-form ref="formRef" label-placement="left" :label-width="80" :model="model" :rules="rules">
          <n-form-item path="id" label="ID">
            <n-input
              v-model:value="model.id"
            />
          </n-form-item>
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