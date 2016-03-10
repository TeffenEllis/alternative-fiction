import "./show.styl"

import ContentPlaceholder from "components/content-placeholder"
import request from "lib/request"
import React, {Component} from "react"
import StoryCard from "components/story-card"

export default class UserShow extends Component {
  state = {
    stories: null,
    user: null
  };

  _fetchStories() {
    request(`stories?userUuid=${this.props.params.uuid}`)
      .then(stories => this.setState({stories}))
  }

  _fetchUser() {
    request(`users/${this.props.params.uuid}`)
      .then(user => this.setState({user}))
  }

  componentWillMount() {
    this._fetchStories()
    this._fetchUser()
  }

  render() {
    const {stories, user} = this.state

    if (!user || !stories) return <ContentPlaceholder />

    return <section data-column data-component="users-show">
      <div className="headline" data-selectable>{user.displayName}</div>

      <div className="bio" data-selectable>
        {user.bio || `${user.displayName} hasn't written a bio yet.`}
      </div>

      <div className="headline" data-selectable>Stories</div>

      {stories.map(story => <StoryCard key={story.uuid} story={story} />)}
    </section>
  }
}
