import request from "@/utils/request"
import { PREFIX } from "./path"
export function getFormatParams (data) {
  return request({
    url: `${PREFIX.API_BASE}/sysParams`,
    method: "post",
    data
  })
}
