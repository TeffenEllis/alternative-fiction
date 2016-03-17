import ContentPlaceholder from "components/content-placeholder"
import request from "lib/request"
import title from "lib/title"
import React, {Component} from "react"
import View from "./story"
import ApplicationError from "components/application-error"

export default class StoriesShow extends Component {
  state = {
    story: null,
    error: null
  };

  componentDidUpdate() {
    this.setTitle()
  }

  componentWillMount() {
    request(`stories/${this.props.params.id}`)
      .then(story => this.setState({story}))
      .catch(({responseJSON}) => this.setState({error: responseJSON}))
  }

  render() {
    // TODO: Move this to the state tree.
    const {error, story} = this.state

    if (error) return <ApplicationError message={error.message} statusCode={error.statusCode} />
    if (!story) return <ContentPlaceholder />

    return <View story={this.state.story} />
  }

  setTitle() {
    const {error, story} = this.state

    if (error) return

    if (!story) {
      document.title = title()
      return
    }

    const base = (story.title || "untitled").replace("&nbsp;", "")

    document.title = title(base)
  }
}
