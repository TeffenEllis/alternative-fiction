import {defaultsDeep} from "lodash"

function checkStatus(response) {
  if (response.ok) return response

  return response
    .json()
    .then(responseJSON => {
      const error = new Error(response.statusText)

      Object.assign(error, {response, responseJSON})

      throw error
    })
}

export function api(path = "") {
  return `${__SERVICES_PATH}/${path}`
}

export default function request(path = "", options = {}) {
  defaultsDeep(options, {
    headers: {
      Accept: "application/json",
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
