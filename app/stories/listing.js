import React from "react"

import Firebase from "firebase"
import ReactFireMixin from "reactfire"

import title from "helpers/title"
import {api} from "helpers/path"
import {size} from "lodash"

import View from "./stories-listing"
import ContentPlaceholder from "common/content-placeholder"

module.exports = React.createClass({
  componentDidUpdate() {
    this.setTitle()
  },

  componentWillMount() {
    this.storiesRef = new Firebase(api("stories"))
    this.bindAsObject(this.storiesRef.limitToFirst(100), "stories")
  },

  handleChange() {
    this.forceUpdate()
  },

  mixins: [
    ReactFireMixin
  ],

  getInitialState() {
    return {
      stories: null
    }
  },

  render() {
    if (this.state.stories) {
      return <View
        storiesRef={this.storiesRef}
        stories={this.state.stories}
        onChange={this.handleChange} />
    }
    else {
      return <ContentPlaceholder />
    }
  },

  setTitle() {
    let storyCount = this.state.stories ? size(this.state.stories) : 0

    document.title = title(`(${storyCount}) Stories`)
  }
})
