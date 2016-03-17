import {uniqueId} from "lodash"

export default function createFlashEntry(message = "", type = "generic", timeout = 10000) {
  return {
    id: uniqueId("flash"),
    message,
    timeout,
    type
  }
}
