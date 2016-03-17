import {branch} from "baobab-react/higher-order"
import React, {Component} from "react"
import ContentPlaceholder from "components/content-placeholder"
import * as editorActions from "resources/tree/actions/editor"

class StoriesNew extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.createStory()
  }

  componentWillReceiveProps({story}) {
    if (story) this.context.router.push(`/stories/${story.uuid}/edit`)
  }

  render() {
    return <ContentPlaceholder />
  }
}

export default branch(StoriesNew, {
  actions: {
    createStory: editorActions.createStory
  },
  cursors: {
    story: ["editor", "story"]
  }
})
