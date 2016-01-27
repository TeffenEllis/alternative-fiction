import "./site-navigation.styl"

import React from "react"
import {Link} from "react-router"

export default React.createClass({
  render() {
    return <nav className="no-print" data-component="site-navigation">
      <section className="list-group">
        {this.renderItems()}
      </section>
    </nav>
  },

  renderItems() {
    return this.props.navigationItems.map((item, index) =>
      <Link
        className="list-group-item"
        key={index}
        onClick={this.props.onNavigation}
        to={item.path}>
        <span className={`accent glyphicon glyphicon-${item.icon}`} />

        <span className="item-label">
          {item.label}
        </span>
      </Link>
    )
  }
})
