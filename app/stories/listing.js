import React from "react"

import Firebase from "firebase"
import ReactFireMixin from "reactfire"

import title from "helpers/title"
import {api} from "helpers/path"
import {size} from "lodash"

import View from "./stories-listing"
import ContentPlaceholder from "common/content-placeholder"

export default React.createClass({
  componentDidUpdate() {
    this.setTitle()
  },

  componentWillMount() {
    this.storiesRef = new Firebase(api("stories"))
    this.bindAsArray(this.storiesRef.orderByChild("updatedAt").limitToLast(100), "stories")
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
    if (!this.state.stories) return <ContentPlaceholder />

    return <View
      onChange={this.handleChange}
      stories={this.state.stories}
      storiesRef={this.storiesRef}
    />
  },

  setTitle() {
    const storyCount = this.state.stories ? size(this.state.stories) : 0

    document.title = title(`(${storyCount}) Stories`)
  }
})
