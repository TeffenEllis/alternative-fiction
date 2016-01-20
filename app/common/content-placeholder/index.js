import "./content-placeholder.styl"
import logo from "../../images/foundation/text-logo.svg"
// Placeholder component. Used to fill in loading wait time.

import React from "react"

export default React.createClass({
  render() {
    return <section data-component="content-placeholder">
      <img
        className="alternative-fiction-text-logo"
        src={logo} />
      <hr className="content-seperator" />

      <div className="quote">
        <p className="quote-body">
          Loading
        </p>
      </div>
    </section>
  }
})
