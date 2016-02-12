// Table of stories.
// Arguments:
// * Stories: Array.

import HumanTime from "components/human-time"
import Modal from "components/modal"
import request from "lib/request"
import React, {Component} from "react"
import {Link} from "react-router"

export default class StoriesListing extends Component {
  state = {
    uuidPendingDestruction: null
  };

  _destroyStory(uuid) {
    request(`stories/${uuid}`, {method: "DELETE"})
      .then(() => this.props.onChange())
  }

  _setStoryDestruction(uuid) {
    this.setState({uuidPendingDestruction: uuid})
  }

  render() {
    const {stories} = this.props

    return <div>
      {this.state.uuidPendingDestruction && this.renderDestructionConfirmation()}

      <table className="table stories">
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
    </div>
  }

  renderDestructionConfirmation() {
    const {uuidPendingDestruction} = this.state
    const {title, uuid} = this.props.stories.find(({uuid}) => uuid === uuidPendingDestruction)
    const cancelDestruction = this._setStoryDestruction.bind(this, null)

    const actions = [
      <span className="btn dark btn-danger" key="destroy" onClick={this._destroyStory.bind(this, uuid)}>Delete</span>,
      <span className="btn dark btn-primary" key="cancel" onClick={cancelDestruction}>Cancel</span>
    ]

    return <Modal actions={actions} onDismiss={cancelDestruction} title="Confirm Deletion" type="warning">
      <span key="text">{"Are you sure you want to delete"}</span>
      <span key="title">{`"${title}"?`}</span>
    </Modal>
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

      <td className="link delete-story" onClick={this._setStoryDestruction.bind(this, uuid)}>
        Delete
      </td>
    </tr>
  }
}
