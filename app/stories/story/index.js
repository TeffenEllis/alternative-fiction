require("./story.styl")

import React from "react"
import HumanTime from "common/human-time"
import EstimatedReadingTime from "common/estimated-reading-time"
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
    let
      {fontSize, paragraphWidth} = userPreferences.stories,
      story = this.props.story

    return <section data-component="story" data-component-mode="view">
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
        <div className="title" ref="title" data-selectable data-placeholder="untitled">
          {story.title}
        </div>

        <div
          className="description"
          data-selectable
          dangerouslySetInnerHTML={{
            __html: markdown.render(story.description)
          }}
        />

        <div className="author">
          {story.author}
        </div>

        <HumanTime datetime={story.updatedAt} />
        <hr className="section-seperator" />
      </header>

      <article
        ref="body"
        className="body"
        data-selectable
        data-width={paragraphWidth}
        data-font-size={fontSize}
        dangerouslySetInnerHTML={{
          __html: markdown.render(story.body)
        }}
      />

      <footer className="summary" />
    </section>
  }
})

