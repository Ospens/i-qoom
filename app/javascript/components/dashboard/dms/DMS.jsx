import React, { Component } from 'react'
import './DMS.scss'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import { startFetchDocuments } from '../../../actions/documentsActions'
import { Table } from 'semantic-ui-react'
import DropDown from '../../../elements/DropDown'
import blueCheck from '../../../images/add_1'
import revisionIcon from '../../../images/Revise_2'
import editDocIcon from '../../../images/common-file-edit'
import overviewIcon from '../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../images/task-list-settings'
import docPlanIcon from '../../../images/calendar-3'
import allDocIcon from '../../../images/folder-image'
import myDocIcon from '../../../images/folder-image-1'
import emailSendIcon from '../../../images/email-action-send-2'
import copyToFolderIcon from '../../../images/folder-empty'
import showDetailsIcon from '../../../images/common-file-text'
import dlIcon from '../../../images/common-file-text_gary'
import nativeIcon from '../../../images/common-file-text-1'
import pdfIcon from '../../../images/office-file-pdf'
import xlsIcon from '../../../images/office-file-xls'
import xmlIcon from '../../../images/xml-1'
import csvIcon from '../../../images/csv-1'
import downloadDetailsIcon from '../../../images/download-button'
import reviewDocIcon from '../../../images/single-neutral-actions-text'
import dots from '../../../images/dots-horizontal'

const menuItems = [
  {
    title: 'Overview',
    icon: overviewIcon
  },
  {
    title: 'DMS Settings',
    icon: dmsSettingsIcon
  },
  {
    title: 'Document planning',
    icon: docPlanIcon
  }
]

const foldersItems = [
  {
    title: 'All documents',
    icon: allDocIcon
  },
  {
    title: 'My documents',
    icon: myDocIcon
  }
]

const actionDDitems = [
  {
    title: 'Email',
    icon: emailSendIcon
  },
  {
    title: 'Copy to folder',
    icon: copyToFolderIcon
  },
  {
    title: 'Show details',
    icon: showDetailsIcon
  },
  {
    title: 'Download Files',
    icon: downloadDetailsIcon
  },
  {
    title: 'Edit document',
    icon: editDocIcon
  },
  {
    title: 'Add revision',
    icon: revisionIcon
  },
  {
    title: 'Review document',
    icon: reviewDocIcon
  },
  {
    title: 'Download as list',
    icon: downloadDetailsIcon
  }
]

const reviewStatuses = [
  {
    title: 'Accepted',
    color: 'green',
    count: 23
  },
  {
    title: 'In progress',
    color: 'yellow',
    count: 77
  },
  {
    title: 'Rejected',
    color: 'red',
    count: 0
  },
  {
    title: 'IRF/IFA',
    color: 'gray',
    count: 0
  },
]

const columns = [
  { title: 'DOC-ID', divider: true },
  { title: 'Document Title', divider: true },
  { title: 'DL', divider: true },
  { title: 'Native', divider: true },
  { title: 'Additional', divider: true },
  { title: 'Revision', divider: true },
  { title: 'Version', divider: true }
]

const DtOptions = [
  {
    key: 'certification',
    title: 'Certification'
  },
  {
    key: 'contracts',
    title: 'Contracts'
  },
  {
    key: 'dataSheets',
    title: 'Data Sheets'
  },
  {
    key: 'drawings',
    title: 'Drawings'
  },
  {
    key: 'hsse',
    title: 'HSSE'
  },
  {
    key: 'letters',
    title: 'Letters'
  },
  {
    key: 'reports',
    title: 'Reports'
  },
  {
    key: 'shedules',
    title: 'Shedules'
  }
] 
class DMS extends Component {

  state = {
    column: null,
    direction: null,
    myReview: false,
    allReview: false,
    checkedDocs: [],
    checkedDocTypes: []
   }

  componentWillMount() {
    const { startFetchDocuments } = this.props
    startFetchDocuments()
  }

