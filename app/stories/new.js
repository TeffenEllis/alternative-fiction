import {api} from "helpers/path"
import React, {Component} from "react"
import ContentPlaceholder from "common/content-placeholder"

export default class StoriesNew extends Component {
  state = {
    story: null
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidUpdate() {
    if (this.state.story) {
      this.context.router.push(`/stories/${this.state.story.uuid}/edit`)
    }
  }

  componentWillMount() {
    fetch(api("stories"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(story => this.setState({story}))
    .catch(error => console.error(error))
  }

  render() {
    return <ContentPlaceholder />
  }
}
