import "./medium-editor.styl"
import "../story/story.styl"
import "./story-editor.styl"

import React from "react"

import {debounce} from "lodash"
import MediumEditor from "medium-editor"
import MEDIUM_OPTIONS from "resources/medium-editor-configuration"
import markdown from "helpers/markdown"
import html2markdown from "html2markdown"

import userPreferences from "helpers/user-preferences"
import HumanTime from "common/human-time"
import EstimatedReadingTime from "common/estimated-reading-time"
import validations from "./validations"

import ViewControls from "stories/view-controls"
import ReadingPreferences from "stories/view-controls/reading-preferences"
import SavedState from "stories/view-controls/save-state"


const UPDATE_THROTTLE = 1500
const contentEditableFields = [
  "title",
  "description",
  "body"
]

export default React.createClass({
  componentDidMount() {
    this.populateContentEditableFields()

    const {body, title} = this.refs

    validations.title.init(title)

    // Setup editor controls.
    new MediumEditor(body, MEDIUM_OPTIONS) // eslint-disable-line no-new

    body.focus()
  },

  handleContentChange() {
    // Prevent attempting to save while a transaction is processing.
    if (this.state.isSaving) return

    this.setState({
      isSaved: false
    }, () => {
      this.updateContentEditableFields()
      this.saveStory()
    })
  },

  getInitialState() {
    return {
      isSaving: false,
      isSaved: true,

      // Remote model reference.
      storyRef: this.props.storyRef,
      // Model used for editing.
      story: this.props.story
    }
  },

  populateContentEditableFields() {
    // Contenteditable fields must be assigned outside of React's update cycle.
    // Otherwise the cursor position will be lost on each update.
    contentEditableFields.forEach(field => {
      const fieldDOMNode = this.refs[field]

      if (fieldDOMNode.dataset.parser === "markdown") {
        fieldDOMNode.innerHTML = markdown.render(this.state.story[field])
      }
      else {
        fieldDOMNode.innerHTML = this.state.story[field]
      }

      // Fix issue where blank stories don't have first paragraph.
      if (field === "body" && fieldDOMNode.innerHTML === "") {
        fieldDOMNode.innerHTML = "<p class='paragraph-placeholder'>&nbsp;</p>"
      }
    })

    this.forceUpdate()
  },

  render() {
    const {fontSize, paragraphWidth} = userPreferences.stories

    return <section data-component="story-editor" data-component-mode="edit">
      <ViewControls
        primaryControls={[
          <SavedState isSaved={this.state.isSaved} isSaving={this.state.isSaving} />,

          <EstimatedReadingTime textComponent={this.refs.body} />
        ]}

        secondaryControls={[
          <ReadingPreferences storyComponent={this} />
        ]}
      />

      <header className="headline">
        <div
          className="title"
          contentEditable
          data-parser="plaintext"
          data-placeholder="Title"
          onInput={this.handleContentChange}
          ref="title"
        />

        <div
          className="description"
          contentEditable
          data-parser="markdown"
          data-placeholder="Description"
          onInput={this.handleContentChange}
          ref="description"
        />

        <div className="author">
          {this.state.story.author}
        </div>
        <HumanTime datetime={this.state.story.updatedAt} />
        <hr className="section-seperator" />
      </header>

      <article
        className="body"
        contentEditable
        data-font-size={fontSize}
        data-parser="markdown"
        data-width={paragraphWidth}
        onInput={this.handleContentChange}
        ref="body"
      />

      <footer className="summary" />
    </section>
  },

  saveStory: debounce(function() {
    this.state.isSaving = true
    this.forceUpdate()

    const {title, description, body} = this.state.story
    const updatedAt = window.Firebase.ServerValue.TIMESTAMP

    this.state.storyRef.transaction(() => {
      return {title, description, body, updatedAt}
    }
    , (error, committed, snapshot) => {
      if (error) {
        console.error(error)
        this.state.isSaving = false
        this.state.isSaved = false
      }
      else {
        this.state.isSaving = false
        this.state.isSaved = true
        this.state.story = snapshot.val()
      }

      this.forceUpdate()
    })
  }, UPDATE_THROTTLE),

  updateContentEditableFields() {
    // Fetch data from DOM, update model attributes.
    contentEditableFields.forEach(field => {
      const fieldDOMNode = this.refs[field]

      if (fieldDOMNode.dataset.parser === "markdown") {
        this.state.story[field] = html2markdown(fieldDOMNode.innerHTML)
      }
      else {
        this.state.story[field] = fieldDOMNode.textContent
      }
    })
  }
})
