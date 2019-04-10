import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import Left from '../images/arrow-button-left'
import Right from '../images/arrow-button-right'

function Arrows(props) {
  const { onClick, type } = props
  return (
    <ReactSVG
      className={type}
      svgStyle={{ height: 20, width: 20 }}
      src={ type == 'nextBtn' ? Right : Left }
      onClick={onClick}
    />
  )
}

export default Arrows
