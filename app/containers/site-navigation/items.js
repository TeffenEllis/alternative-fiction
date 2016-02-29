export default [
  {
    label: "Stories",
    icon: "list-alt",
    path: "/stories"
  },

  {
    label: "Search",
    icon: "search",
    path: "/"
  },

  {
    label: "Create",
    icon: "file",
    path: "/stories/new",
    requireAuthentication: true
  },

  {
    label: "Settings",
    icon: "wrench",
    path: "/",
    requireAuthentication: true
  },

  {
    label: "Library",
    icon: "book",
    path: "/",
    requireAuthentication: true
  }
]
