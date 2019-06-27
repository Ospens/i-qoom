import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startFetchDocuments } from '../../../actions/documentsActions'
import { Link, Route, withRouter } from 'react-router-dom'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import { Table } from 'semantic-ui-react'
import DropDown from '../../../elements/DropDown'
import xlsIcon from '../../../images/office-file-xls'
import xmlIcon from '../../../images/xml-1'
import csvIcon from '../../../images/csv-1'
import downloadDetailsIcon from '../../../images/download-button'
import pdfIcon from '../../../images/office-file-pdf'
import DocumentPopup from './DocumentPopup'
import { actionDDitems, reviewStatuses, foldersItems, columns, DtOptions } from './constants'
import DmsSideBar from './DmsSideBar'
import blueCheck from '../../../images/add_1'
import revisionIcon from '../../../images/Revise_2'
import editDocIcon from '../../../images/common-file-edit'
import dlIcon from '../../../images/common-file-text_gary'
import nativeIcon from '../../../images/common-file-text-1'
import dots from '../../../images/dots-horizontal'
import DMSLayout from './DMSLayout'

class IndexDMS extends Component {

  state = {
    popup: false,
    checkedDocs: [],
    checkedDocTypes: []
  }

  componentWillMount() {
    const { startFetchDocuments, match: { params: { project_id } } } = this.props
    startFetchDocuments(project_id)
  }

  renderHeader = () => {
    const { checkedDocs } = this.state
    const { match: { params } } = this.props
    const checkedLength = checkedDocs.length
    const btnClass = classnames('btn with-icon', { 'disable': checkedLength === 0 })

    return (
      <ul className='head-buttons'>
        <Route path='/dashboard/projects/:project_id/documents/new/' exact>
          <li>
            <Link
              className='btn d-flex align-items-center'
              to={`/dashboard/projects/${params.project_id}/documents/new/`}
            >
              <ReactSVG
                svgStyle={{ height: 15, width: 15, marginRight: 5 }}
                src={blueCheck}
              />
              <span>Create new Document</span>
            </Link>
          </li>
        </Route>
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
        <span className='mr-4'>Show</span>
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
      <div>
        { this.renderTableHeader() }
        <Table sortable className='main-table-block'>
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
                    dots={true}
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
                    <input type='checkbox' id={doc.id} />
                    <label
                      htmlFor={doc.id}
                      onClick={
                        () => this.checkItem('checkedDocs', checkedDocs, doc.id)
                      }
                    />
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
      </div>
    )
  }

  renderSideBar = () => {
    const { myReview, allReview, checkedDocs, popup } = this.state
    const allReviewlClass = classnames({ 'hidden': !allReview })
    const myReviewlClass = classnames({ 'hidden': !myReview })

    return (
      <DmsSideBar>
        {popup &&
          <DocumentPopup closePopup={() => this.setState({ popup: false })} />
        }
        <div className='dms-sidebar-menu__block'>
          {checkedDocs.length !== 0
            ? <div className='selected-info-block'><span>{checkedDocs.length}</span> selected Doc</div>
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
            {foldersItems.map(({ title, icon }, i) => (
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
              <i className='arrow down' />
              <button
                className='btn'
                onClick={() => this.setState({ myReview: !myReview })}
              >
                My review (owned)
                </button>
              <div className='red-rounded-info'>3</div>
            </div>
            <ul className={myReviewlClass}>
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
              <i className='arrow down' />
              <button
                className='btn'
                onClick={() => this.setState({ allReview: !allReview })}
              >
                All review
                    </button>
              <div className='red-rounded-info'>1</div>
            </div>
            <ul className={allReviewlClass}>
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

      </DmsSideBar>
    )

  }

  render() {
    return (
      <DMSLayout
        header={this.renderHeader()}
        sidebar={this.renderSideBar()}
        content={this.renderTable()}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchDocuments: (projectId) => dispatch(startFetchDocuments(projectId))
})

const mapStateToProps = ({ documents }) => ({
  documents: documents.allDocuments
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndexDMS))