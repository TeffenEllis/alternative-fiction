import ContentPlaceholder from "common/content-placeholder"
import title from "helpers/title"
import {api} from "helpers/path"
import React, {Component} from "react"
import View from "./story"

export default class StoriesShow extends Component {
  state = {
    story: null
  };

  componentDidUpdate() {
    this.setTitle()
  }

  componentWillMount() {
    fetch(api(`stories/${this.props.params.id}`))
      .then(response => response.json())
      .then(story => this.setState({story}))
  }

  render() {
    if (!this.state.story) return <ContentPlaceholder />

    return <View story={this.state.story} />
  }

  setTitle() {
    const {story} = this.state

    if (!story) {
      document.title = title()
      return
    }

    const base = (story.title || "untitled").replace("&nbsp;", "")

    document.title = title(base)
  }
}
