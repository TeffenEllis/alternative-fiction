import "./story.styl"

import React from "react"
import HumanTime from "components/human-time"
import EstimatedReadingTime from "components/estimated-reading-time"
import ViewControls from "stories/view-controls"
import FullscreenToggle from "stories/view-controls/fullscreen-toggle"
import ReadingPreferences from "stories/view-controls/reading-preferences"
import userPreferences from "helpers/user-preferences"
import markdown from "helpers/markdown"

export default React.createClass({
  componentDidMount() {
    // Update body reference for estimated reading time.
    this.forceUpdate()
  },

  render() {
    const {fontSize, paragraphWidth} = userPreferences.stories
    const {story} = this.props

    return <section data-column data-component="story" data-component-mode="view">
      <ViewControls
        primaryControls={[
          <EstimatedReadingTime textComponent={this.refs.body} trackScrollPosition />,
          <FullscreenToggle />
        ]}

        secondaryControls={[
          <ReadingPreferences storyComponent={this} />
        ]}
      />

      <header className="headline">
        <div className="title" data-placeholder="untitled" data-selectable ref="title">
          {story.title}
        </div>

        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: markdown.render(story.description)
          }}
          data-selectable
        />

        <div className="author">
          {story.author}
        </div>

        <HumanTime datetime={story.updatedAt} />
        <hr className="section-seperator" />
      </header>

      <article
        className="body"
        dangerouslySetInnerHTML={{
          __html: markdown.render(story.body)
        }}
        data-font-size={fontSize}
        data-selectable
        data-width={paragraphWidth}
        ref="body"
      />

      <footer className="summary" />
    </section>
  }
})

