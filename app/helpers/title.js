
import {title} from "../resources/meta-attributes"
/**
 * Application title helper
 * Append default title with optional prefix.
 * @param {String|Array[<String>]} Arrays will be split and delimited.
 * @return {String} title
 */
export default function assembleTitle (value) {
  if (!value) return title

  if (Array.isArray(value)) {
    return value.join(" - ") + ` - ${title}`
  } else {
    return `${value} - ${title}`
  }
}
