// Table of stories.
// Arguments:
// * Stories: Array.

import React from "react"

import {Link} from "react-router"
import HumanTime from "../../common/human-time"

export default React.createClass({
  deleteStory(id) {
    let storyRef = this.props.storiesRef.child(id)

    storyRef.remove(function (error) {
      if (error) {
        console.error(error)
      } else {
        this.props.onChange()
      }
    }.bind(this))
  },

  render() {
    let {stories} = this.props

    return <table className="table stories">
      <thead>
        <th className="id">ID</th>
        <th className="title">Title</th>
        <th className="description">Description</th>
        <th className="updated-at">Updated</th>
        <th className="created-at">Created</th>
        <th className="delete-story">Delete</th>
      </thead>

      <tbody>
        {Object.keys(stories).map((id) => this.renderRow(id, stories[id]))}
      </tbody>
    </table>
  },

  renderDeleteConfirmation(id, story) {
    let actions = <div>
      <span className="btn dark btn-danger" onClick={this.deleteStory.bind(this, id)}>Yes</span>
      <span className="btn dark btn-primary" data-dismiss="modal">No</span>
    </div>

    let confirmationModal = <Modal title="Confirm Deletion" type="warning" actions={actions}>
      <p key="text">{"Are you sure you want to delete"}</p>
      <p key="title">{'"' + story.title + '"?'}</p>
    </Modal>

    React.render(confirmationModal, document.querySelector("#above-content"))
  },

  renderRow(id, story) {
    return <tr data-id={id} key={id}>
      <td className="id">{id}</td>

      <td className="title">
        <Link to="story" params={{id: id}}>{story.title || "untitled"}</Link>
        <Link to="story-edit" params={{id: id}}>(edit)</Link>
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
})
