// User preferences object.
import LocalPreferences from "local-preferences"

export default new LocalPreferences({
  stories: {
    fontSize: "normal",
    paragraphWidth: "normal"
  }
}, "userPreferences")
