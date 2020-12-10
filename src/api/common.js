import request from "@/utils/request"
import { PREFIX } from "./path"
export function getFormatParams (data) {
  return request({
    url: `${PREFIX.API_BASE}/sysParams`,
    method: "post",
    data
  })
}

export function initFileList () {
  return request(`${PREFIX.API_FILE}/list`, {
    method: "get"
  })
}
export function uploadFile (data) {
  return request(`${PREFIX.API_FILE}/upload`, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: "post",
    data
  })
}
export function deleteFile (path) {
  return request(`${PREFIX.API_FILE}/delete`, {
    method: "post",
    data: { path }
  })
}
