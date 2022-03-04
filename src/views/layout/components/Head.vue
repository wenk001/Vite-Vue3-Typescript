<script setup lang="ts">
import { h, ref, onMounted } from 'vue'
import type { Component } from 'vue'
import {
  NIcon,
  FormInst,
  FormItemInst,
  FormItemRule,
  FormRules
} from 'naive-ui'
import { logout, changePassword } from '@/api/login/login'
import { getUserName, removeUserName, removeToken } from '@/utils/cookie';
import { useRouter } from 'vue-router'
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
const router = useRouter()
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
    if(key === 'logout'){
      Logout()
    }
    if(key === 'editPassword'){
      showModal.value = true
      model.value.oldPassword = ''
      model.value.password = ''
      model.value.reenteredPassword = ''
    }
}
const Logout = async () =>{
  let { data } = await logout({})
  if(data.code == 200) {
    removeUserName()
    removeToken()
    router.push({path: '/login'})
  }
}

const showModal = ref(false)
const onSubmit = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      ChangePassword()
      showModal.value = false
    }
  })
}

interface ModelType {
  oldPassword: string | null
  password: string | null
  reenteredPassword: string | null
}
const formRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const model = ref<ModelType>({
  oldPassword: '',
  password: '',
  reenteredPassword: ''
})
const validatePasswordStartWith =  (
      rule: FormItemRule,
      value: string
): boolean => {
      return (
        !!model.value.password &&
        model.value.password.startsWith(value) &&
        model.value.password.length >= value.length
      )
    }
const validatePassword = (rule: FormItemRule, value: string): boolean => {
      let reg: any = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/)
      return value !== '' && reg.test(value)
    }
const validatePasswordSame = (rule: FormItemRule, value: string): boolean => {
      return value === model.value.password
    }
const rules: FormRules = {
  oldPassword: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: ['input', 'blur']
    }
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
      message: '密码格式不正确',
      trigger: ['input', 'blur']
    }
  ],
  reenteredPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur']
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input'
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input']
    }
  ]
}
const handlePasswordInput = () => {
  if (model.value.reenteredPassword) {
    rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
  }
}
const ChangePassword = async () => {
  let params: any = {
    oldPassword: model.value.oldPassword,
    password: model.value.password,
  }
  const { data } = await changePassword(params)
  if(data.code == 200) {
    (window as any).$message.success('密码修改成功，请重新登录')
    removeUserName()
    removeToken()
    setTimeout(() => {
      router.push({path: '/login'})
    },1200)
  }
}
const userName: any = ref('未知用户') 
onMounted(()=>{
  userName.value = getUserName()
})
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
            {{userName}}
        </n-button>
    </n-dropdown>
  </div>
  <n-modal v-model:show="showModal">
    <n-card style="width: 400px" title="修改密码">
      <template #header-extra></template>
      <p class="tips"><i>注意：密码必须同时包含数字跟字母且在20个字符以内</i></p>
      <n-form ref="formRef" label-placement="left" :label-width="80" :model="model" :rules="rules">
        <n-form-item path="oldPassword" label="旧密码">
          <n-input
            v-model:value="model.oldPassword"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="model.password"
            type="password"
            @input="handlePasswordInput"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item
          ref="rPasswordFormItemRef"
          first
          path="reenteredPassword"
          label="重复密码"
        >
          <n-input
            v-model:value="model.reenteredPassword"
            :disabled="!model.password"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <div class="model-footer">
          <div class="model-btn">
            <n-button attr-type="button" size="small" @click="showModal = false">取消</n-button>
            <n-button type="primary" size="small" @click="onSubmit">确认</n-button>
          </div>
        </div>
      </template>
      <template #action></template>
    </n-card>
  </n-modal>
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
.tips{
  color: red;
  font-size: 12px;
}
</style>
