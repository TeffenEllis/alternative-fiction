import React from "react"
import title from "./helpers/title"
import Router from "react-router"

export default React.createClass({
  mixins: [Router.State],

  getMessage() {
    return this.props.message || `"${this.getParams().splat}" is invalid.`
  },

  render() {
    <div className="error-page" data-code={this.props.code}>
      <h1>{this.props.code}</h1>
      <p>{this.getMessage()}</p>
    </div>
  },

  componentDidMount() {
    document.title = title(`${this.props.code} - Error`)
  }
})
