"use strict"

import React from "react"
import Application from "./application"
import stories from "./stories"
import ErrorPage from "./error-page"
import {Route, NotFoundRoute, DefaultRoute} from "react-router"

let routes = <Route name="root" path="/" handler={Application}>
<DefaultRoute handler={ErrorPage.bind(this, {code: 204, message: "Alternative Fiction"})} />
  <Route name="stories" handler={stories.routeHandler}>
    <DefaultRoute handler={stories.index} />
    <Route name="stories-new" path="new" handler={stories.new} />
    <Route name="story" path=":id" handler={stories.show} />
    <Route name="story-edit" path=":id/edit" handler={stories.edit} />
  </Route>
</Route>

export default routes
