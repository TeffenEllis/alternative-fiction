import "./contribute.styl"

import React, {Component} from "react"

export default class Contribute extends Component {
  render() {
    return <section data-column data-component="contribute">
      <div className="headline">
        All made possible by users&nbsp;<strong>like you!</strong>
      </div>

      <p>
        Whether you're reading a story or sharing one of your own, you're part of what makes Alternative Fiction great.
      </p>

      <ul>
        <li>
          <a href="https://goo.gl/forms/28ZeIkPX8H" target="_blank">
            Tell us what you're thinking.
          </a>
        </li>

        <li>
          <a href="https://github.com/alternative-fiction" target="_blank">
            Report a bug or submit a change to our project.
          </a>
        </li>

        <li>
          ...Or just share your favorite stories with the world!
        </li>
      </ul>
    </section>
  }
}
