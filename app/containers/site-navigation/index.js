import "./site-navigation.styl"

import navigationItems from "./items"
import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as sessionActionCreators from "store/action-creators/session"
import ListGroupItem from "./list-group-item"

class SiteNavigation extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  _handleNavigation({path, requireAuthentication}) {
    if (requireAuthentication && !this.props.user) path = `/auth?redirectTo=${path}`

    this.context.router.push(path)
    this.props.onNavigation()
  }

  _unauthenticate() {
    this.props.sessionActions.unauthenticate()
    this.context.router.push("/")
    this.props.onNavigation()
  }

  render() {
    return <nav className="no-print" data-component="site-navigation">
      <section className="list-group" data-column>
        {this.renderItems()}
        {this.renderAuth()}
      </section>
    </nav>
  }

  renderAuth() {
    if (this.props.user) return <ListGroupItem
      icon="log-out"
      label="Log out"
      onClick={this._unauthenticate.bind(this)}
    />

    return <ListGroupItem
      icon="log-in"
      label="Log in"
      onClick={this._handleNavigation.bind(this, {path: "/auth"})}
    />
  }

  renderItems() {
    return navigationItems.map((item, index) =>
      <ListGroupItem
        icon={item.icon}
        key={index}
        label={item.label}
        onClick={this._handleNavigation.bind(this, item)}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActionCreators, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteNavigation)
