import {branch} from "baobab-react/higher-order"
import React, {Component, PropTypes} from "react"
import getFields from "./get-fields"
import * as settingsActions from "resources/tree/actions/settings"

class Settings extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      fields: getFields(props.user)
    }
  }

  componentDidMount() {
    this._focusPrimaryField()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) this.context.router.push("/library")
  }

  _focusPrimaryField() {
    this.refs.primaryField.focus()
    this.refs.primaryField.select()
  }

  _handleFieldChange(index, {target: {value}}) {
    const {fields} = this.state

    fields[index].value = value

    this.setState({fields})
  }

  _handleSubmission(event) {
    event.preventDefault()

    const payload = this.state.fields
      .filter($ => $.value.length !== 0)
      .reduce((memo, $) => ({...memo, [$.name]: $.value}), {})

    this.props.actions.updateUser(payload)
  }

  render() {
    return <section data-column data-component="settings">
      <form className="form" data-column onSubmit={this._handleSubmission.bind(this)}>
        <div className="headline">Settings</div>

        {this.renderFields()}

        <input className="btn btn-primary" type="submit" value="Update"/>
      </form>
    </section>
  }

  renderFields() {
    const {fields} = this.state

    return fields.map((field, index) => {
      const key = field.name

      return <div className="field-group" key={key}>
        <input
          className="field"
          data-value={field.value.length > 0 ? "filled" : "empty"}
          id={key}
          onChange={this._handleFieldChange.bind(this, index)}
          {...field}
        />
        <div className="input-validation" />
        <label className="label" htmlFor={key}>{field.label || field.placeholder}</label>
      </div>
    })
  }
}

export default branch(Settings, {
  actions: {
    updateUser: settingsActions.updateUser
  },
  cursors: {
    user: ["user"]
  }
})
