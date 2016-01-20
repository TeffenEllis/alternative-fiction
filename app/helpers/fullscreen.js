// Abstract fullscreen API.
const fullscreenHelper = {}

Object.defineProperties(fullscreenHelper, {
  fullscreen: {
    set(enabled) {
      if (enabled) return document.documentElement.requestFullscreen()

      return document.exitFullscreen()
    },

    get() {
      return !!document.fullscreenElement
    }
  }
})

export default fullscreenHelper
