// Story saved state indicator.

import "./save-state.styl"

import React from "react"

export default React.createClass({
  getAttributes() {
    const {isSaving, isSaved} = this.props

    if (!isSaving && !isSaved) {
      return {text: "Unsaved", className: "unsaved"}
    }
    else if (isSaving) {
      return {text: "Saving", className: "saving"}
    }
    else if (isSaved) {
      return {text: "Saved", className: "saved"}
    }

    return {text: "?", className: "unknown"}
  },

  render() {
    const attributes = this.getAttributes()

    return <span className={`view-control ${attributes.className}`} data-component="save-state">
      {attributes.text}
    </span>
  }
})
