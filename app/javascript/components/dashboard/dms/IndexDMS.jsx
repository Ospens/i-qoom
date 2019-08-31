import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import moment from 'moment'
import { Table } from 'semantic-ui-react'
import { startFetchDocuments } from '../../../actions/documentsActions'
import DropDown from '../../../elements/DropDown'
import DocumentPopup from './DocumentPopup'
import { actionDDitems, reviewStatuses, columns, DtOptions } from './constants'
import DmsSideBar from './DmsSideBar'
import DMSLayout from './DMSLayout'
import { renderFoldersBlock } from './DmsSideBar'

class IndexDMS extends Component {

  state = {
    popup: false,
    checkedDocs: [],
    checkedDocTypes: []
  }

  componentWillMount() {
    const { fetchDocuments, history, match: { params: { project_id } } } = this.props
    fetchDocuments(project_id, history)
  }

  renderHeader = () => {
    const { checkedDocs } = this.state
    const { match: { params } } = this.props
    const checkedLength = checkedDocs.length
    const btnClass = classnames('btn with-icon', { 'disable': checkedLength === 0 })

    return (
      <ul className='buttons-with-icons-list'>
        <Route path='/dashboard/projects/:project_id/documents/new/' exact>
          <li>
            <Link
              className='btn d-flex align-items-center'
              to={`/dashboard/projects/${params.project_id}/documents/new/`}
            >
              <i className='svg-icon blue-plus-icon mr-2' />
              <span data-title='Create new Document'>Create new Document</span>
            </Link>
          </li>
        </Route>
        <li>
          <button type='button' className={btnClass}>
            <i className='svg-icon revision-icon mr-2' />
            <span data-title={`Add revision ${checkedLength > 0 ? checkedLength : ''}`}>
              Add revision {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
        <li>
          <button type='button' className={btnClass}>
            <i className='svg-icon file-edit-icon mr-2' />
            <span className='head-button__gray-text' data-title={`Edit document {checkedLength > 0 ? checkedLength : ''}`}>
              Edit document {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
      </ul>
    )
  }

  renderDropDownItems = (icon, name, link) => {
    const content = (
      <React.Fragment>
        <i className={classnames('svg-icon gray mr-2', icon)} />
        <span className='item-text'>{name}</span>
      </React.Fragment>
    )

    return (
      <li className='dropdown-item'>
        {link
          ? <Link className='d-flex' to={link}>{content}</Link>
          : content}
      </li>
    )
  }

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
    const { documents, match: { params: { project_id } } } = this.props
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
                    {actionDDitems(project_id, doc.id).map(({ icon, title, link }, i) => (
                      <React.Fragment key={i}>
                        {this.renderDropDownItems(icon, title, link)}
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
                  {doc.title || 'Undefined'}
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <i className='svg-icon common-file-icon black' />
                  </div>
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <i className='svg-icon common-file-color-icon' />
                  </div>
                </Table.Cell>

                <Table.Cell className='td-files'>
                  <div>
                    <i className='svg-icon file-pdf-icon' />
                  </div>
                </Table.Cell>

                <Table.Cell className='td-date'>
                  {moment(doc.created_at).format('MMMM Do YYYY')}
                </Table.Cell>

                <Table.Cell>
                  {doc.document_fields.filter(field => field.codification_kind === 'originating_company')[0].value}
                </Table.Cell>

                <Table.Cell>
                  {doc.document_fields.filter(field => field.codification_kind === 'document_type')[0].value}
                </Table.Cell>

                <Table.Cell>
                  {doc.document_fields.filter(field => field.codification_kind === 'discipline')[0].value}
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
    const { folders, match: { params: { project_id } } } = this.props
    const allReviewlClass = classnames({ 'hidden': !allReview })
    const myReviewlClass = classnames({ 'hidden': !myReview })

    return (
      <DmsSideBar>
        {popup && <DocumentPopup closePopup={() => this.setState({ popup: false })} />}
        <div className='dms-sidebar-menu__block'>
          {checkedDocs.length !== 0
            ? <div className='selected-info-block'><span>{checkedDocs.length}</span> selected Doc</div>
            : <h4>Actions</h4>}
          <DropDown
            btnName='Action'
            className='dms-sidebar-menu__dropdown'
          >
            {actionDDitems().map(({ icon, title }, i) => (
              <React.Fragment key={i}>
                {this.renderDropDownItems(icon, title)}
              </React.Fragment>
            ))}
            <DropDown
              className='dropdown-submenu dropdown-item show'
              btnClass='dropdown-submenu'
              btnComponent={
                <React.Fragment>
                  <i className='svg-icon download-icon gray mr-2' />
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
                    <i className='svg-icon file-csv-icon' />
                    <span>CSV</span>
                  </div>
                  <div className='col-6'>
                    <input
                      type='checkbox'
                      id='download_xls'
                    />
                    <label htmlFor='download_xls' />
                    <i className='svg-icon file-xls-icon' />
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
                    <i className='svg-icon file-xml-icon' />
                    <span>XML</span>
                  </div>
                  <div className='col-6'>
                    <input
                      type='checkbox'
                      id='download_pdf'
                    />
                    <label htmlFor='download_pdf' />
                    <i className='svg-icon file-pdf-icon' />
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

        {renderFoldersBlock(folders, project_id)}

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
  fetchDocuments: (projectId, history) => dispatch(startFetchDocuments(projectId, history))
})

const mapStateToProps = ({ documents, folders }) => ({
  documents: documents.allDocuments,
  folders: folders.allFolders
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndexDMS))