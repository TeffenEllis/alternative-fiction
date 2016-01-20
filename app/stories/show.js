import ContentPlaceholder from "common/content-placeholder"
import Firebase from "firebase"
import title from "helpers/title"
import {api} from "helpers/path"
import React from "react"
import ReactFireMixin from "reactfire"
import View from "./story"

export default React.createClass({
  componentDidUpdate() {
    this.setTitle()
  },

  componentWillMount() {
    this.storyRef = new Firebase(api(`stories/${this.props.params.id}`))
    this.bindAsObject(this.storyRef, "story")
  },

  getInitialState() {
    return {
      story: null
    }
  },

  mixins: [
    ReactFireMixin
  ],

  render() {
    if (!this.state.story) return <ContentPlaceholder />

    return <View story={this.state.story} />
  },

  setTitle() {
    const {story} = this.state

    if (!story) {
      document.title = title()
      return
    }

    const base = (story.title || "untitled").replace("&nbsp;", "")

    document.title = title(base)
  }
})
