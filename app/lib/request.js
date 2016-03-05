import userPreferences from "lib/user-preferences"
import {defaults} from "lodash"

function checkStatus(response) {
  if (response.ok) return response

  const error = new Error(response.statusText)

  error.response = response

  throw error
}

export function api(path = "") {
  return `${__SERVICES_PATH}/${path}`
}

export default function request(path = "", options = {}) {
  defaults(options, {
    headers: {
      Accept: "application/json",
      Authorization: userPreferences.token || "",
      "Content-Type": "application/json"
    }
  })

  if (typeof options.body === "object") options.body = JSON.stringify(options.body)

  return fetch(api(path), options)
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) return response // No body

      if (options.responseHeaders) return response.json()
        .then(payload => new Promise(resolve => resolve({
          headers: response.headers,
          payload
        })))

      return response.json()
    })
}
