import React from "react"

export default React.createClass({
  getDefaultProps() {
    return {
      primaryControls: [],
      secondaryControls: []
    }
  },

  render() {
    let {primaryControls, secondaryControls} = this.props

    return <aside className="view-controls no-mobile no-print">
      <section className="primary-controls">
        {primaryControls.map((component, i) =>
          <span key={i} className="control">
            {component}
          </span>
        )}
      </section>

      <section className="secondary-controls">
        {secondaryControls.map((component, i) =>
          <span key={i} className="control">
            {component}
          </span>
        )}
      </section>
    </aside>
  }
})
