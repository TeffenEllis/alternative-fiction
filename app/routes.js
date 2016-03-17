import React from "react"
import Application from "components/application"
import ApplicationError from "components/application-error"
import createAuthenticatedComponent from "components/create-authenticated-component"
import Authenticate from "containers/authenticate"
import Contribute from "containers/contribute"
import Home from "containers/home"
import Search from "containers/search"
import Library from "containers/library"
import Editor from "containers/editor"
import * as stories from "containers/stories"
import * as users from "containers/users"
import {IndexRoute, Route} from "react-router"

const PassThroughHandler = ({children}) => children

export default (<Route component={Application} path="/">
  <IndexRoute component={Home} />

  <Route component={Authenticate} path="auth" />
  <Route component={Contribute} path="contribute" />
  <Route component={createAuthenticatedComponent(Library)} path="library" />
  <Route component={Search} path="search" />

  <Route component={PassThroughHandler} path="stories(/)">
    <Route component={createAuthenticatedComponent(stories._new)} path="new" />
    <Route component={stories.show} path=":id" />
    <Route component={Editor} path=":uuid/edit" />
  </Route>

  <Route component={PassThroughHandler} path="users(/)">
    <Route component={users.show} path=":uuid" />
  </Route>

  <Route component={ApplicationError} path="*" props={{statusCode: 404}} />
</Route>)
