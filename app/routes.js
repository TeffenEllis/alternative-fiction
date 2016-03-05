import React from "react"
import Application from "components/application"
import Authenticate from "containers/authenticate"
import Search from "containers/search"
import * as stories from "containers/stories"
import * as users from "containers/users"
import ApplicationError from "components/application-error"
import {IndexRoute, Route} from "react-router"

const PassThroughHandler = ({children}) => children

export default (<Route component={Application} path="/">
  <IndexRoute component={stories.listing} />

  <Route component={Authenticate} path="auth" />
  <Route component={Search} path="search" />

  <Route component={PassThroughHandler} path="stories(/)">
    <IndexRoute component={stories.listing} />

    <Route component={stories._new} path="new" />
    <Route component={stories.show} path=":id" />
    <Route component={stories.edit} path=":id/edit" />
  </Route>

  <Route component={PassThroughHandler} path="users(/)">
    <Route component={users.show} path=":uuid" />
  </Route>

  <Route component={ApplicationError} path="*" props={{statusCode: 404}} />
</Route>)
