import title from "helpers/title"
import request from "lib/request"
import {size} from "lodash"
import React, {Component} from "react"
import View from "./stories-listing"
import ContentPlaceholder from "components/content-placeholder"

export default class StoryListingHandler extends Component {
  state = {
    stories: null
  };

  _fetchStories() {
    request("stories")
      .then(stories => this.setState({stories}))
  }

  _setTitle() {
    const storyCount = this.state.stories ? size(this.state.stories) : 0

    document.title = title(`(${storyCount}) Stories`)
  }

  componentDidUpdate() {
    this._setTitle()
  }

  componentWillMount() {
    this._fetchStories()
  }

  render() {
    if (!this.state.stories) return <ContentPlaceholder />

    return <View
      onChange={this._fetchStories.bind(this)}
      stories={this.state.stories}
    />
  }
}
