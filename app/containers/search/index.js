import "./search.styl"

import title from "helpers/title"
import request from "lib/request"
import StoryCard from "components/story-card"
import React, {Component} from "react"
import keyMap from "resources/key-map"

const placeholder = "Title, description, or tags."

export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      criteria: props.location.query.criteria || "",
      results: null
    }

    this.$ = {
      _handleInput: this._handleInput.bind(this),
      _handleKeyDown: this._handleKeyDown.bind(this)
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  _fetchResults() {
    const {criteria} = this.state
    const {path} = this.props.route

    request("search", {
      body: {criteria},
      method: "POST"
    })
    .then(results => {
      this.setState({results})

      this.context.router.replace(`${path}?criteria=${encodeURIComponent(criteria)}`)
    })
  }

  _handleKeyDown(event) {
    if (event.keyCode !== keyMap.enter) return

    event.preventDefault()
    this._fetchResults()
  }

  _handleInput({target: {value}}) {
    this.setState({criteria: value})
  }

  componentDidMount() {
    document.title = title("Story search")

    if (this.state.criteria.length > 0) {
      this.refs.searchInput.select()
      this._fetchResults()
    }
  }

  render() {
    const {criteria} = this.state

    return <section data-column data-component="search">
      <div className="form" data-column>
        <div className="headline">Story Search</div>

        <div className="field-group">
          <input
            autoFocus
            className="field"
            data-value={criteria.length > 0 ? "filled" : "empty"}
            onChange={this.$._handleInput}
            onKeyDown={this.$._handleKeyDown}
            placeholder={placeholder}
            ref="searchInput"
            type="text"
            value={criteria}
          />

          <label className="label">{placeholder}</label>
        </div>
      </div>

      {this.state.results && this.renderResults()}
    </section>
  }

  renderResults() {
    const {results} = this.state

    if (results.length === 0) return <div>
      No results :(
    </div>

    return results.map(story => <StoryCard key={story.uuid} story={story} />)
  }
}
