import "./view-controls.styl"

import React from "react"

export default React.createClass({
  getDefaultProps() {
    return {
      primaryControls: [],
      secondaryControls: []
    }
  },

  render() {
    const {primaryControls, secondaryControls} = this.props

    return <aside className="no-mobile no-print" data-component="view-controls">
      <section className="primary-controls">
        {primaryControls.map((component, index) =>
          <span className="control" key={index}>
            {component}
          </span>
        )}
      </section>

      <section className="secondary-controls">
        {secondaryControls.map((component, index) =>
          <span className="control" key={index}>
            {component}
          </span>
        )}
      </section>
    </aside>
  }
})
