import Baobab from "baobab"
import {get as getPersisted, set as setPersisted} from "local-preferences"
import {forEach, pick} from "lodash"

const PERSISTED_KEYS = {
  preferences: {
    fontSize: "normal",
    paragraphWidth: "normal"
  },
  previousUser: null,
  token: null,
  user: null
}
const spec = {
  editor: {
    saveState: "unsaved",
    story: null
  },
  library: {
    stories: []
  },
  flash: []
}

// Fetch persisted keys.
forEach(PERSISTED_KEYS, (fallback, key) => spec[key] = getPersisted(key, fallback))

const tree = new Baobab(spec)

tree.select("flash").on("update", function({data}) {
  const [nextEntry] = data.currentData

  if (!nextEntry) return

  setTimeout(() => {
    this.set(this.get().filter(({id}) => id !== nextEntry.id))
  }, nextEntry.timeout)
})

// Store persisted keys in localstorage.
export function persistTree() {
  const persistedData = pick(tree.toJSON(), Object.keys(PERSISTED_KEYS))

  forEach(persistedData, (value, key) => setPersisted(key, value))
}

if (process.env.NODE_ENV === "development") window.tree = tree

export default tree
