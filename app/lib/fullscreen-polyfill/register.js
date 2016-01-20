// Use JavaScript script mode
"use strict"

/* global Element */

const pollute = true
let api
let vendor
const apis = {
  // http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html
  w3: {
    enabled: "fullscreenEnabled",
    element: "fullscreenElement",
    request: "requestFullscreen",
    exit: "exitFullscreen",
    events: {
      change: "fullscreenchange",
      error: "fullscreenerror"
    }
  },
  webkit: {
    enabled: "webkitIsFullScreen",
    element: "webkitCurrentFullScreenElement",
    request: "webkitRequestFullScreen",
    exit: "webkitCancelFullScreen",
    events: {
      change: "webkitfullscreenchange",
      error: "webkitfullscreenerror"
    }
  },
  moz: {
    enabled: "mozFullScreen",
    element: "mozFullScreenElement",
    request: "mozRequestFullScreen",
    exit: "mozCancelFullScreen",
    events: {
      change: "mozfullscreenchange",
      error: "mozfullscreenerror"
    }
  },
  ms: {
    enabled: "msFullscreenEnabled",
    element: "msFullscreenElement",
    request: "msRequestFullscreen",
    exit: "msExitFullscreen",
    events: {
      change: "MSFullscreenChange",
      error: "MSFullscreenError"
    }
  }
}

const {w3} = apis

// Loop through each vendor's specific API
for (vendor in apis) {
  // Check if document has the "enabled" property
  if (apis[vendor].enabled in document) {
    // It seems this browser support the fullscreen API
    api = apis[vendor]
    break
  }
}

function dispatch(type, target) {
  const event = document.createEvent("Event")

  event.initEvent(type, true, false)
  target.dispatchEvent(event)
} // end of dispatch()

function handleChange(e) {
  // Recopy the enabled and element values
  document[w3.enabled] = document[api.enabled]
  document[w3.element] = document[api.element]

  dispatch(w3.events.change, e.target)
} // end of handleChange()

function handleError(e) {
  dispatch(w3.events.error, e.target)
} // end of handleError()

// Pollute only if the API doesn't already exists
if (pollute && !(w3.enabled in document) && api) {
  // Add listeners for fullscreen events
  document.addEventListener(api.events.change, handleChange, false)
  document.addEventListener(api.events.error, handleError, false)

  // Copy the default value
  document[w3.enabled] = document[api.enabled]
  document[w3.element] = document[api.element]

  // Match the reference for exitFullscreen
  document[w3.exit] = document[api.exit]

  // Add the request method to the Element's prototype
  Element.prototype[w3.request] = function() {
    return this[api.request](...arguments)
  }
}

// Expose fullscreen state to stylesheets.
document.addEventListener("fullscreenchange", function() {
  if (this.fullscreenElement)
    this.documentElement.classList.add("fullscreen")
  else
    this.documentElement.classList.remove("fullscreen")
})

document.addEventListener("fullscreenerror", function() {
  this.documentElement.classList.remove("fullscreen")
})

// Return the API found (or undefined if the Fullscreen API is unavailable)
export default api
