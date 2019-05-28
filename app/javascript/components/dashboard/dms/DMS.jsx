import React, { Component } from 'react'
import './DMS.scss'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import { startFetchDocuments, newDocument } from '../../../actions/documentsActions'
import { Link, Route } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import DropDown from '../../../elements/DropDown'
import DmsSideBar from './DmsSideBar'
import blueCheck from '../../../images/add_1'
import revisionIcon from '../../../images/Revise_2'
import editDocIcon from '../../../images/common-file-edit'
import dlIcon from '../../../images/common-file-text_gary'
import nativeIcon from '../../../images/common-file-text-1'
import pdfIcon from '../../../images/office-file-pdf'
import dots from '../../../images/dots-horizontal'
import DMSLayout from './DMSLayout'
import { actionDDitems, columns, DtOptions } from './constants'

class DMS extends Component {

  state = {
    column: null,
    direction: null,
    checkedDocs: [],
    checkedDocTypes: []
  }

  componentWillMount() {
    const { startFetchDocuments, newDocument } = this.props
    newDocument()
    startFetchDocuments()
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
            <Link className='btn d-flex align-items-center' to={`/dashboard/projects/${params.project_id}/documents/new/`}>
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

  renderDropDownIcon = () => (
    <ReactSVG
      svgStyle={{ height: 20, width: 20 }}
      src={dots}
    />
  )

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
                    btnComponent={this.renderDropDownIcon()}
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
      </div>
    )
  }

  render() {
    const { myReview, allReview, checkedDocs } = this.state

    return (
      <DMSLayout
        header={this.renderHeader()}
        sidebar={
          <DmsSideBar
            myReview={myReview}
            allReview={allReview}
            checkedDocs={checkedDocs}
            renderDropDownItems={(icon, title) => this.renderDropDownItems(icon, title)}
          />
        }
        content={this.renderTable()}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchDocuments: () => dispatch(startFetchDocuments()),
  newDocument: () => dispatch(newDocument())
})

const mapStateToProps = ({ documents }) => ({
  documents: documents.allDocuments
})

export default connect(mapStateToProps, mapDispatchToProps)(DMS)