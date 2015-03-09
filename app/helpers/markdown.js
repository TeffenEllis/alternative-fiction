import Remarkable from "remarkable"

let md = new Remarkable()

md.block.ruler.disable([
  "list",
  "hr",
  "table"
])

export default md
