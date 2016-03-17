import {branch} from "baobab-react/higher-order"
import ContentPlaceholder from "components/content-placeholder"
import Editor from "./editor"
import title from "lib/title"
import React, {Component} from "react"
import * as editorActions from "resources/tree/actions/editor"

class EditorContainer extends Component {
  componentDidMount() {
    document.title = title("Edit")

    this.props.actions.fetchStory(this.props.params.uuid)
  }

  render() {
    const {story} = this.props

    if (!story) return <ContentPlaceholder />

    return <Editor story={story} />
  }
}

export default branch(EditorContainer, {
  actions: {
    fetchStory: editorActions.fetchStory
  },
  cursors: {
    story: ["editor", "story"]
  }
})
