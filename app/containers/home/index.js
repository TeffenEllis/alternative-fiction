import "./home.styl"

import request from "lib/request"
import React, {Component} from "react"
import logo from "../../images/foundation/text-logo.svg"
import ContentPlaceholder from "components/content-placeholder"
import StoryCard from "components/story-card"

export default class Home extends Component {
  state = {
    stories: null
  };

  _fetchStories() {
    request("stories")
      .then(stories => this.setState({stories}))
  }

  componentWillMount() {
    this._fetchStories()
  }

  render () {
    const {stories} = this.state

    if (!stories) return <ContentPlaceholder />

    return <section data-column data-component="home">
      <div className="logo-container" data-column>
        <img className="logo-image" src={logo} />
      </div>

    <div className="headline">Recent Stories</div>

    {stories.map(story => <StoryCard key={story.uuid} story={story} />)}

    </section>
  }
}
