import key from "resources/key-map"

const validations = {}

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
    const self = this

    function preventNewlines(event) {
      if (event.keyCode === key.enter) event.preventDefault()
    }

    function limitLength(event) {
      if (!self.editKeys.includes(event.keyCode)) return

      if (this.textContent.length === self.maxlength) {
        event.preventDefault()
      }
    }

    element.addEventListener("keydown", limitLength)
    element.addEventListener("keydown", preventNewlines)
  }
}

export default validations
