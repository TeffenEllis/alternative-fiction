// Story saved state indicator.

import React from "react"

export default React.createClass({
  getAttributes() {
    let {isSaving, isSaved} = this.props

    if (!isSaving && !isSaved) {
      return {text: "Unsaved", className: "unsaved"}
    } else if (isSaving) {
      return {text: "Saving", className: "saving"}
    } else if (isSaved) {
      return {text: "Saved", className: "saved"}
    } else {
      return {text: "?", className: "unknown"}
    }
  },

  render() {
    let attributes = this.getAttributes()

    return <span className={`save-state ${attributes.className}`}>
      {attributes.text}
    </span>
  }
})
