<script lang="ts">
// 声明额外的选项
export default {
  name: 'floor'
}
</script>
<script setup lang="ts">
import { h, ref, reactive, nextTick, onMounted } from 'vue'
import { FormInst, DropdownOption, NButton} from 'naive-ui'
import { list, del, delFloor } from '@/api/floor/floor'
import SaveDataB from '@/views/taskApplication/components/SaveDataB.vue'
import SaveDataF from '@/views/taskApplication/components/SaveDataF.vue'

const formRef = ref<FormInst | null>(null)
const loading = ref(true)
const formValue = reactive({
  code: '',
  brand: ''
})
const reset = (e: MouseEvent) => {
  formValue.brand = ''
  formValue.code = ''
  loadData()
}
const options: DropdownOption[] = [
  {
    label: () => h('span', { style: { color: 'blue' } }, '编辑'),
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
const handleSelect = (key: any,id: any = -1, type: any = null) => {
  if(id < 0){
    showDropdownRef.value = false
  }else{
    activeV.value = id
    activeT.value = type
  }
  if(key === 'delete'){
    (window as any).$dialog.warning({
        title: '温馨提示',
        content: '确定要删除吗？',
        positiveText: '确定',
        negativeText: '取消',
        onPositiveClick: () => {
          Del()
        }
      })
  }
  if(key === 'edit'){
    Update()
  }
}
const onClickoutside = () => {
  showDropdownRef.value = false
}
const activeV = ref(-1)
const activeT = ref('')
const rowProps = (row: any) => {
  return {
    onContextmenu: (e: MouseEvent) => {
      e.preventDefault()
      showDropdownRef.value = false
      nextTick().then(() => {
        activeV.value = row.id
        activeT.value = row.type
        showDropdownRef.value = true
        x.value = e.clientX
        y.value = e.clientY
      })
    }
  }
}
const tableHeight: any = ref(0)    
const columns = [
  // {
  //   title: '序号',
  //   key: 'index',
  //   render (row: any, index: any) {
  //     return h('span', null, index + 1)
  //   }
  // },
  {
    title: '名称',
    key: 'name',
  },
  {
    title: '编码',
    key: 'code'
  },
  {
      title: '操作',
      key: 'actions',
      width: 140,
      render (row: any) {
        return [
          h(
          NButton,
          {
            type: 'info',
            style: 'margin-right: 12px',
            size: 'small',
            onClick: () => handleSelect('edit', row.id, row.type)
          },
          { default: () => '编辑' }
        ),
        h(
          NButton,
          {
            type: 'error',
            size: 'small',
            onClick: () => handleSelect('delete', row.id, row.type)
          },
          { default: () => '删除' }
        ),
        ]
      }
    }
]
const tableData = ref([])     
onMounted(()=>{
  const queryFromHeight = document.getElementById('query-from')?.offsetHeight
  const bodyHeight = document.body?.offsetHeight
  tableHeight.value = bodyHeight - (queryFromHeight as number) - 50 - 50 - 50 - 50 - 24
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
  loading.value = true
  let par = {
    pageNum: pageData.pageNum,
    pageSize: pageData.pageSize
  }
  //Object.assign(par, formValue)
  let { data } = await list(par)
  if(data.code === 200){
    tableData.value = data.data.records
    pageData.total = data.data.total
  }
  setTimeout(() => {loading.value = false},500)
}
const Del = async () => {
  let par = { id: activeV.value}
  if(activeT.value === 'building'){
    let { data } = await del(par)
    if(data.code === 200){
      (window as any).$message.success('删除成功！')
      loadData()
    }
  }
  if(activeT.value === 'floor'){
    let { data } = await delFloor(par)
    if(data.code === 200){
      (window as any).$message.success('删除成功！')
      loadData()
    }
  }
}
const modelParB: any = reactive({
  id: '',
  showModal: false,
  title: ''
})
const modelParF: any = reactive({
  id: '',
  showModal: false,
  title: ''
})
const AddB = () => {
  console.log(activeT.value)
  modelParB.id = ''
  modelParB.showModal = true
  modelParB.title = '添加楼栋'
}
const AddF = () => {
  console.log(activeT.value)
  modelParF.id = ''
  modelParF.showModal = true
  modelParF.title = '添加楼层'
}
const Update = () => {
  if(activeT.value === 'building'){
    modelParB.id = activeV.value.toString()
    modelParB.showModal = true
    modelParB.title = '编辑楼栋'
  }
  if(activeT.value === 'floor'){
    modelParF.id = activeV.value.toString()
    modelParF.showModal = true
    modelParF.title = '编辑楼层'
  }
}
const close = (type: any) => {
  if(type === 1){
    loadData()
  }
  modelParB.showModal = false
  modelParB.id = ''
  modelParF.showModal = false
  modelParF.id = ''
}
const rowKey = (row: any) => {
  if(row.buildingId){
    return row.buildingId + '-' + row.id
  }
  return row.id
}
</script>

<template>
    <div class="component-main">
        <div id="query-from">
            <!-- <n-form
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
            </div> -->
        </div>
        <n-data-table
            ref="table"
            :columns="columns"
            :data="tableData"
            :loading="loading"
            :single-line="false"
            :row-key="rowKey"
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
            @select="(key) => {handleSelect(key)}"
        />
        <div class="foot">
          <div>
            <n-button style="margin-right: 24px;" type="primary" size="small" @click="AddB"> 
              添加楼栋
            </n-button>
            <n-button type="primary" size="small" @click="AddF"> 
              添加楼层
            </n-button>
          </div>
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
<SaveDataB v-if="modelParB.showModal" @close="close" :title="modelParB.title" :showModal="modelParB.showModal" :id="modelParB.id"/>
<SaveDataF v-if="modelParF.showModal" @close="close" :title="modelParF.title" :showModal="modelParF.showModal" :id="modelParF.id"/>
</template>

<style scoped lang="less">

</style>