import request from "lib/request"
import createFlashEntry from "lib/create-flash-entry"

function onAuthentication(tree, {headers, payload}) {
  tree.set("previousUser", payload)
  tree.set("token", headers.get("authorization"))
  tree.set("user", payload)
}

export function login(tree, credentials) {
  const flashCursor = tree.select("flash")
  const flashEntries = flashCursor.get().filter(entry => entry.type !== "authentication")

  flashCursor.set(flashEntries)

  return request("auth", {
    responseHeaders: true,
    body: credentials,
    method: "POST"
  })
  .then(onAuthentication.bind(null, tree))
  .catch(({responseJSON}) => {
    const {message = "There was an unknown error while logging in."} = responseJSON || {}

    flashCursor.push(createFlashEntry(message, "authentication"))
  })
}

export function logout(tree) {
  const user = tree.get("user")

  tree.set("previousUser", user)
  tree.set("user", null)
}

export function register(tree, credentials) {
  const flashCursor = tree.select("flash")
  const flashEntries = flashCursor.get().filter(entry => entry.type !== "authentication")

  flashCursor.set(flashEntries)

  return request("users", {
    responseHeaders: true,
    body: credentials,
    method: "POST"
  })
  .then(onAuthentication.bind(null, tree))
  .catch(({responseJSON}) => {
    if (responseJSON && responseJSON.fields) {
      const entries = responseJSON.fields
        .map($ => createFlashEntry(`${$.field}: ${$.message}`, "authentication"))

      return flashCursor.concat(entries)
    }

    const {message = "There was an unknown error while registering."} = responseJSON || {}

    flashCursor.push(createFlashEntry(message, "authentication"))
  })
}
