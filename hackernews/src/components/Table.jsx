import React from 'react'
// import Button from './components/Button.jsx'
//
const Button = ({ onClick, className = '', children }) => (
  // const { onClick, className = '', children } = this.props
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
)

const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Table = ({ list, onDismiss }) => (
  // const { list, pattern, onDismiss } = this.props

  <div className="table">
    {list.map(item => (
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={midColumn}>{item.author}</span>
        <span style={smallColumn}>{item.num_comments}</span>
        <span>{item.points}</span>
        <span style={smallColumn}>
          <Button onClick={() => onDismiss(item.objectID)} type="button" className="button-inline">
            Dismiss
          </Button>
        </span>
      </div>
    ))}
  </div>
)

export default Table
