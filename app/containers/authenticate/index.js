import "./authenticate.styl"

import React, {Component} from "react"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import request from "../../lib/request"
import * as sessionActionCreators from "../../store/action-creators/session"
import getForms from "./get-forms"

class Authenticate extends Component {
  constructor(props) {
    super(props)

    const {user} = props

    this.$ = {
      _toggleReturningUser: this._toggleReturningUser.bind(this)
    }

    this.state = {
      forms: getForms(user),
      returningUser: !!user
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

    const {location: {query}, sessionActions} = this.props
    const body = {}
    const endpoint = {
      login: "auth",
      register: "users"
    }[formName]

    this.state.forms[formName].forEach(({name, value}) => body[name] = value)

    request(endpoint, {
      responseHeaders: true,
      body,
      method: "POST"
    })
    .then(({headers, payload}) => {
      sessionActions.authenticate({
        token: headers.get("authorization"),
        user: payload
      })

      this.context.router.push(query.redirectTo)
    })
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
    // TODO: Check the user's story count and alter the headline to "writer".
    return <form className="form" data-column onSubmit={this._handleSubmission.bind(this, "login")}>
      <div className="headline">Welcome back, reader.</div>

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

function mapStateToProps(state) {
  return {
    token: state.session.token,
    user: state.session.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate)
