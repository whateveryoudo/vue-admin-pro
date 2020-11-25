import request from "@/utils/request"
import { PREFIX } from "./path"
export function login (data) {
  return request({
    url: `${PREFIX.API_USER}/login`,
    method: "post",
    data
  })
}

export function getApplication () {
  return request({
    url: `${PREFIX.API_BASE}/getApps`,
    method: "get"
  })
}
export function getMenus (appId) {
  return request({
    url: `${PREFIX.API_BASE}/getMenus`,
    method: "get",
    params: { appId }
  })
}
export function getInfo (token) {
  return request({
    url: `${PREFIX.API_BASE}/getMenus`,
    method: "get",
    params: token
  })
}

export function logOut (token) {
  return request({
    url: `${PREFIX.API_USER}/logOut`,
    method: "post",
    params: token
  })
}
