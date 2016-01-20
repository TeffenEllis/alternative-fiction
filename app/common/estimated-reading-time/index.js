// Estimated reading time component.
// Arguments:
// * text: String. Estimation is based off this.
// * textComponent: React Component. Subtract's scrolled percentage of text if given.

import React from "react"
import $ from "jquery"

import moment from "moment"
import {size, debounce} from "lodash"

const WORDS_PER_MINUTE = 250
const SCROLL_THROTTLE = 500

export default React.createClass({
  componentDidMount() {
    if (!this.props.trackScrollPosition) return

    // Calculating scroll position without jQuery is incredibly frustrating.
    // Each browser handles window scrolling dimensions differently.
    // The throttled function must be in a callback because React isn't detecting
    // that an update should be made.

    const throttledUpdate = debounce(this.forceUpdate.bind(this), SCROLL_THROTTLE)

    $(window).scroll(() => throttledUpdate())
  },

  componentWillUnmount() {
    $(window).unbind("scroll")
  },

  estimateTimeByText(text = "") {
    const wordCount = size(text.match(/\s+/g))
    const minutes = wordCount / WORDS_PER_MINUTE * (1 - this.percentageRead())

    return {wordCount, minutes}
  },

  getDefaultProps() {
    return {
      trackScrollPosition: false
    }
  },

  percentageRead() {
    if (!this.props.textComponent) return 0

    const $this = $(window)
    const currentY = $this.scrollTop()
    const windowHeight = $this.height()
    const scrollHeight = $(this.props.textComponent).height()
    const scrollPercent = currentY / (scrollHeight - windowHeight)

    // Percentage will be higher than 1 if the window is scrolled beyond the element.
    return Math.min(scrollPercent, 1)
  },

  render() {
    if (!this.props.textComponent) {
      return <span className="parent-component-not-ready" data-component="unresolved" />
    }

    let label = ""
    const {minutes, wordCount} = this.estimateTimeByText(this.props.textComponent.innerHTML)

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
})

