import userPreferences from "../helpers/user-preferences"
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
      Authorization: userPreferences.token,
      "Content-Type": "application/json"
    }
  })

  return fetch(api(path), options)
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) return response // No body

      return response.json()
    })
}
