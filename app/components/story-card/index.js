import "./story-card.styl"

import HumanTime from "../human-time"
import React, {Component} from "react"
import {Link} from "react-router"

export default class StoryCard extends Component {
  render() {
    const {story} = this.props

    return <section data-column data-component="story-card">
      <Link className="title" to={`/stories/${story.uuid}`}>{story.title || "Untitled"}</Link>

      <div className="primary-details" data-selectable>
        Written by&nbsp;
        <Link className="author" to={`/users/${story.user.uuid}`}>{story.user.username}</Link>
        &nbsp;<HumanTime datetime={story.updatedAt} />
      </div>

      <div className="description" data-selectable>{story.description || "No description..."}</div>

      <div className="tags" data-selectable>
        {story.meta.tags.length > 0 ? `Tags: ${story.meta.tags.join(", ")}` : "No tags..."}
      </div>
    </section>
  }
}
