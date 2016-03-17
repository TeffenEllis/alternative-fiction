import request from "lib/request"
import {debounce, pick} from "lodash"

const UPDATE_THROTTLE = 1500
const PATCHED_ATTRIBUTES = ["body", "description", "title"]

export function createStory(tree) {
  request("stories", {
    headers: {
      Authorization: tree.get("token")
    },
    method: "POST"
  })
  .then(story => tree.set(["editor", "story"], story))
}

export function fetchStory(tree, uuid) {
  const editorCursor = tree.select("editor")

  request(`stories/${uuid}`, {
    headers: {
      Authorization: tree.get("token")
    }
  })
  .then(story => {
    editorCursor.set("story", story)
    editorCursor.set("saveState", "saved")
  })
}

const updateRemote = debounce(tree => {
  const editorCursor = tree.select("editor")
  const body = pick(editorCursor.get("story"), PATCHED_ATTRIBUTES)

  editorCursor.set("saveState", "saving")

  request(`stories/${editorCursor.get(["story", "uuid"])}`, {
    body,
    headers: {
      Authorization: tree.get("token")
    },
    method: "PATCH"
  })
  .then(() => {
    editorCursor.set("saveState", "saved")
  })
  .catch(error => {
    console.error(error)

    editorCursor.set("saveState", "error")
  })
}, UPDATE_THROTTLE)

export function updateLocal(tree, key, value) {
  const editorCursor = tree.select("editor")

  editorCursor.set("saveState", "unsaved")
  editorCursor.set(["story", key], value)

  updateRemote(tree, key, value)
}
