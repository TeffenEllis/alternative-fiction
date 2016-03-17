import "./story-card.styl"

import HumanTime from "../human-time"
import React, {Component} from "react"
import {Link} from "react-router"
import Markdown from "components/markdown"

export default class StoryCard extends Component {
  static defaultProps = {
    authorMode: false
  };

  render() {
    const {authorMode, story} = this.props

    return <section data-column data-component="story-card">
      <div className="primary-details">
        <Link className="title" to={`/stories/${story.uuid}`}>{story.title || "Untitled"}</Link>
        {authorMode && <Link to={`/stories/${story.uuid}/edit`}>Edit</Link>}
      </div>

      <div className="secondary-details" data-selectable>
        Written by&nbsp;
        <Link className="author" to={`/users/${story.user.uuid}`}>{story.user.displayName}</Link>
        &nbsp;<HumanTime datetime={story.updatedAt} />
      </div>

      <Markdown className="description" data-selectable>
        {story.description || "No description..."}
      </Markdown>

      <div className="tags" data-selectable>
        {story.meta.tags.length > 0 ? `Tags: ${story.meta.tags.join(", ")}` : "No tags..."}
      </div>
    </section>
  }
}
