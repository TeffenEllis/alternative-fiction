import "./site-navigation.styl"

import {branch} from "baobab-react/higher-order"
import navigationItems from "./items"
import React, {Component} from "react"
import * as sessionActions from "resources/tree/actions/session"
import ListGroupItem from "./list-group-item"

const contribute = {
  icon: "heart",
  label: "Contribute",
  path: "/contribute"
}

class SiteNavigation extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  _handleNavigation({path}, event) {
    this.props.onNavigation()

    if (event) {
      if (event.button === 1) return
      event.preventDefault()
    }

    this.context.router.push(path)
  }

  _unauthenticate() {
    this.props.actions.logout()
    this.props.onNavigation()
  }

  render() {
    return <section className="no-print" data-column data-component="site-navigation">
      <div className="list-group" data-column>
        {this.renderItems()}
        {this.renderAuth()}
      </div>

      <div className="list-group" data-column>
        <ListGroupItem {...contribute}
          onClick={this._handleNavigation.bind(this, {path: contribute.path})}
        />
      </div>
    </section>
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
      <ListGroupItem {...item}
        key={index}
        onClick={this._handleNavigation.bind(this, item)}
      />
    )
  }
}

export default branch(SiteNavigation, {
  actions: {
    logout: sessionActions.logout
  },
  cursors: {
    user: ["user"]
  }
})
