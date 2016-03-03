import React from "react"
import Application from "components/application"
import Authenticate from "containers/authenticate"
import Search from "containers/search"
import ApplicationError from "components/application-error"
import * as stories from "stories"
import {IndexRoute, Route} from "react-router"

export default (<Route component={Application} path="/">
  <IndexRoute component={ApplicationError} />

  <Route component={Authenticate} path="auth" />
  <Route component={Search} path="search" />

  <Route component={stories.routeHandler} path="stories(/)">
    <IndexRoute component={stories.listing} />

    <Route component={stories._new} path="new" />
    <Route component={stories.show} path=":id" />
    <Route component={stories.edit} path=":id/edit" />
  </Route>

  <Route component={ApplicationError} path="*" props={{statusCode: 404}} />
</Route>)
