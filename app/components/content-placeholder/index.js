import "./content-placeholder.styl"
import logo from "../../images/foundation/text-logo.svg"
// Placeholder component. Used to fill in loading wait time.

import React, {Component} from "react"

const VISIBILITY_DELAY = 4000

export default class ContentPlaceholder extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    this.visibilityTimeout = setTimeout(() => this.setState({visible: true}), VISIBILITY_DELAY)
  }

  componentWillUnmount() {
    clearTimeout(this.visibilityTimeout)
  }

  render() {
    return <section data-component="content-placeholder" data-visible={this.state.visible ? "" : null}>
      <img
        className="alternative-fiction-text-logo"
        src={logo} />
      <hr className="content-seperator" />

      <div className="quote">
        <p className="quote-body">
          Loading
        </p>
      </div>
    </section>
  }
}
