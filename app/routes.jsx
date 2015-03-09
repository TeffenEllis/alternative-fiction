"use strict"

import React from "react"
import Application from "common/application"
import ApplicationError from "common/application-error"
import stories from "stories"
import {Route, NotFoundRoute, DefaultRoute} from "react-router"

let routes = <Route name="root" path="/" handler={Application}>
<DefaultRoute handler={ApplicationError.bind(this, {code: 204, message: "Alternative Fiction"})} />
  <Route name="stories" handler={stories.routeHandler}>
    <DefaultRoute handler={stories.index} />
    <Route name="stories-new" path="new" handler={stories.new} />
    <Route name="story" path=":id/?" handler={stories.show} />
    <Route name="story-edit" path=":id/edit" handler={stories.edit} />
  </Route>
</Route>

export default routes
