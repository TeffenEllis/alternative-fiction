export function authenticate(payload) {
  return {type: "AUTHENTICATE_SESSION", ...payload}
}

export function unauthenticate() {
  return {type: "UNAUTHENTICATE_SESSION"}
}
