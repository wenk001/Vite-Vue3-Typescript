import request from '@/utils/requset'
// 菜单
export function asideIndex(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/system/index',
    method: 'post',
    data,
  });
}