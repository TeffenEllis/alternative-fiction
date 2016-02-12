// User preferences object.
import {get} from "local-preferences"

export default {
  stories: get("stories", {
    fontSize: "normal",
    paragraphWidth: "normal"
  }),
  token: get("token", null)
}
