import React from "react"

import {extend, debounce} from "lodash"
import MediumEditor from "medium-editor"
import MEDIUM_OPTIONS from "../../resources/medium-editor-configuration"
import markdown from "../../helpers/markdown"
import html2markdown from "html2markdown"

import userPreferences from "../../helpers/user-preferences"
import HumanTime from "../../common/human-time"
import EstimatedReadingTime from "../../common/estimated-reading-time"
import validations from "./validations"

import ViewControls from "../view-controls"
import ReadingPreferences from "../view-controls/reading-preferences"
import SavedState from "../view-controls/saved-state"


const UPDATE_THROTTLE = 1500
const contentEditableFields = [
  "title",
  "description",
  "body"
]

export default React.createClass({
  componentDidMount() {
    this.populateContentEditableFields()

    let
      title = this.refs.title.getDOMNode(),
      body = this.refs.body.getDOMNode()

    validations.title.init(title)

    // Setup editor controls.
    new MediumEditor(body, MEDIUM_OPTIONS)

    body.focus()
  },

  handleContentChange() {
    // Prevent attempting to save while a transaction is processing.
    if (this.state.isSaving) return

    this.setState({
      isSaved: false
    }, function () {
      this.updateContentEditableFields()
      this.saveStory()
    }.bind(this))
  },

  getInitialState() {
    return {
      isSaving: false,
      isSaved: true,

      // Remote model reference.
      storyRef: this.props.storyRef,
      // Model used for editing.
      story: this.props.story,
    }
  },

  populateContentEditableFields() {
    // Contenteditable fields must be assigned outside of React's update cycle.
    // Otherwise the cursor position will be lost on each update.
    contentEditableFields.forEach(function (field) {
      let fieldDOMNode = this.refs[field].getDOMNode()

      if (fieldDOMNode.dataset["parser"] === "markdown") {
        fieldDOMNode.innerHTML = markdown.render(this.state.story[field])
      } else {
        fieldDOMNode.innerHTML = this.state.story[field]
      }

      // Fix issue where blank stories don't have first paragraph.
      if (field === "body" && fieldDOMNode.innerHTML === "") {
        fieldDOMNode.innerHTML = "<p class='paragraph-placeholder'>&nbsp;</p>"
      }
    }.bind(this))

    this.forceUpdate()
  },

  render() {
    let {fontSize, paragraphWidth} = userPreferences.stories

    return <section className="story edit">
      <ViewControls
        primaryControls={[
          <SavedState isSaving={this.state.isSaving} isSaved={this.state.isSaved} />,

          <EstimatedReadingTime textComponent={this.refs.body} />
        ]}

        secondaryControls={[
          <ReadingPreferences storyComponent={this} />
        ]}
      />

      <header className="headline">
        <div
          ref="title"
          className="title"
          data-placeholder="Title"
          data-parser="plaintext"
          contentEditable
          onInput={this.handleContentChange}
        />

        <div
          ref="description"
          className="description"
          data-placeholder="Description"
          data-parser="markdown"
          contentEditable
          onInput={this.handleContentChange}
        />

        <div className="author">
          {this.state.story.author}
        </div>
        <HumanTime datetime={this.state.story.updatedAt} />
        <hr className="section-seperator" />
      </header>

      <article
        ref="body"
        className="body"
        data-width={paragraphWidth}
        data-font-size={fontSize}
        data-parser="markdown"
        contentEditable
        onInput={this.handleContentChange}
      />

      <footer className="summary" />
    </section>
  },

  saveStory: debounce(function () {
    this.state.isSaving = true
    this.forceUpdate()

    let
      {title, description, body} = this.state.story,
      updatedAt = Firebase.ServerValue.TIMESTAMP

    this.state.storyRef.transaction(function () {
      return {title, description, body, updatedAt}
    }
    , function (error, committed, snapshot) {
      if (error) {
        console.error(error)
        this.state.isSaving = false
        this.state.isSaved  = false
      } else {
        this.state.isSaving = false
        this.state.isSaved  = true
        this.state.story = snapshot.val()
      }

      this.forceUpdate()
    }.bind(this))

  }, UPDATE_THROTTLE),

  updateContentEditableFields() {
    // Fetch data from DOM, update model attributes.
    contentEditableFields.forEach(function (field) {
      let fieldDOMNode = this.refs[field].getDOMNode()

       if (fieldDOMNode.dataset["parser"] === "markdown") {
        this.state.story[field] = html2markdown(fieldDOMNode.innerHTML)
       } else {
        this.state.story[field] = fieldDOMNode.textContent
       }
    }.bind(this))
  }
})
