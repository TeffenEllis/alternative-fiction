import Remarkable from "remarkable"

const md = new Remarkable()

md.block.ruler.disable([
  "list",
  "hr",
  "table"
])

export default md
