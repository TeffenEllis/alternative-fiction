import "./modal.styl"

// React component for Bootstrap modals.
// Accepts an array of React objects for the body and actions.
// Arguments:
// * Type: String
// * Title: String
// * Body: React DOM
// * Actions: React DOM (Most likely an array).

import React, {Component} from "react"

export default class Model extends Component {
  static defaultProps = {
    onDismiss: () => null,
    title: "Information",
    type: "info"
  };

  render() {
    const {actions, children, onDismiss, title, type} = this.props

    return <section
      aria-hidden="true"
      aria-labelledby={type}
      data-column
      data-component="modal"
      data-type={type}
      onClick={onDismiss}
      role="dialog"
      tabIndex="-1">
      <div className="dialog" data-column>
        <div className="header">
          {title}
        </div>

        <div className="body" data-column>
          {children}
        </div>

        <div className="actions">
          {actions}
        </div>
      </div>
    </section>
  }
}
