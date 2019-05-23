import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { Dropdown } from 'semantic-ui-react'
import dots from '../images/dots-horizontal'

export const trigger = svgStyle => {
  return (
    <ReactSVG
      svgStyle={svgStyle ? svgStyle : { height: 15, width: 15 }}
      src={dots}
      className='dropdown-menu-triger'
    />
  )
}

export const renderItem = (pic, title, action) => (
  <span onClick={action} className='text'>
    <ReactSVG
      svgStyle={{ height: 15, width: 15 }}
      src={pic}
    />
    <span className='item-text'>
      {title}
    </span>
  </span>
)

class DropDownMenu extends Component {

  renderItem = (pic, title, action) => (
    <span onClick={action} className='text'>
      <ReactSVG
        svgStyle={{ height: 15, width: 15 }}
        src={pic}
      />
      <span className='item-text'>
        {title}
      </span>
    </span>
  )

  render() {
    const { options, svgStyle } = this.props
    const list = options.map(({key, text, icon, onClick}) => ({
      key: key,
      text: this.renderItem(icon, text),
      onClick,
      selected: false
    }))

    return (
      <Dropdown trigger={trigger(svgStyle)} options={list} pointing='top right' icon={null} />
      )
  }
}
 
export default DropDownMenu