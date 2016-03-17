import "./library.styl"

import {branch} from "baobab-react/higher-order"
import ContentPlaceholder from "components/content-placeholder"
import React, {Component} from "react"
import StoryCard from "components/story-card"
import * as libraryActions from "resources/tree/actions/library"

class Library extends Component {
  componentDidMount() {
    this.props.actions.fetchStories()
  }

  render() {
    const {stories} = this.props

    if (!stories) return <ContentPlaceholder />

    return <section data-column data-component="library">
      <div className="headline" data-selectable>Your Stories</div>

      {stories.map(story => <StoryCard authorMode key={story.uuid} story={story} />)}
    </section>
  }
}

export default branch(Library, {
  actions: {
    fetchStories: libraryActions.fetchStories
  },
  cursors: {
    stories: ["library", "stories"]
  }
})
