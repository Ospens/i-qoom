import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'

export class QuickSearch extends Component {

  handleSwitch = (row, value, subRow) => {
    // TODO: waiting a backend part
    console.log(row, value, subRow)
  }

  renderMainSwitch = (row, index) => {
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

  renderCommonField = (row, index) => (
    <div className='filter-grid-row' key={index}>
      <div className='common-row'>
        <label htmlFor={row.title}>{row.title}</label>
        <label htmlFor={row.title} className='switch ml-auto'>
          {this.renderMainSwitch(row, index)}
        </label>
      </div>
    </div>
  )

  renderDropDownField = (row, index) => (
    <div className='filter-grid-row' key={index}>
      <input id='grid-row-opener' type='checkbox' />
      <div className='d-flex'>
        <label htmlFor={row.title}>{row.title}</label>
        <label className='switch ml-auto'>
          <input
            type='checkbox'
            id={row.title}
            checked={row.enabled}
            onChange={(value) => this.handleSwitch(index, value)}
          />
          <span className='slider round' />
        </label>
        <label htmlFor='grid-row-opener' className='filter-grid-row-opener'>
          <i />
        </label>
      </div>

      <ul className='filter-grid-subcolumn'>
        {row.values.map((subRow, i) => (
          <li key={i} className='filter-grid-subrow'>
            <label htmlFor={subRow.title}>{subRow.title}</label>
            <label className='switch ml-auto'>
              <input
                id={subRow.title}
                type='checkbox'
                checked={row.enabled}
                onChange={(value) => this.handleSwitch(index, value, i)} />
              <span className='slider round' />
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  renderContent = () => {
    const { filters } = this.props
    
    return (
      <div className='dms-content bordered edit-convention'>
        <div className='dms-content__header p-4'>
          <h4>Define default filters</h4>
          <label> Prioritise and enable/disable</label>
        </div>

        <form className='form-body' >
          <div className='filter-grid'>
            {Object.keys(filters).map((column, i) => (
              <div className='filter-grid-column' key={i}>
                {filters[column].map((row, index) => (
                  row.values
                    ? this.renderDropDownField(row, index)
                    : this.renderCommonField(row, index)
                ))}
              </div>
            ))}
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={this.renderContent()}
      />
    )
  }
}

const mapStateToProps = ({ filters }) => ({
  filters: filters.current,
})

const mapDispatchToProps = dispatch => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(QuickSearch)
