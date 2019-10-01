import React from 'react'

const Arrows = ({ onClick, type }) => (
  <span
    className={`icon-arrow-button-${type}`}
    onClick={onClick}
  />
)

export default Arrows
