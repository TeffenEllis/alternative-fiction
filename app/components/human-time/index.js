// Humanized timestamp component.
// Arguments:
// * datetime: UTC (Unix Epoch)

import React from "react"
import moment from "moment"

const REFRESH_DELAY = 1000

export default React.createClass({
  componentDidMount() {
    this.interval = setInterval(this.refresh, REFRESH_DELAY)
  },

  componentWillUnmount() {
    clearInterval(this.interval)
  },

  refresh() {
    this.forceUpdate()
  },

  render() {
    const momentInstance = moment(this.props.datetime)
    const ISOFormatted = momentInstance.toISOString()

    return <time className="human-time" dateTime={ISOFormatted} title={ISOFormatted}>
      {momentInstance.fromNow()}
    </time>
  }

})
