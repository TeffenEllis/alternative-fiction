import React from "react"
import Application from "common/application"
import ApplicationError from "common/application-error"
import stories from "stories"
import {IndexRoute, Route} from "react-router"

export default (<Route component={Application} path="/">
  <IndexRoute component={ApplicationError} />

  <Route component={stories.routeHandler} path="stories(/)">
    <IndexRoute component={stories.index} />

    <Route component={stories.new} path="new" />
    <Route component={stories.show} path=":id" />
    <Route component={stories.edit} path=":id/edit" />
  </Route>

  <Route component={ApplicationError} path="*" props={{statusCode: 404}} />
</Route>)
