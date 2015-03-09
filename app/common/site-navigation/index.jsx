require("./site-navigation.styl")

import React from "react"
import {Link} from "react-router"

export default React.createClass({
  render() {
    return <nav data-component="site-navigation" className="no-print">
      <section className="list-group">
        {this.renderItems()}
      </section>
    </nav>
  },

  renderItems() {
    return this.props.navigationItems.map((item, i) =>
      <Link
        to={item.path}
        params={{}}
        className="list-group-item"
        key={i}
        onClick={this.props.onNavigation}>
        <span className={`accent glyphicon glyphicon-${item.icon}`} />
        <span className="item-label">
          {item.label}
        </span>
      </Link>
    )
  }
})
