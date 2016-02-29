import "./index.styl"
import favicon from "images/foundation/glyph-logo-small.png"

import "babel-polyfill"
import "lib/fullscreen-polyfill/register"

import React from "react"
import {render} from "react-dom"
import routes from "./routes"
import {Provider} from "react-redux"
import {browserHistory, Router} from "react-router"
import store from "./store"

document.head.appendChild(Object.assign(document.createElement("link"), {
  rel: "shortcut icon",
  sizes: "16x16",
  type: "image/x-icon",
  href: favicon
}))

document.addEventListener("DOMContentLoaded", () => {
  render(<Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.querySelector("main"))
})
