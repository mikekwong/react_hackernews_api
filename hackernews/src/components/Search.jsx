import React from 'react'

const Search = ({ value, onChange, onSubmit, children }) => (
  // const { value, onChange, children } = this.props
  <form onSubmit={onSubmit}>
    {children}
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">{children}</button>
  </form>
)

export default Search
