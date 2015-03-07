export function api (path) {
  path = path || ""

  return `${__API_BASE}/${path}`
}
