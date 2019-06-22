import React, { Component } from 'react'
import './DMS.scss'
import { connect } from 'react-redux'
import { startFetchDocuments } from '../../../actions/documentsActions'
import { Route, Switch, withRouter } from 'react-router-dom'
import NewDocument from './NewDocument'
import AddRevision from './AddRevision'
import ShowDocument from './ShowDocument'
import IndexDMS from './IndexDMS'
import EditConvention from './master/editConvention/EditConvention'
import MembersAccessRights from './master/accessRights/MembersAccessRights'
import TeamsAccessRights from './master/accessRights/TeamsAccessRights'

class DMS extends Component {

  render() {
    const { match } = this.props

    return (
      <Switch>
        <Route path={`${match.path}/new/`} component={NewDocument} />
        <Route
          path={`${match.path}/master/edit_convention/`}
          component={EditConvention}
        />
        <Route
          path={`${match.path}/master/access_rights/members`}
          component={MembersAccessRights}
        />
        <Route
          path={`${match.path}/master/access_rights/teams`}
          component={TeamsAccessRights}
        />
        <Route
          path={`${match.path}/:document_id/`}
          component={ShowDocument}
        />
        <Route
          path={`${match.path}/:document_id/add_revision/`}
          component={AddRevision}
        />
        <Route path={`${match.path}`} component={IndexDMS} />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchDocuments: () => dispatch(startFetchDocuments())
})

const mapStateToProps = ({ documents }) => ({
  documents: documents.allDocuments
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DMS))