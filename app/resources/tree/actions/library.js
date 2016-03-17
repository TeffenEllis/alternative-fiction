import request from "lib/request"

export function fetchStories(tree) {
  const uuid = tree.get(["user", "uuid"])

  request(`stories?userUuid=${uuid}`, {
    headers: {
      Authorization: tree.get("token")
    }
  })
  .then(stories => {
    tree.set(["library", "stories"], stories)
  })
}
