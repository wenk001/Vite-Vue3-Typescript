import request from '@/utils/requset'
// 查全部
export function list(params: any) {
  const data = {
    ...params
  }
  return request({
    url: '/manage/building/list',
    method: 'post',
    data
  })
}
// 查单个楼栋
export function findOne(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/building/findOne',
    method: 'post',
    data
  })
}
// 添加楼栋
export function add(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/building/add',
    method: 'post',
    data
  })
}
// 修改楼栋
export function update(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/building/update',
    method: 'post',
    data
  })
}
// 删除楼栋
export function del(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/building/delete',
    method: 'post',
    data
  })
}
// 查单个楼层
export function findOneFloor(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/floor/findOne',
    method: 'post',
    data
  })
}
// 添加楼层
export function addFloor(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/floor/add',
    method: 'post',
    data
  })
}
// 修改楼层
export function updateFloor(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/floor/update',
    method: 'post',
    data
  })
}
// 删除楼层
export function delFloor(params: any){
  const data = {
    ...params
  }
  return request({
    url: '/manage/floor/delete',
    method: 'post',
    data
  })
}