import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Route, withRouter } from 'react-router-dom'
import classnames from 'classnames'
import { startFetchDocuments } from '../../../../../actions/documentsActions'
import DMSLayout from '../../DMSLayout'
import Sidebar from './SideBar'
import Content from './Content'

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

  checkItem = (stateName, stateItems, value) => {
    let newVal
    
    if (stateItems.includes(value)) {
      newVal = stateItems.filter(el => el !== value)
    } else {
      stateItems.push(value)
    }

    this.setState({ [stateName]: newVal || stateItems })
  }

  renderHeader = () => {
    const { checkedDocs } = this.state
    const { match: { params } } = this.props
    const checkedLength = checkedDocs.length
    const btnClass = classnames('with-icon', { 'disable': checkedLength === 0 })

    return (
      <ul className='buttons-with-icons-list'>
        <Route path='/dashboard/projects/:project_id/documents/new/' exact>
          <li>
            <Link
              className='d-flex align-items-center'
              to={`/dashboard/projects/${params.project_id}/documents/new/`}
            >
              <span className='icon-add_1 mr-2' />
              <span data-title='Create new Document'>Create new Document</span>
            </Link>
          </li>
        </Route>
        <li>
          <button type='button' className={btnClass}>
            <span className='icon-Revise_1 mr-2' />
            <span data-title={`Add revision ${checkedLength > 0 ? checkedLength : ''}`}>
              Add revision {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
        <li>
          <button type='button' className={btnClass}>
            <span className='icon-common-file-edit mr-2' />
            <span className='head-button__gray-text' data-title={`Edit document {checkedLength > 0 ? checkedLength : ''}`}>
              Edit document {checkedLength > 0 ? checkedLength : ''}
            </span>
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const { match: { params: { project_id } }  } = this.props
    const { checkedDocs } = this.state

    return (
      <DMSLayout
        header={this.renderHeader()}
        sidebar={<Sidebar projectId={project_id} checkedDocs={checkedDocs} />}
        content={<Content projectId={project_id} checkItem={this.checkItem} checkedDocs={checkedDocs} />}
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