import React from 'react'

const Button = ({ onClick, className = '', children }) => (
  // const { onClick, className = '', children } = this.props
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
)

export default Button
