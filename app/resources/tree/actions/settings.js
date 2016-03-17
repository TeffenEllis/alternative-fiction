import request from "lib/request"
import createFlashEntry from "lib/create-flash-entry"

export function updateUser(tree, body) {
  const userCursor = tree.select("user")
  const flashCursor = tree.select("flash")

  request(`users/${userCursor.get("uuid")}`, {
    body,
    headers: {
      Authorization: tree.get("token")
    },
    method: "PATCH"
  })
  .then(user => {
    userCursor.set(user)
    flashCursor.push(createFlashEntry("Settings updated!", "settings"))
  })
}
