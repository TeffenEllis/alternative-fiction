// Story saved state indicator.

import "./save-state.styl"

import React, {Component} from "react"

export default class SaveState extends Component {
  render() {
    const {state} = this.props
    const text = {
      saved: "Saved",
      saving: "Saving",
      unsaved: "Unsaved"
    }[state] || "Connection Error"

    return <span className="view-control" data-component="save-state" data-state={state}>
      {text}
    </span>
  }
}
