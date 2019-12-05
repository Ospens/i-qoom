import React from 'react'
import { useSelector } from 'react-redux'
import { Popup } from 'semantic-ui-react'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../sideBar/DmsSideBar'

const trigger = <span className="slider round" />

function MainSwitch({ row, index }) {
  // TODO: change the condition
  if (index === 2) {
    return (
      <Popup
        trigger={trigger}
        on="click"
        className="dark-tooltip-container"
        position="left center"
        hideOnScroll
      >
        <div className="tooltip-block dark">
          <div className="tooltip-text-block">
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
    <label htmlFor={row.title} className="switch ml-auto">
      <input
        type="checkbox"
        id={row.title}
        // checked={row.enabled}
        // onChange={v => console.log(v)}
      />
      <span className="slider round" />
    </label>
  )
}

function CommonField({ row, index }) {
  return (
    <div className="filter-grid-row" key={index}>
      <div className="common-row">
        <label htmlFor={row.title}>{row.title}</label>
        <label htmlFor={row.title} className="switch ml-auto">
          <MainSwitch row={row} index={index} />
        </label>
      </div>
    </div>
  )
}

function DropDownField({ row, index }) {
  return (
    <div className="filter-grid-row" key={index}>
      <input id="grid-row-opener" className="grid-row-opener" type="checkbox" />
      <div className="d-flex align-items-center">
        <label htmlFor={row.title}>{row.title}</label>
        <label className="switch ml-auto">
          <input
            type="checkbox"
            id={row.title}
            // checked={row.enabled}
            // onChange={v => console.log(v)}
          />
          <span className="slider round" />
        </label>
        <label htmlFor="grid-row-opener" className="filter-grid-row-opener">
          <span className="icon-arrow-button-down black" />
        </label>
      </div>

      <ul className="filter-grid-subcolumn">
        {row.values.map(subRow => (
          <li key={`${subRow.title}`} className="filter-grid-subrow">
            <label htmlFor={subRow.title}>{subRow.title}</label>
            <label className="switch ml-auto">
              <input
                id={subRow.title}
                type="checkbox"
                // checked={row.enabled}
                // onChange={v => console.log(v)}
              />
              <span className="slider round" />
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Content() {
  const filters = useSelector(({ filters: f }) => f.current)
  //
  // handleSwitch = (row, value, subRow) => {
  //   // TODO: waiting a backend part
  //   console.log(row, value, subRow)
  // }
  return (
    <div className="dms-content bordered edit-convention">
      <div className="dms-content__header">
        <h4>Define default filters</h4>
        <label>Prioritise and enable/disable</label>
      </div>

      <form noValidate className="form-body">
        <div className="filter-grid">
          {Object.keys(filters).map(column => (
            <div className="filter-grid-column" key={`column${column}`}>
              {filters[column].map((row, index) => (
                row.values
                  ? <DropDownField row={row} index={index} key={`column${column}${row.position}`} />
                  : <CommonField row={row} index={index} key={`column${column}${row.position}`} />
              ))}
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

function QuickSearch() {
  const sidebar = <DmsSideBar />
  const content = <Content />

  return (
    <DMSLayout
      sidebar={sidebar}
      content={content}
    />
  )
}

export default QuickSearch
