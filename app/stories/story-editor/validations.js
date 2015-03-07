import key from "../../resources/key-map"
import {contains} from "lodash"

let validations = {}

validations.title = {
  maxlength: 100,

  editKeys: [
    key.backspace,
    key.delete,
    key.upArrow,
    key.rightArrow,
    key.downArrow,
    key.leftArrow
  ],

  init(element) {
    let self = this

    function preventNewlines (event) {
      if (event.keyCode === key.enter) {
        event.preventDefault()
      }
    }

    function limitLength (event) {
      if (contains(self.editKeys, event.keyCode)) return

      if (this.textContent.length === self.maxlength) {
        event.preventDefault()
      }
    }

    element.addEventListener("keydown", limitLength)
    element.addEventListener("keydown", preventNewlines)
  }
}

export default validations
