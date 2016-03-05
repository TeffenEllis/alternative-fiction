export default [
  {
    label: "Stories",
    icon: "list-alt",
    path: "/"
  },

  {
    label: "Search",
    icon: "search",
    path: "/search"
  },

  {
    label: "Library",
    icon: "book",
    path: "/library",
    requireAuthentication: true
  },

  {
    label: "Create",
    icon: "file",
    path: "/stories/new",
    requireAuthentication: true
  }
]
