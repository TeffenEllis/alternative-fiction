import {root} from "baobab-react/higher-order"
import SiteMenu from "components/site-menu"
import SiteNavigation from "containers/site-navigation"
import React, {Component} from "react"
import tree from "resources/tree"
import Flash from "containers/flash"

const NAVIGATION_CLASS = "site-navigation-active"

class Application extends Component {
  render() {
    return <div className="application-root">
      <SiteNavigation onNavigation={this.setNavigationClass.bind(this, "remove")} />
      <aside className="site-navigation-overlay" onClick={this.setNavigationClass.bind(this, "remove")} />

      <SiteMenu onNavigation={this.setNavigationClass.bind(this, "add")} />

      <div data-column id="content-container">
        <Flash />

        {this.props.children}
      </div>
    </div>
  }

  setNavigationClass(method) {
    document.body.classList[method](NAVIGATION_CLASS)
  }
}

export default root(Application, tree)
