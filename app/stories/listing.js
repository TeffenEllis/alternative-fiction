import title from "helpers/title"
import {api} from "helpers/path"
import {size} from "lodash"
import React, {Component} from "react"
import View from "./stories-listing"
import ContentPlaceholder from "components/content-placeholder"

export default class StoryListingHandler extends Component {
  state = {
    stories: null
  };

  componentDidUpdate() {
    this.setTitle()
  }

  componentWillMount() {
    fetch(api("stories"))
      .then(response => response.json())
      .then(stories => this.setState({stories}))
  }

  handleChange() {
    this.forceUpdate()
  }

  render() {
    if (!this.state.stories) return <ContentPlaceholder />

    return <View
      onChange={this.handleChange}
      stories={this.state.stories}
      storiesRef={this.storiesRef}
    />
  }

  setTitle() {
    const storyCount = this.state.stories ? size(this.state.stories) : 0

    document.title = title(`(${storyCount}) Stories`)
  }
}
