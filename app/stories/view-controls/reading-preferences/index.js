// Reading preference controls.
// Updates user preferences for story reading.
// Arguments:
// * storyComponent: React Component

import "./reading-preferences.styl"

import React from "react"
import userPreferences from "helpers/user-preferences"

const preferenceToInt = {
  paragraphWidth: {
    normal: 0,
    wider: 1,
    full: 2
  },

  fontSize: {
    smaller: 0,
    normal: 1,
    larger: 2
  }
}

const intToPreference = {
  paragraphWidth: {
    0: "normal",
    1: "wider",
    2: "full"
  },

  fontSize: {
    0: "smaller",
    1: "normal",
    2: "larger"
  }
}

export default React.createClass({
  handlePreferenceChange(type, {target: {value}}) {
    value = parseInt(value, 10)

    userPreferences.stories[type] = intToPreference[type][value]
    this.props.storyComponent.forceUpdate()
  },

  render() {
    const {paragraphWidth, fontSize} = userPreferences.stories

    return <div className="view-control" data-component="reading-preferences">
      <div className="preference paragraph-width">
        <span className="glyphicon glyphicon-resize-horizontal preference-label" />
        <input
          className="slider"
          max={2}
          min={0}
          onChange={this.handlePreferenceChange.bind(this, "paragraphWidth")}
          type="range"
          value={preferenceToInt.paragraphWidth[paragraphWidth]}
        />
      </div>

      <div className="preference font-size">
        <span className="glyphicon glyphicon-resize-vertical preference-label" />

        <input
          className="slider"
          max={2}
          min={0}
          onChange={this.handlePreferenceChange.bind(this, "fontSize")}
          type="range"
          value={preferenceToInt.fontSize[fontSize]}
        />
      </div>
    </div>
  }
})

