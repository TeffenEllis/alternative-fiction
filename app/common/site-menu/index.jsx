import React from "react"

export default React.createClass({
  render() {
    return <figure className="site-menu" onClick={this.props.onNavigation}>
      <img className="logo-svg" src={require("../../images/foundation/letters-logo-black.svg")} />
    </figure>
  }
})
