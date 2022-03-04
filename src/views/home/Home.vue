<script setup lang="ts">
import { h, ref, nextTick, onMounted } from 'vue'
import { FormInst, DataTableColumns, DropdownOption, useMessage } from 'naive-ui'
const formRef = ref<FormInst | null>(null)
const formValue = ref({
        name: '',
        age: '',
        phone: ''
      })
const handleValidateClick = (e: MouseEvent) => {
        e.preventDefault()
        formRef.value?.validate((errors) => {
          if (!errors) {
            (window as any).$message.success('Valid')
          } else {
            (window as any).$message.error('Invalid')
          }
        })
      }
const options: DropdownOption[] = [
  {
    label: '编辑',
    key: 'edit'
  },
  {
    label: () => h('span', { style: { color: 'red' } }, '删除'),
    key: 'delete'
  }
]
const showDropdownRef = ref(false)
const x = ref(0)
const y = ref(0)
const handleSelect = (key: any) => {
    showDropdownRef.value = false
    console.log(activeV.value)
}
const onClickoutside = () => {
    showDropdownRef.value = false
}
const activeV = ref(-1)
const rowProps = (row: any) => {
        return {
          onContextmenu: (e: MouseEvent) => {
           (window as any).$message.info(row.key)
            e.preventDefault()
            showDropdownRef.value = false
            nextTick().then(() => {
            activeV.value = row.key
              showDropdownRef.value = true
              x.value = e.clientX
              y.value = e.clientY
            })
          }
        }
      }
const tableHeight: any = ref(0)    
const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
]
const data = Array.apply(null, { length: 146 }).map((_, index) => ({
        key: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      }))
const pagination = {
        pageSize: 35
}      
onMounted(()=>{
    const queryFromHeight = document.getElementById('query-from')?.offsetHeight
    const bodyHeight = document.body?.offsetHeight
    tableHeight.value = bodyHeight - (queryFromHeight as number) - 50 - 50 - 50 - 24
})     
</script>

<template>
    <div class="component-main">
        <div id="query-from">
            <n-form
            ref="formRef"
            inline
            label-placement="left"
            label-align="right"
            :model="formValue"
            size="small"
            style="flex-wrap: wrap;"
            >
                <n-form-item label="姓名" path="name">
                    <n-input v-model:value="formValue.name" placeholder="输入姓名" />
                </n-form-item>
                <n-form-item label="年龄" path="age">
                    <n-input v-model:value="formValue.age" placeholder="输入年龄" />
                </n-form-item>
                <n-form-item label="电话号码" path="phone">
                    <n-input v-model:value="formValue.phone" placeholder="电话号码" />
                </n-form-item>
            </n-form>
            <div class="query-sub">
                <n-button attr-type="button" size="small" @click="handleValidateClick">
                    清空
                </n-button>
                <n-button type="primary" size="small"> 
                    查询
                </n-button>
            </div>
        </div>
        <n-data-table
            ref="table"
            :columns="columns"
            :data="data"
            :row-props="rowProps"
            :pagination="pagination"
            :max-height="tableHeight"
        />
        <n-dropdown
            placement="bottom-start"
            trigger="manual"
            :x="x"
            :y="y"
            :options="options"
            :show="showDropdownRef"
            :on-clickoutside="onClickoutside"
            @select="handleSelect"
        />
</div>
</template>

<style scoped lang="less">

</style>