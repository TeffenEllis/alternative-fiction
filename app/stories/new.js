import React from "react"
import Firebase from "firebase"
import ReactFireMixin from "reactfire"
import {api} from "helpers/path"
import ContentPlaceholder from "common/content-placeholder"

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidUpdate() {
    if (this.state.story) {
      this.context.router.push(`/stories/${this.storyRef.key()}/edit`)
    }
  },

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
    ReactFireMixin
  ],

  render() {
    return <ContentPlaceholder />
  }
})
