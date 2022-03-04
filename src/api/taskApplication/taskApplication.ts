import request from '@/utils/requset'
// 查全部
export function list(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/manage/device/list',
    method: 'post',
    data,
  });
}
// 查单个
export function findOn(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/manage/device/findOn',
    method: 'post',
    data,
  });
}
// 添加
export function add(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/manage/device/add',
    method: 'post',
    data,
  });
}
// 编辑
export function update(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/manage/device/update',
    method: 'post',
    data,
  });
}
// 删除
export function del(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/manage/device/delete',
    method: 'post',
    data,
  });
}