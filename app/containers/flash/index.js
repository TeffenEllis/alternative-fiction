import "./flash.styl"

import React, {Component} from "react"
import {branch} from "baobab-react/higher-order"

function Entry({message}) {
  return <div className="entry">
    <span className="message">{message}</span>
  </div>
}

class Flash extends Component {
  render() {
    return <section className="no-print" data-column data-component="flash" data-selectable>
      {this.props.entries.map(entry => <Entry key={entry.id} message={entry.message}/>)}
    </section>
  }
}

export default branch(Flash, {
  cursors: {
    entries: ["flash"]
  }
})
