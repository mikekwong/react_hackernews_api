import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

import Button from './components/Button.jsx'
import Search from './components/Search.jsx'
import Table from './components/Table.jsx'

import { DEFAULT_QUERY, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP } from './index.js'

// extracted these into the index file for export
// const DEFAULT_QUERY = 'redux'
// const DEFAULT_HPP = '100'

// const PATH_BASE = 'https://hn.algolia.com/api/v1'
// const PATH_SEARCH = '/search'
// const PARAM_SEARCH = 'query='
// const PARAM_PAGE = 'page='
// const PARAM_HPP = 'hitsPerPage='

// const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
// console.log(url)

// Now we’ll introduce another improvement for the Hacker News request in the App component.
// Imagine the component mounts when the page is rendered for the first time in the browser. In
// componentDidMount() the component starts to make the request, but then the user navigates away
// from the page with this rendered component. Then the App component unmounts, but there is still a pending request from componentDidMount() lifecycle method. It will attempt to use this.setState()
// eventually in the then() or catch() block of the promise. You will likely see the following warning on your command line, or in your browser’s developer output: Warning: Can only update a mounted
// or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component. This is a no-op.
// You can handle this issue by aborting the request when your component unmounts or preventing
// this.setState() on an unmounted component. It is considered a best practice in React to preserve
// an clean application without warnings. However, the current promise API doesn’t implement
// aborting a request, so we add a workaround, introducing a class field that holds the lifecycle state of  your component. It can be initialized as false when the component initializes, changed to true when the component mounted, and then reset to false when the component unmounted. This way, you can keep track of your component’s lifecycle state. It doesn’t affect the local state stored and modified with this.state and this.setState(), because you can access it directly on the component instance without relying on React’s local state management. Moreover, it doesn’t lead to any re-rendering of the component when the class field is changed.

export default class App extends Component {
  _isMounted = false
  constructor(props) {
    super(props)
    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY
      // list,
      // searchTerm: ''
    }
    this.onDismiss = this.onDismiss.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    // this.setSearchTopStories = this.setSearchTopStories.bind(this)
  }

  onSearchSubmit(e) {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm)
    }
    e.preventDefault()
  }

  // vanilla JS way with fetch
  // fetchSearchTopStories(searchTerm) {
  //   fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
  //     .then(result => this.setSearchTopStories(result.data))
  //     .catch(error => error)
  // }
  //
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm]
  }

  setSearchTopStories(result) {
    const { hits, page } = result
    const { searchKey, results } = this.state

    const oldHits = results && results[searchKey] ? results[searchKey].hits : []
    const updatedHits = [...oldHits, ...hits]
    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } } })
  }

  componentDidMount() {
    this._isMounted = true

    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  // In this code, we call axios(), which uses an HTTP GET request by default. You can make the GET
  // request explicit by calling axios.get(), or you can use another HTTP method such as HTTP POST
  // with axios.post().
  async fetchSearchTopStories(searchTerm, page = 0) {
    try {
      const res = await axios(
        `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
      )
      this._isMounted && this.setSearchTopStories(res.data)
    } catch (err) {
      this._isMounted && console.log(err)
    }
  }

  onDismiss(id) {
    // Filter the object in the list that doesn't match ondismiss's current object
    const { searchKey, results } = this.state
    const { hits, page } = results[searchKey]

    const isNotId = item => item.objectID !== id
    const updatedHits = hits.filter(isNotId)
    this.setState({ results: { ...results, [searchKey]: { hits: updatedHits, page } } })
  }

  onSearchChange(e) {
    this.setState({ searchTerm: e.target.value })
  }

  render() {
    console.log(this.state)
    const { results, searchTerm, searchKey } = this.state
    const page = (results && results[searchKey] && results[searchKey].page) || 0
    const list = (results && results[searchKey] && results[searchKey].hits) || []
    if (!results) {
      return null
    }
    return (
      <div className="page">
        <div className="interactons">
          <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
            Search
          </Search>
          {results && <Table list={list} pattern={searchTerm} onDismiss={this.onDismiss} />}
          <div className="interactions">
            <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>More</Button>
          </div>
        </div>
      </div>
    )
  }
}
