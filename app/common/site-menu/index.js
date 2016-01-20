import "./site-menu.styl"
import logo from "../../images/foundation/letters-logo-black.svg"

import React from "react"

export default React.createClass({
  render() {
    return <aside className="no-print" data-component="site-menu" onClick={this.props.onNavigation}>
      <img className="logo-svg" src={logo} />
    </aside>
  }
})
