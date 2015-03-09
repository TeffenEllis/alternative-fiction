require("./site-menu.styl")

import React from "react"

export default React.createClass({
  render() {
    return <aside data-component="site-menu" onClick={this.props.onNavigation}>
      <img className="logo-svg" src={require("../../images/foundation/letters-logo-black.svg")} />
    </aside>
  }
})
