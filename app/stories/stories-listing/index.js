// Table of stories.
// Arguments:
// * Stories: Array.

import React, {Component} from "react"

import {Link} from "react-router"
import HumanTime from "common/human-time"

export default class StoriesListing extends Component {
  deleteStory(id) {
    const storyRef = this.props.storiesRef.child(id)

    storyRef.remove(error => {
      if (error) return console.error(error)

      this.props.onChange()
    })
  }

  render() {
    const {stories} = this.props

    return <table className="table stories">
      <thead>
        <tr>
          <th className="id">ID</th>
          <th className="title">Title</th>
          <th className="description">Description</th>
          <th className="updated-at">Updated</th>
          <th className="created-at">Created</th>
          <th className="delete-story">Delete</th>
        </tr>
      </thead>

      <tbody>
        {stories.map(story => this.renderRow(story))}
      </tbody>
    </table>
  }

  renderDeleteConfirmation(id, story) {
    const actions = <div>
      <span className="btn dark btn-danger" onClick={this.deleteStory.bind(this, id)}>Yes</span>
      <span className="btn dark btn-primary" data-dismiss="modal">No</span>
    </div>

    const confirmationModal = <Modal actions={actions} title="Confirm Deletion" type="warning">
      <p key="text">{"Are you sure you want to delete"}</p>
      <p key="title">{`"${story.title}"?`}</p>
    </Modal>

    React.render(confirmationModal, document.querySelector("#above-content"))
  }

  renderRow({uuid, ...story}) {
    return <tr data-id={uuid} key={uuid}>
      <td className="id">{uuid}</td>

      <td className="title">
        <Link to={`/stories/${uuid}`}>
          {story.title || "untitled"}
        </Link>

        <Link to={`/stories/${uuid}/edit`}>
          (edit)
        </Link>
      </td>

      <td className="description">{story.description}</td>

      <td className="updated-at">
        <HumanTime datetime={story.updatedAt} />
      </td>

      <td className="created-at">
        <HumanTime datetime={story.createdAt} />
      </td>

      <td className="link delete-story">
        Delete
      </td>
    </tr>
  }
}
