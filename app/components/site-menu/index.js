import "./site-menu.styl"
import logo from "../../images/foundation/letters-logo-black.svg"

import React from "react"

export default ({onNavigation}) => {
  return <aside className="no-print" data-component="site-menu" onClick={onNavigation}>
    <img className="logo-svg" src={logo} />
  </aside>
}
