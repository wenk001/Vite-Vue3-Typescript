<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { CashOutline as CashIcon } from '@vicons/ionicons5'
import { login } from '@/api/login/login'
import { setToken, setUserName } from '@/utils/cookie';
import {
  FormInst,
  FormRules
} from 'naive-ui'

interface ModelType {
  username: string | null
  password: string | null
}
const router = useRouter()
const loadingRef = ref(false)
const formRef = ref<FormInst | null>(null)
const modelRef = ref<ModelType>({
  username: '',
  password: ''
})
const rules: FormRules = {
  username: [{ required: true,message: '请输入用户名', trigger: 'blur'}],
  password: [{ required: true,message: '请输入密码', trigger: 'blur'}]
}
const submit = () => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      Login()
    }
  })
}
const Login = async () => {
  loadingRef.value = true
  let { data } = await login(modelRef.value)
  if(data.code === 200){
    (window as any).$message.success('登录成功')
    setToken(data.data[0])  
    setUserName(data.data[1])
    router.push('/')
  }
  loadingRef.value = false
}
</script>

<template>
  <div class="login">
    <div class="login-from">
      <h1>ADS登录</h1>
      <n-form ref="formRef" :model="modelRef" :rules="rules">
        <n-form-item path="username">
          <n-input v-model:value="modelRef.username" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="password">
          <n-input
            v-model:value="modelRef.password"
            type="password"
            @keyup.enter.native="submit"
          />
        </n-form-item>
        <n-button
          :block="true"
          :disabled="modelRef.username === '' || modelRef.password === ''"
          type="primary"
          :loading="loadingRef"
          @click="submit"
        >
        {{loadingRef ? '登录中...' : '登录'}}
        </n-button>
      </n-form>
    </div>
  </div>
</template>

<style scoped lang="less">
.login{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-from{
    width: 300px;
    height: 300px;
    h1{
      text-align: center;
    }
  }
}
</style>
