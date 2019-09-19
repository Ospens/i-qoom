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
    <label htmlFor={row.title} className='switch ml-auto'>
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

function Row({ row }) {
  const nested = row.values
  
  return (
    <div className='filter-grid-row'>
      <input id={row.title + '1'} className='grid-row-opener' type='checkbox' />
      <div className={classnames('d-flex align-items-center', { 'common-row': !nested })}>
        <label htmlFor={row.title}>{row.title}</label>
        <label className='switch ml-auto'>
          <input
            type='checkbox'
            id={row.title}
            //checked={row.enabled}
            //onChange={value => this.handleSwitch(index, value)}
          />
          <span className='slider round' />
        </label>
        {nested &&
        <label htmlFor={row.title + '1'} className='filter-grid-row-opener'>
          <i className='svg-icon dark-arrow-icon black' />
        </label>}
      </div>

      <ul className='filter-grid-subcolumn'>
        {nested && row.values.map((subRow, i) => (
          <li key={i} className='filter-grid-subrow'>
            <label htmlFor={subRow.title}>{subRow.title}</label>
            <label className='switch ml-auto'>
              <input
                id={subRow.title}
                type='checkbox'
                // checked={row.enabled}
                //onChange={(value) => this.handleSwitch(index, value, i)} 
              />
              <span className='slider round' />
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QuickSearch() {
  const quickSearch = useSelector(state => state.settings.quickSearch)
  const halfWayThough = Math.floor(quickSearch.length / 2)

  const quickSearchFirstHalf = quickSearch.slice(0, halfWayThough)
  const quickSearchSecondHalf = quickSearch.slice(halfWayThough, quickSearch.length)

  return (
    <form noValidate={true}>
      <div className='my-4 d-flex'>
        <h6>Default filters</h6>
        <label className='ml-auto'>* Mandatory</label>
      </div>
      <div className='mb-4'>
        <span className='column-title'>Define up to six quick search filters</span>
      </div>
      <div className='filter-grid'>
        <div className='filter-grid-column' >
          {quickSearchFirstHalf.map((row, index) => (
            <Row row={row} key={index} />
          ))}
        </div>
        <div className='filter-grid-column' >
          {quickSearchSecondHalf.map((row, index) => (
            <Row row={row} key={index} />
          ))}
        </div>
      </div>
    </form>
  )
}

export default QuickSearch
