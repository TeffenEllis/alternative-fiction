import React, {Component} from "react"
import SiteMenu from "common/site-menu"
import SiteNavigation from "common/site-navigation"
import navigation from "resources/navigation"

const NAVIGATION_CLASS = "site-navigation-active"

export default class Application extends Component {
  render() {
    return <div className="application-root">
      <div id="above-content" />

      <SiteNavigation navigationItems={navigation.items} onNavigation={this.setNavigationClass.bind(this, "remove")} />
      <aside className="site-navigation-overlay" onClick={this.setNavigationClass.bind(this, "remove")} />

      <div id="main-content">
        <SiteMenu onNavigation={this.setNavigationClass.bind(this, "add")} />
        {this.props.children}
      </div>
    </div>
  }

  setNavigationClass(method) {
    document.body.classList[method](NAVIGATION_CLASS)
  }
}
