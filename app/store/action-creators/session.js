export function authenticate(payload) {
  return {type: "AUTHENTICATE_SESSION", ...payload}
}
