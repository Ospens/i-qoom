import React, { Component } from 'react'
import DropDown from '../../../../../elements/DropDown'

const disciplineList = [
  {
    label: 'FOU',
    enable: true,
    view_only: true
  },
  {
    label: 'HSE',
    enable: true,
    view_only: true
  },
  {
    label: 'LOG',
    enable: true,
    view_only: false
  },
  {
    label: 'SAA',
    enable: false,
    view_only: false
  },
  {
    label: 'SOO',
    enable: false,
    view_only: false
  },
  {
    label: 'TTT',
    enable: false,
    view_only: false
  },
  {
    label: 'XXX',
    enable: false,
    view_only: false
  },
  {
    label: 'YYY',
    enable: false,
    view_only: false
  },
]


const renderDropDownItems = ({ label, enable, view_only }, index) => {
  return (
    <div className='acceess-rights__drop-down-row' key={index}>
      <div className='col-4'>
        <label>{label}</label>
      </div>
      <div className='col-4'>
        <div className='d-flex'>
          <input
            type='checkbox'
            id={`enable_${index}`}
            checked={enable}
            onChange={() => toogleUsersRights()}
          />
          <label htmlFor={`enable_${index}`} />
        </div>
      </div>
      <div className='col-4'>
        <div className='d-flex'>
          <input
            type='checkbox'
            id={`view_${index}`}
            checked={view_only}
            onChange={() => toogleUsersRights()}
          />
          <label htmlFor={`view_${index}`} />
        </div>
      </div>
    </div>
  )
}

const rightsDropDown = (btnTitle, columnTitle, values) => {
  return (
    <DropDown
      className='dropdown-with-switch'
      btnName={btnTitle}
      btnClass='btn btn-for-switch'
    >
      <div className='acceess-rights__drop-down'>
        <div className='acceess-rights__drop-down-row'>
          <div className='col-4'>
            <label>{columnTitle}</label>
          </div>
          <div className='col-4'>
            <label>Enable</label>
          </div>
          <div className='col-4'>
            <label>Disable</label>
          </div>
        </div>
        {/* TODO: There should be user.doucment_rights_attributes[0].document_field_value_ids.map((... */}
        {disciplineList.map((element, index) => (
          renderDropDownItems(element, index)
        ))}
      </div>
    </DropDown>
  )
}

export default rightsDropDown