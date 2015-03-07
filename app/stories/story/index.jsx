import React from "react"
import HumanTime from "../../common/human-time"
import EstimatedReadingTime from "../../common/estimated-reading-time"
import ViewControls from "../view-controls"
import FullscreenToggle from "../view-controls/fullscreen-toggle"
import ReadingPreferences from "../view-controls/reading-preferences"
import userPreferences from "../../helpers/user-preferences"
import markdown from "../../helpers/markdown"

export default React.createClass({
  componentDidMount() {
    // Update body reference for estimated reading time.
    this.forceUpdate()
  },

  render() {
    let
      {fontSize, paragraphWidth} = userPreferences.stories,
      story = this.props.story

    return <section className="story">
      <ViewControls
        primaryControls={[
          <EstimatedReadingTime textComponent={this.refs.body} trackScrollPosition />,
          <FullscreenToggle />
        ]}

        secondaryControls={[
          <ReadingPreferences storyComponent={this} />
        ]}
      />

      <header className="headline" data-selectable>
        <div className="title" ref="title" data-placeholder="untitled">
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

