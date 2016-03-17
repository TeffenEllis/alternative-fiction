import "./authenticate.styl"

import {branch} from "baobab-react/higher-order"
import React, {Component} from "react"
import getForms from "./get-forms"
import * as sessionActions from "resources/tree/actions/session"

class Authenticate extends Component {
  constructor(props) {
    super(props)

    const {previousUser} = props

    this.$ = {
      _toggleReturningUser: this._toggleReturningUser.bind(this)
    }

    this.state = {
      forms: getForms(previousUser),
      returningUser: !!previousUser
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  _focusPrimaryField() {
    this.refs.primaryField.focus()
    this.refs.primaryField.select()
  }

  _handleFieldChange(formName, index, {target: {value}}) {
    const {forms} = this.state

    forms[formName][index].value = value

    this.setState({forms})
  }

  _handleSubmission(formName, event) {
    event.preventDefault()

    const {actions} = this.props
    const body = {}

    this.state.forms[formName].forEach(({name, value}) => body[name] = value)

    actions[formName](body)
  }

  _toggleReturningUser() {
    this.setState({returningUser: !this.state.returningUser})
  }

  componentDidMount() {
    this._focusPrimaryField()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.returningUser === prevState.returningUser) return

    this._focusPrimaryField()
  }

  componentWillReceiveProps({user}) {
    if (!user) return

    const {location: {query}} = this.props
    const {redirectTo = "/"} = query

    this.context.router.push(redirectTo)
  }

  render() {
    const {returningUser} = this.state

    return <section data-column data-component="authenticate">
      {returningUser ? this.renderLogin() : this.renderRegister()}
    </section>
  }

  renderFields(formName) {
    const fields = this.state.forms[formName]

    return fields.map((field, index) => {
      const key = formName + field.name

      return <div className="field-group" key={key}>
        <input
          className="field"
          data-value={field.value.length > 0 ? "filled" : "empty"}
          id={key}
          onChange={this._handleFieldChange.bind(this, formName, index)}
          {...field}
        />
        <div className="input-validation" />
        <label className="label" htmlFor={key}>{field.label || field.placeholder}</label>
      </div>
    })
  }

  renderLogin() {
    const previousUser = this.props.previousUser || {}
    const displayName = previousUser.displayName || "reader"

    return <form className="form" data-column onSubmit={this._handleSubmission.bind(this, "login")}>
      <div className="headline">Welcome back, {displayName}.</div>

      <div className="action deemphasized" onClick={this.$._toggleReturningUser}>
        I want to create a new account.
      </div>

      {this.renderFields("login")}

      <input className="btn btn-primary" type="submit" value="Login"/>
    </form>
  }

  renderRegister() {
    return <form className="form" data-column onSubmit={this._handleSubmission.bind(this, "register")}>
      <div className="headline">Your story begins here.</div>

      <div className="action deemphasized" onClick={this.$._toggleReturningUser}>
        I already have an account!
      </div>

      {this.renderFields("register")}

      <input className="btn btn-primary" type="submit" value="Register"/>
    </form>
  }
}

export default branch(Authenticate, {
  actions: {
    login: sessionActions.login,
    register: sessionActions.register
  },
  cursors: {
    error: ["containers", "authenticate", "error"],
    previousUser: ["previousUser"],
    user: ["user"]
  }
})
