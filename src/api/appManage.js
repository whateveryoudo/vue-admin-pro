import request from "@/utils/request"
import { PREFIX } from "./path"
export function fetchList (data) {
  return request({
    url: `${PREFIX.API_BASE}/fetchList`,
    method: "post",
    data
  })
}
export function fetchDetail (id) {
  return request({
    url: `${PREFIX.API_BASE}/fetchDetail`,
    method: "get",
    params: { id }
  })
}
export function addApp (data) {
  return request({
    url: `${PREFIX.API_BASE}/addApp`,
    method: "post",
    data
  })
}
export function editApp (data) {
  return request({
    url: `${PREFIX.API_BASE}/editApp`,
    method: "post",
    data
  })
}

