import "./medium-editor.styl"
import "./editor.styl"

import {branch} from "baobab-react/higher-order"
import HumanTime from "components/human-time"
import EstimatedReadingTime from "components/estimated-reading-time"
import ReadingPreferences from "containers/stories/view-controls/reading-preferences"
import ViewControls from "containers/stories/view-controls"
import SavedState from "containers/stories/view-controls/save-state"
import markdown from "lib/markdown"
import MediumEditor from "medium-editor"
import React, {Component} from "react"
import MEDIUM_OPTIONS from "resources/medium-editor-configuration"
import html2markdown from "html2markdown"
import * as editorActions from "resources/tree/actions/editor"
import validations from "./validations"

const EDITABLE_FIELDS = [
  "title",
  "description",
  "body"
]

class Editor extends Component {
  componentDidMount() {
    this._populateFields()
  }

  _handleChange(refName) {
    const node = this.refs[refName]
    const {parser} = node.dataset
    const value = parser === "markdown" ? html2markdown(node.innerHTML) : node.textContent

    this.props.actions.updateLocal(refName, value)
  }

  _populateFields() {
    // Contenteditable fields must be assigned outside of React's update cycle.
    // Otherwise the cursor position will be lost on each update.
    EDITABLE_FIELDS.forEach(field => {
      const node = this.refs[field]
      const {parser} = node.dataset
      const value = this.props.story[field]

      node.innerHTML = parser === "markdown" ? markdown.render(value) : value

      // Fix issue where blank stories don't have first paragraph.
      if (field === "body" && node.innerHTML === "") {
        node.innerHTML = "<p class='paragraph-placeholder'>&nbsp;</p>"
      }
    })

    this.forceUpdate()

    if (!this.mediumEditor) {
      const {body, title} = this.refs

      validations.title.init(title)

      this.mediumEditor = new MediumEditor(body, MEDIUM_OPTIONS)

      body.focus()
    }
  }

  render() {
    const {story, preferences} = this.props

    return <section data-column data-component="full-story-editor" data-component-mode="edit">
      <ViewControls
        primaryControls={[
          <SavedState state={this.props.saveState} />,

          <EstimatedReadingTime textComponent={this.refs.body} />
        ]}

        secondaryControls={[
          <ReadingPreferences storyComponent={this} />
        ]}
      />

      <div className="details" data-column>
        <div
          className="title"
          contentEditable
          data-parser="plaintext"
          data-placeholder="Title"
          onInput={this._handleChange.bind(this, "title")}
          ref="title"
        />

        <div
          className="description"
          contentEditable
          data-column
          data-parser="markdown"
          data-placeholder="Description"
          onInput={this._handleChange.bind(this, "description")}
          ref="description"
        />

        <div className="author">{story.user.displayName}</div>

        <HumanTime datetime={story.updatedAt} />
        <hr className="section-seperator" />
      </div>

      <article
        className="body"
        contentEditable
        data-font-size={preferences.fontSize}
        data-parser="markdown"
        data-width={preferences.paragraphWidth}
        onInput={this._handleChange.bind(this, "body")}
        ref="body"
      />

      <footer className="summary" />
    </section>
  }
}

export default branch(Editor, {
  actions: {
    updateLocal: editorActions.updateLocal
  },
  cursors: {
    preferences: ["preferences"],
    saveState: ["editor", "saveState"]
  }
})
