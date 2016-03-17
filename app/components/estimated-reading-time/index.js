// Estimated reading time component.
// Arguments:
// * text: String. Estimation is based off this.
// * textComponent: React Component. Subtract's scrolled percentage of text if given.

import React, {Component} from "react"
import moment from "moment"

const WORDS_PER_MINUTE = 250

function getOffsetTop(element) {
  let offsetTop = 0

  do {
    if (!isNaN(element.offsetTop)) offsetTop += element.offsetTop
  }
  while (element = element.offsetParent) // eslint-disable-line no-cond-assign

  return offsetTop
}

function getTextEstimates(text, percentageRead) {
  const spaces = text.match(/\s+/g)
  const wordCount = spaces ? spaces.length : 0
  const minutes = wordCount / WORDS_PER_MINUTE * (1 - percentageRead)

  return {minutes, wordCount}
}

export default class EstimatedReadingTime extends Component {
  static defaultProps = {
    trackScrollPosition: false
  };

  state = {
    scrollPercentage: 0
  };

  componentDidMount() {
    if (!this.props.trackScrollPosition) return

    this.scrollHandler = this._updateScrollPercentage.bind(this)

    document
      .querySelector("#content-container")
      .addEventListener("scroll", this.scrollHandler)
  }

  componentWillUnmount() {
    window.removeEventListener(this.scrollHandler)
  }

  _updateScrollPercentage() {
    const element = this.props.textComponent

    this.parent = this.parent || document.querySelector("#content-container")

    // Consider the element's offset from the body and the portion visible from the viewport.
    const offsetTop = getOffsetTop(element) - document.documentElement.clientHeight
    // Consider if the element is beyond the viewport.
    const currentY = Math.max(this.parent.scrollTop - offsetTop, 0)
    const scrollPercentage = currentY / (element.scrollHeight || element.clientHeight)

    // Consider if the body is scrolled beyond the element.
    this.setState({scrollPercentage: Math.min(scrollPercentage, 1)})
  }

  render() {
    const {textComponent} = this.props

    if (!textComponent) {
      return <span className="parent-component-not-ready" data-component="unresolved" />
    }

    let label = ""
    const {minutes, wordCount} = getTextEstimates(textComponent.textContent, this.state.scrollPercentage)

    if (wordCount < WORDS_PER_MINUTE) {
      label = "A few seconds" // Very short text.
    }
    else if (minutes === 0) {
      label = "Finished"
    }
    else {
      label = moment().add(minutes, "m").fromNow(true)
    }

    return <span className="view-control" data-component="estimated-reading-time">
      {label}
    </span>
  }
}
