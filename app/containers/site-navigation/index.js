import "./site-navigation.styl"

import React, {Component} from "react"
import {connect} from "react-redux"
import navigationItems from "./items"

class SiteNavigation extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  _handleNavigation(item) {
    // TODO: pass where they were going.
    const path = !item.requireAuthentication || this.props.token ? item.path : `/auth?redirectTo=${item.path}`

    this.context.router.push(path)
    this.props.onNavigation()
  }

  render() {
    return <nav className="no-print" data-component="site-navigation">
      <section className="list-group" data-column>
        {this.renderItems()}
      </section>
    </nav>
  }

  renderItems() {
    return navigationItems.map((item, index) =>
      <div
        className="list-group-item"
        key={index}
        onClick={this._handleNavigation.bind(this, item)}>
        <span className={`accent glyphicon glyphicon-${item.icon}`} />

        <span className="item-label">
          {item.label}
        </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    token: state.session.token
  }
}

export default connect(mapStateToProps)(SiteNavigation)
