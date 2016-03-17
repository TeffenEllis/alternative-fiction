import {uniqueId} from "lodash"

export default function createFlashEntry(message = "", type = "generic") {
  return {
    id: uniqueId("flash"),
    message,
    type
  }
}
