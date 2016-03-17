import React from "react"
import {branch} from "baobab-react/higher-order"

export default function createAuthenticatedComponent(Component) {
  class AuthenticatedComponent extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object.isRequired
    };

    componentWillMount() {
      if (this.isAuthenticated(this.props)) return

      const {pathname} = this.props.location

      this.redirect(`/auth?redirectTo=${pathname}`)
    }

    componentWillReceiveProps(nextProps) {
      // User is probably logging out.
      if (!this.isAuthenticated(nextProps)) this.redirect("/")
    }

    redirect(path) {
      this.context.router.push(path)
    }

    isAuthenticated({user}) {
      return !!user
    }

    render() {
      return this.props.user ? <Component {...this.props} /> : null
    }
  }

  return branch(AuthenticatedComponent, {
    cursors: {
      user: ["user"]
    }
  })
}
