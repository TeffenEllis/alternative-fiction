import React, {Component} from "react"
import SiteMenu from "components/site-menu"
import SiteNavigation from "containers/site-navigation"

const NAVIGATION_CLASS = "site-navigation-active"

export default class Application extends Component {
  render() {
    return <div className="application-root">
      <SiteNavigation onNavigation={this.setNavigationClass.bind(this, "remove")} />
      <aside className="site-navigation-overlay" onClick={this.setNavigationClass.bind(this, "remove")} />

      <div data-column id="content-container">
        <SiteMenu onNavigation={this.setNavigationClass.bind(this, "add")} />
        {this.props.children}
      </div>
    </div>
  }

  setNavigationClass(method) {
    document.body.classList[method](NAVIGATION_CLASS)
  }
}
