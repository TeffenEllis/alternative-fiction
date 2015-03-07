import React from "react"
import Router from "react-router"
import Firebase from "firebase"
import ReactFireMixin from "reactfire"
import {api} from "../helpers/path"
import ContentPlaceholder from "../common/content-placeholder"

export default React.createClass({
  componentWillMount() {
    this.storiesRef = new Firebase(api("stories"))
    this.storyRef = this.storiesRef.push({
      title: "",
      body: "",
      description: "",
      createdAt: Firebase.ServerValue.TIMESTAMP,
      updatedAt: Firebase.ServerValue.TIMESTAMP
    })

    this.bindAsObject(this.storyRef, "story")
  },

  getInitialState() {
    return {
      story: null
    }
  },

  mixins: [
    ReactFireMixin,
    Router.Navigation
  ],

  render() {
    if (this.state.story) {
      this.transitionTo("story-edit", {
        id: this.storyRef.name()
      })
    }

    return <ContentPlaceholder />
  }
})
