import React from 'react'
import { useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import classnames from 'classnames'

function Switch({ row, index }) {
  // TODO: change the condition
  if (index === 2) {
    return (
      <Popup
        trigger={<span className='slider round' />}
        on='click'
        className='dark-tooltip-container'
        position='left center'
        hideOnScroll
      >
        <div className='tooltip-block dark'>
          <div className='tooltip-text-block'>
            <span>
              You try to enable more than 6 quick-search filters.
              Please deselect one filter before your activate this one.
              </span>
          </div>
        </div>
      </Popup>
    )
  }
  return (
    <label htmlFor={row.title} className='switch mr-4'>
      <input
        type='checkbox'
        id={row.title}
        checked={row.enabled}
        onChange={(value) => this.handleSwitch(index, value)}
      />
      <span className='slider round' />
    </label>
  )
}

function SubColumn({ overview }) {
  return (
    <div className='overview-grid__column'>
      {[true, false].map((v, index) =>
        <div className='overview-grid__subcolumn' key={index}>
          {overview.filter(o => o.enabled === v).map((el, i) => (
            <div className='overview-grid__row' key={i}>
              <div className='d-flex'>
                <Switch row={el} />
                <label htmlFor={el.title} className={classnames({ 'dark': v })}>{el.title}</label>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Overview() {
  const overview = useSelector(state => state.settings.overview)

  return (
    <form noValidate={true}>
      <div className='my-4'><h6>List categories and arrangement</h6></div>
      <div className='overview-grid'>
        <div>
          <span className='column-title'>Prioritise and enable/disable document attributes</span>
          <SubColumn overview={overview} />
        </div>
        <div>
          <span className='column-title'>System generated Data</span>
          <SubColumn overview={overview} />
        </div>
      </div>
    </form>
  )
}

export default Overview
