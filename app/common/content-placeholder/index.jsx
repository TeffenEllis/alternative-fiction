// Placeholder component. Used to fill in loading wait time.

import React from "react"

export default React.createClass({
  render() {
    return <section className="content-placeholder">
      <img
        className="alternative-fiction-text-logo"
        src={require("../../images/foundation/text-logo.svg")} />
      <hr className="content-seperator" />

      <div className="quote">
        <p className="quote-body">
          Loading
        </p>
      </div>
    </section>
  }
})
