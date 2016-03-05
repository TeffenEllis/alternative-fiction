import React, {Component} from "react"
import {connect} from "react-redux"

class Library extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const {context: {router}, props: {user}} = this

    router.push(user ? `/users/${user.uuid}` : "/")
  }

  render() {
    return <div />
  }
}

function mapStateToProps(state) {
  return {
    user: state.session.user
  }
}

export default connect(mapStateToProps)(Library)
