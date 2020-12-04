import request from "@/utils/request"
import { PREFIX } from "./path"
export function getFormatParams (data) {
  return request({
    url: `${PREFIX.API_BASE}/sysParams`,
    method: "post",
    data
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
