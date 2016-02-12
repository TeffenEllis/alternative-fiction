import request from "lib/request"
import React, {Component} from "react"
import ContentPlaceholder from "components/content-placeholder"

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
    request("stories", {method: "POST"})
      .then(story => this.setState({story}))
  }

  render() {
    return <ContentPlaceholder />
  }
}
