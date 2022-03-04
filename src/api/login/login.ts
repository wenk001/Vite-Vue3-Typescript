import request from '@/utils/requset'
// 登录
export function login(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/system/login',
    method: 'post',
    data,
  });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
}
// 退出
export function logout(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/system/logout',
    method: 'post',
    data,
  });
}
// 修改密码
export function changePassword(params: any) {
  const data = {
    ...params
  };
  return request({
    url: '/system/user/changePassword',
    method: 'post',
    data,
  });
}