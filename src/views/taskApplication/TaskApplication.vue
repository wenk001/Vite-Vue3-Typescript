<script setup lang="ts">
import { h, ref, reactive, nextTick, onMounted } from 'vue'
import { FormInst, DropdownOption } from 'naive-ui'
import { list, del } from '@/api/taskApplication/taskApplication'
import Save from '@/views/taskApplication/components/save.vue'
const formRef = ref<FormInst | null>(null)
const formValue = ref({
  code: '',
  brand: ''
})
const reset = (e: MouseEvent) => {
  formValue.value.brand = ''
  formValue.value.code = ''
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
  if(key === 'delete'){
    Del()
  }
  if(key === 'edit'){
    Update()
  }
}
const onClickoutside = () => {
  showDropdownRef.value = false
}
const activeV = ref(-1)
const rowProps = (row: any) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      e.preventDefault()
      showDropdownRef.value = false
      nextTick().then(() => {
        activeV.value = row.id
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
    title: '序号',
    key: 'index',
    render (row: any, index: any) {
      return h('span', null, index + 1)
    }
  },
  {
    title: '链接状态',
    key: 'conneStatus'
  },
  {
    title: '品牌',
    key: 'brand'
  },
  {
    title: '类型',
    key: 'provider'
  },
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'IP',
    key: 'ip'
  },
  {
    title: '名称',
    key: 'brandName'
  },
  {
    title: '注册日期',
    key: 'registTime'
  }
]
const tableData = ref([])     
onMounted(()=>{
  const queryFromHeight = document.getElementById('query-from')?.offsetHeight
  const bodyHeight = document.body?.offsetHeight
  tableHeight.value = bodyHeight - (queryFromHeight as number) - 50 - 50 - 50 - 24
  loadData()
}) 
const pageData = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})    
const pageChange = (page: any) => {
  pageData.pageNum = page
  loadData()
}
const pageSizeChange = (pageSize: any) => {
  pageData.pageSize = pageSize
  loadData()
}
const loadData = async () => {
  let par = {
    pageNum: pageData.pageNum,
    pageSize: pageData.pageSize
  }
  Object.assign(par, formValue.value)
  let { data } = await list(par)
  if(data.code === 200){
    tableData.value = data.data.records
    pageData.total = data.data.total
  }
  
}
const Del = async () => {
  let par = { id: activeV.value}
  let { data } = await del(par)
  if(data.code === 200){
    (window as any).$message.success('删除成功！')
    loadData()
  }
}
const modelPar: any = reactive({
  id: '',
  showModal: false,
  title: ''
})
const Add = () => {
  modelPar.id =''
  modelPar.showModal = true
  modelPar.title = '添加'
}
const Update = () => {
  modelPar.id = activeV.value
  modelPar.showModal = true
  modelPar.title = '编辑'
}
const close = (type: any) => {
  if(type === 1){
    loadData()
  }
  modelPar.showModal = false
  modelPar.id = ''
}
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
                <n-form-item label="编码" path="code">
                    <n-input v-model:value="formValue.code" placeholder="输入编码" />
                </n-form-item>
                <n-form-item label="品牌" path="brand">
                    <n-input v-model:value="formValue.brand" placeholder="输入品牌" />
                </n-form-item>
            </n-form>
            <div class="query-sub">
                <n-button attr-type="button" size="small" @click="reset">
                    清空
                </n-button>
                <n-button type="primary" size="small" @click="loadData"> 
                    查询
                </n-button>
            </div>
        </div>
        <n-data-table
            ref="table"
            :columns="columns"
            :data="tableData"
            :row-props="rowProps"
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
        <div class="foot">
          <n-button type="primary" size="small" @click="Add"> 
            添加
          </n-button>
          <n-pagination
            v-if="pageData.total > 0"
            v-model:page="pageData.pageNum"
            v-model:page-size="pageData.pageSize"
            :item-count="pageData.total"
            show-size-picker
            @update:page="pageChange"
            @update:page-size="pageSizeChange"
            :page-sizes="[10, 20, 30, 40]"
          />
        </div>
</div>
<Save v-if="modelPar.showModal" @close="close" :title="modelPar.title" :showModal="modelPar.showModal" :id="modelPar.id"/>
</template>

<style scoped lang="less">

</style>