import {root} from "baobab-react/higher-order"
import SiteMenu from "components/site-menu"
import SiteNavigation from "containers/site-navigation"
import React, {Component} from "react"
import tree from "resources/tree"
import Flash from "containers/flash"


class Application extends Component {
  render() {
    return <div className="application-root">
      <SiteNavigation onNavigation={this.toggleMenuState} />
      <aside className="site-navigation-overlay" onClick={this.toggleMenuState} />

      <SiteMenu onNavigation={this.toggleMenuState} />

      <div data-column id="content-container">
        <Flash />

        {this.props.children}
      </div>
    </div>
  }

  toggleMenuState() {
    const {dataset} = document.body

    dataset.menu = dataset.menu === "visible" ? "hidden" : "visible"
  }
}

export default root(Application, tree)
