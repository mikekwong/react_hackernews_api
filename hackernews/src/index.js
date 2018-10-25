import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

export const DEFAULT_QUERY = 'redux'
export const DEFAULT_HPP = '100'
export const PATH_BASE = 'https://hn.algolia.com/api/v1'
export const PATH_SEARCH = '/search'
export const PARAM_SEARCH = 'query='
export const PARAM_PAGE = 'page='
export const PARAM_HPP = 'hitsPerPage='

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

if (module.hot) {
  module.hot.accept()
}
