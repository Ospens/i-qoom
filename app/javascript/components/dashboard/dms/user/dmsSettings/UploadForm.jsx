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

function UploadForm() {
  const overview = useSelector(state => state.settings.overview)
  const halfWayThough = Math.floor(overview.length / 2)

  const overviewFirstHalf = overview.slice(0, halfWayThough)
  const overviewSecondHalf = overview.slice(halfWayThough, overview.length)
  
  return (
    <form noValidate={true}>
      <div className='my-4 d-flex'>
        <h6>Upload form settings</h6>
        <label className='ml-auto'>* Mandatory</label>
      </div>
      <div className='mb-4'>
        <span className='column-title'>Prioritise and enable/disable document attributes</span>
      </div>
      <div className='upload-form-grid'>
        <div className='upload-form-grid__column'>
          {overviewFirstHalf.map((el, i) => (
            <div className='upload-form-grid__row' key={i}>
              <div className='d-flex'>
                <label htmlFor={el.title} >{el.title}</label>
                <Switch row={el} />
              </div>
            </div>
          ))}
        </div>
        <div className='upload-form-grid__column'>
          {overviewSecondHalf.map((el, i) => (
            <div className='upload-form-grid__row' key={i}>
              <div className='d-flex'>
                <label htmlFor={el.title} >{el.title}</label>
                <Switch row={el} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  )
}

export default UploadForm
