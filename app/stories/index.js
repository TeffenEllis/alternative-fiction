import routeHandler from "./route-handler"
import edit from "./edit"
import listing from "./listing"
import _new from "./new"
import show from "./show"

export default {
  routeHandler,
  edit,
  show,
  index: listing,
  new: _new
}
