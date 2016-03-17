export function setPreference(tree, key, value) {
  const preferencesCursor = tree.select("preferences")

  preferencesCursor.set(key, value)
}
