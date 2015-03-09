// Fullscreen toggle button.

import React from "react"
import fullscreenHelper from "helpers/fullscreen"

export default React.createClass({
  componentDidMount() {
    // Avoid tracking fullscreen state inside component.
    // The user may decline or exit fullscreen and be unsynchronized with our state.
    document.addEventListener("fullscreenchange", this.fullscreenChangeListener)
  },

  componentWillUnmount() {
    document.removeEventListener("fullscreenchange", this.fullscreenChangeListener)
  },

  fullscreenChangeListener() {
    this.forceUpdate()
  },

  render() {
    let
      icon  = "fullscreen",
      label = "Fullscreen"

    if (fullscreenHelper.fullscreen) {
      icon  = "remove"
      label = "Close"
    }

    return <span data-component="toggle-fullscreen" className="view-control" onClick={this.toggleFullscreen}>
      <span className={`glyphicon glyphicon-${icon} toggle-icon`} title={label} />
    </span>
  },

  toggleFullscreen() {
    fullscreenHelper.fullscreen = !fullscreenHelper.fullscreen
  }
})
