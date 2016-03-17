// Reading preference controls.
// Updates user preferences for story reading.
// Arguments:
// * storyComponent: React Component

import "./reading-preferences.styl"

import React, {Component} from "react"
import {branch} from "baobab-react/higher-order"
import * as preferencesActions from "resources/tree/actions/preferences"

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

class ReadingPreferences extends Component {

  _updatePreference(type, {target: {value}}) {
    value = parseInt(value, 10)

    this.props.actions.setPreference(type, intToPreference[type][value])
  }

  render() {
    const {paragraphWidth, fontSize} = this.props.preferences

    return <div className="view-control" data-column data-component="reading-preferences">
      <div className="preference paragraph-width">
        <span className="glyphicon glyphicon-resize-horizontal preference-label" />
        <input
          className="slider"
          max={2}
          min={0}
          onChange={this._updatePreference.bind(this, "paragraphWidth")}
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
          onChange={this._updatePreference.bind(this, "fontSize")}
          type="range"
          value={preferenceToInt.fontSize[fontSize]}
        />
      </div>
    </div>
  }
}

export default branch(ReadingPreferences, {
  actions: {
    setPreference: preferencesActions.setPreference
  },
  cursors: {
    preferences: ["preferences"]
  }
})
