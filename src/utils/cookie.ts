import Cookies from 'js-cookie';

const TokenKey  = 'Access-Token'
const UserName  = 'UserName'

export function getToken() {
  return Cookies.get(TokenKey);
}
export function setToken(token: any) {
  return Cookies.set(TokenKey, token);
}
export function removeToken() {
  return Cookies.set(TokenKey, '');
}
export function getUserName() {
  return Cookies.get(UserName);
}
export function setUserName(username: any) {
  return Cookies.set(UserName, username);
}
export function removeUserName() {
  return Cookies.set(UserName, '');
}