  renderHeader = () => {
    const { checkedDocs } = this.state
    const checkedLength = checkedDocs.length
    const btnClass = classnames('btn with-icon', { 'disable': checkedLength === 0 })

    return (
      <ul className='head-buttons'>
        <li>
          <button type='button' className='btn with-icon'>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginRight: 5 }}
              src={blueCheck}
            />
            <span>Create new Document</span>
          </button>
        </li>
        <li>
          <button type='button' className={btnClass}>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginRight: 5 }}
              src={revisionIcon}
            />
            <span>
              Add revision {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
        <li>
          <button type='button' className={btnClass}>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginRight: 5 }}
              src={editDocIcon}
              svgClassName='edit-doc-icon'
            />
            <span className='head-button__gray-text'>
              Edit document {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
      </ul>
    )
  }

  renderDropDownItems = (pic, name) => (
    <li className='dropdown-item' >
      <ReactSVG
        svgStyle={{ height: 20, width: 20 }}
        src={pic}
      />
      <span className='item-text'>
        {name}
      </span>
    </li>
  )

  handleChange = e => {
    const { checkedDocTypes } =  this.state
    this.setState({ [checkedDocTypes[e.target.id]]: e.target.value })
  }

  renderTableHeader = () => {
    const { checkedDocTypes } = this.state

    return (
      <div className='dms-container__table-header'>
        <h5>Show</h5>
        <DropDown
          btnName='Documents Types'
          btnClass='btn dms-topbar-menu__dropdown'
        >
          <ul>
            {DtOptions.map(({ key, title }, i) => {
              const checked = checkedDocTypes.includes(key)
              const liClass = classnames('dms-topbar-menu__li-item', { checked })

              return (
                <li key={i} className={liClass}>
                  <input
                    type='checkbox'
                    id={`dt_${key}`}
                    checked={checked}
                    onChange={() => this.checkItem('checkedDocTypes', checkedDocTypes, key)}
                  />
                  <label htmlFor={`dt_${key}`} />
                  <span htmlFor={`dt_${key}`}>{title}</span>
                </li>
              )
            })}
            <li className='dms-topbar-menu__li-item'>
              <span>Variation Orders</span>
            </li>
            <li className='dms-topbar-menu__li-item'>
              <span>Vorem</span>
            </li>
          </ul>
        </DropDown>

        <DropDown
          btnName='Documents Types'
          btnClass='btn dms-topbar-menu__dropdown'
        >
          <ul>
            <li>
              <span>Contractor</span>
            </li>
          </ul>
        </DropDown>

        <DropDown
          btnName='Discipline'
          btnClass='btn dms-topbar-menu__dropdown'
        >
          <ul>
            <li>
              <span>Contractor</span>
            </li>
          </ul>
        </DropDown>

        <DropDown
          btnName='Quality Reports'
          btnClass='btn dms-topbar-menu__dropdown'
        >
          <ul>
            <li>
              <span>Contractor</span>
            </li>
          </ul>
        </DropDown>

        <DropDown
          btnName='Relevance'
          btnClass='btn dms-topbar-menu__dropdown'
        >
          <ul>
            <li>
              <span>Contractor</span>
            </li>
          </ul>
        </DropDown>

        <DropDown
          btnName='Reports'
          btnClass='btn dms-topbar-menu__dropdown'
        >
          <ul>
            <li>
              <span>Contractor</span>
            </li>
          </ul>
        </DropDown>
      </div>
    )
  }

  checkItem = (stateName, stateItems, value) => {
    let newVal

    if (stateItems.includes(value)) {
      newVal = stateItems.filter(el => el !== value)
    } else {
      stateItems.push(value)
    }

    this.setState({ [stateName]: newVal || stateItems })
  }

  renderTable = () => {
    const { documents } = this.props
    const { checkedDocs } = this.state
    return (
      <React.Fragment>
        { this.renderTableHeader() }
        <Table sortable className='mamber-managment-table'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell className='table-checkbox'>
                <div>
                  <input
                    type='checkbox'
                    id='check_all'
                  />
                  <label htmlFor='check_all' />
                </div>
              </Table.HeaderCell>
              {columns.map(({ title, divider }, i) => (
                <Table.HeaderCell key={i}>
                  {divider && <span className='divider' />}
                  <span>{title}</span>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {documents.map((doc, i) => (
              <Table.Row key={i}>

                <Table.Cell>
                  <DropDown
                    btnComponent={
                      <ReactSVG
                        svgStyle={{ height: 20, width: 20 }}
                        src={dots}
                      />
                    }
                    className='dropdown-with-icon'
                  >
                    {actionDDitems.map(({ icon, title }, i) => (
                      <React.Fragment key={i}>
                        {this.renderDropDownItems(icon, title)}
                      </React.Fragment>
                    ))}
                  </DropDown>
                </Table.Cell>

                <Table.Cell className='table-checkbox'>
                  <div>
                    <input
                      type='checkbox'
                      id={doc.id}
                    />
                    <label htmlFor={doc.id} onClick={() => this.checkItem('checkedDocs', checkedDocs, doc.id)}/>
                  </div>
                </Table.Cell>

                <Table.Cell>
                  {doc.codification_kind}
                </Table.Cell>

                <Table.Cell>
                  {doc.title}
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <ReactSVG
                    svgStyle={{ height: 20, width: 20 }}
                    src={dlIcon}
                    className='td-files-icon'
                  />
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <ReactSVG
                    svgStyle={{ height: 20, width: 20 }}
                    src={nativeIcon}
                    className='td-files-icon'
                  />
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <ReactSVG
                    svgStyle={{ height: 20, width: 20 }}
                    src={pdfIcon}
                    className='td-files-icon'
                  />
                </Table.Cell>

                <Table.Cell>
                  {doc.revision}
                </Table.Cell>

                <Table.Cell>
                  {doc.version}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className='d-flex'>
          <span className='ml-auto'>{documents.length} total documents</span>
        </div>
      </React.Fragment>
    )
  }

  render() { 
    const { myReview, allReview, checkedDocs } = this.state
    const allReviewulClass = classnames({ 'hidden': !allReview })
    const myReviewulClass = classnames({ 'hidden': !myReview })

    return (
      <div className='dms-container'>
        {this.renderHeader()}
        <div className='row pt-5'>
          <div className='col-2'>
            <div className='dms-sidebar-menu'>
              <div className='dms-sidebar-menu__block'>
                <h4>DMS menu</h4>
                <ul className='dms-sidebar-menu__list'>
                  {menuItems.map(({title, icon}, i) => (
                    <li className='dms-sidebar-menu__item' key={i}>
                      <button type='button' className='btn'>
                        <ReactSVG
                          svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                          src={icon}
                        />
                        <span className='head-button__gray-text'>{title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='dms-sidebar-menu__block'>
                {checkedDocs.length !== 0
                  ? <div className='selected-doc-title'><span>{checkedDocs.length}</span> selected Doc</div>
                  : <h4>Actions</h4>}
                <DropDown
                  btnName='Action'
                  className='dms-sidebar-menu__dropdown'
                >
                  {actionDDitems.map(({ icon, title }, i) => (
                    <React.Fragment key={i}>
                      {this.renderDropDownItems(icon, title)}
                    </React.Fragment>
                  ))}
                  <DropDown
                    className='dropdown-submenu dropdown-item show'
                    btnClass='dropdown-submenu'
                    btnComponent={
                      <React.Fragment>
                        <ReactSVG
                          svgStyle={{ height: 20, width: 20 }}
                          src={downloadDetailsIcon}
                        />
                        <span className='dropdown-item'>
                          Download as list
                        </span>
                      </React.Fragment>
                    }
                  >
                    <div className='download-files-dropdown'>
                      <div className='download-files-dropdown__title'>
                        <span>Choose format</span>
                      </div>
                      <div className='row'>
                        <div className='col-6'>
                          <input
                            type='checkbox'
                            id='download_csv'
                          />
                          <label htmlFor='download_csv' />
                          <ReactSVG
                            svgStyle={{ height: 20, width: 20 }}
                            src={csvIcon}
                          />
                          <span>CSV</span>
                        </div>
                        <div className='col-6'>
                          <input
                            type='checkbox'
                            id='download_xls'
                          />
                          <label htmlFor='download_xls' />
                          <ReactSVG
                            svgStyle={{ height: 20, width: 20 }}
                            src={xlsIcon}
                          />
                          <span>XLS</span>
                        </div>
                      </div>
                      <div className='row mb-3'>
                        <div className='col-6'>
                          <input
                            type='checkbox'
                            id='download_xml'
                          />
                          <label htmlFor='download_xml' />
                          <ReactSVG
                            svgStyle={{ height: 20, width: 20 }}
                            src={xmlIcon}
                          />
                          <span>XML</span>
                        </div>
                        <div className='col-6'>
                          <input
                            type='checkbox'
                            id='download_pdf'
                          />
                          <label htmlFor='download_pdf' />
                          <ReactSVG
                            svgStyle={{ height: 20, width: 20 }}
                            src={pdfIcon}
                          />
                          <span>PDF</span>
                        </div>
                      </div>
                      <div className='button-block'>
                        <button type='button' className='btn btn-white'>Cancel</button>
                        <button type='button' className='btn btn-white-blue'>Download files</button>
                      </div>
                    </div>
                  </DropDown>
                </DropDown>
              </div>

              <div className='dms-sidebar-menu__block'>
                <h4>My Folders</h4>
                <ul className='dms-sidebar-menu__list'>
                  {foldersItems.map(({title, icon}, i) => (
                    <li className='dms-sidebar-menu__item' key={i}>
                      <button type='button' className='btn'>
                        <ReactSVG
                          svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                          src={icon}
                        />
                        <span className='head-button__gray-text'>{title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='dms-sidebar-menu__block'>
                <h4>Review process</h4>
                <div className='dms-sidebar-menu__reviews-list'>
                  <div className='dms-sidebar-menu__reviews-button'>
                    <i className='arrow down'/>
                    <button
                      className='btn'
                      onClick={() => this.setState({myReview: !myReview})}
                    >
                      My review (owned)
                    </button>
                    <div className='red-rounded-info'>3</div>
                  </div>
                  <ul className={myReviewulClass}>
                    {reviewStatuses.map(({ title, color, count }, i) => (
                      <li className='dms-sidebar-menu__item' key={i}>
                        <span className={`${color}-dot`} />
                        <span className='status-name'>{title}</span>
                        <span className='dms-sidebar-menu__item_count'>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className='dms-sidebar-menu__reviews-list'>
                  <div className='dms-sidebar-menu__reviews-button'>
                    <i className='arrow down'/>
                    <button
                      className='btn'
                      onClick={() => this.setState({ allReview: !allReview})}
                    >
                      All review
                    </button>
                    <div className='red-rounded-info'>1</div>
                  </div>
                  <ul className={allReviewulClass}>
                    {reviewStatuses.map(({ title, color, count }, i) => (
                      <li className='dms-sidebar-menu__item' key={i}>
                        <span className={`${color}-dot`} />
                        <span className='status-name'>{title}</span>
                        <span className='dms-sidebar-menu__item_count'>{count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
          <div className='col-10'>
            {this.renderTable()}
          </div>
        </div>
      </div>
      )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchDocuments: () => dispatch(startFetchDocuments())
})

const mapStateToProps = ({ documents }) => ({
  documents: documents.allDocuments
})

export default connect(mapStateToProps, mapDispatchToProps)(DMS)