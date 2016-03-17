import "./story.styl"

import {branch} from "baobab-react/higher-order"
import HumanTime from "components/human-time"
import EstimatedReadingTime from "components/estimated-reading-time"
import ViewControls from "containers/stories/view-controls"
import FullscreenToggle from "containers/stories/view-controls/fullscreen-toggle"
import ReadingPreferences from "containers/stories/view-controls/reading-preferences"
import markdown from "lib/markdown"
import React, {Component} from "react"

class Story extends Component {
  componentDidMount() {
    // Update body reference for estimated reading time.
    this.forceUpdate()
  }

  render() {
    const {preferences, story} = this.props

    return <section data-column data-component="full-story" data-component-mode="view">
      <ViewControls
        primaryControls={[
          <EstimatedReadingTime textComponent={this.refs.body} trackScrollPosition />,
          <FullscreenToggle />
        ]}

        secondaryControls={[
          <ReadingPreferences storyComponent={this} />
        ]}
      />

      <div className="details" data-column>
        <div className="title" data-placeholder="untitled" data-selectable ref="title">
          {story.title}
        </div>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: markdown.render(story.description)
          }}
          data-column
          data-selectable
        />

        <div className="author">
          {story.author}
        </div>

        <HumanTime datetime={story.updatedAt} />
        <hr className="section-seperator" />
      </div>

      <article
        className="body"
        dangerouslySetInnerHTML={{
          __html: markdown.render(story.body)
        }}
        data-font-size={preferences.fontSize}
        data-selectable
        data-width={preferences.paragraphWidth}
        ref="body"
      />

      <footer className="summary" />
    </section>
  }
}

export default branch(Story, {
  cursors: {
    preferences: ["preferences"]
  }
})

