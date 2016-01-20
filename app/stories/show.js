import React from "react"

import Firebase from "firebase"
import ReactFireMixin from "reactfire"

import title from "helpers/title"
import {api} from "helpers/path"
import Router from "react-router"

import View from "./story"
import ContentPlaceholder from "common/content-placeholder"

export default React.createClass({
  componentDidUpdate() {
    this.setTitle()
  },

  componentWillMount() {
    this.storyRef = new Firebase(api(`stories/${this.getParams().id}`))
    this.bindAsObject(this.storyRef, "story")
  },

  getInitialState() {
    return {
      story: null
    }
  },

  mixins: [
    ReactFireMixin,
    Router.State
  ],

  render() {
    if (this.state.story) {
      return <View story={this.state.story} />
    } else {
      return <ContentPlaceholder />
    }
  },

  setTitle() {
    let story = this.state.story

    if (!story) {
      return document.title = title()
    }

    let base = (story.title || "untitled").replace("&nbsp;", "")
    document.title = title(base)
  }
})
