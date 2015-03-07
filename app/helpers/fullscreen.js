// Abstract fullscreen API.
let fullscreenHelper = {}

Object.defineProperties(fullscreenHelper, {
  fullscreen: {
    set(enabled) {
      if (enabled) {
        return document.documentElement.requestFullscreen()
      } else {
        return document.exitFullscreen()
      }
    },

    get() {
      return !!document.fullscreenElement
    }
  }
})

export default fullscreenHelper
