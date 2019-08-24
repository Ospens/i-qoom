import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import './DMS.scss'
import { startFetchFolders } from '../../../actions/foldersActions'
import DocumentForm from './user/DocumentForm'
import AddRevision from './AddRevision'
import ShowDocument from '../dms/user/showDocument/ShowDocument'
import IndexDMS from './IndexDMS'
import EditConvention from './master/editConvention/EditConvention'
import MembersAccessRights from './master/accessRights/MembersAccessRights'
import TeamsAccessRights from './master/accessRights/TeamsAccessRights'
import QuickSearch from './master/quickSearch/QuickSearch'
import Codifications from './master/codifications/Codifications'
import CodificationSettings from './master/codifications/CodificationSettings'
import DistributionGroup from './master/distributionGroup/DistributionGroup'
import FolderSettings from './user/folderSettings/FolderSettings'

function DMS({ match, match: { params: { project_id } } }) {
  const codificationId = 1

  const dispatch = useDispatch()
  useEffect(() => { dispatch(startFetchFolders(project_id)) }, [dispatch])

  return (
    <Switch>
      <Route path={`${match.path}/new/`} component={DocumentForm} />
      <Route path={`${match.path}/folders/all/`} component={FolderSettings} />
      <Route path={`${match.path}/folders/:folder_id/`} component={FolderSettings} />
      <Route path={`${match.path}/:document_id/edit/`} component={DocumentForm} />
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
        path={`${match.path}/master/quick_search/`}
        component={QuickSearch}
      />
      <Route
        path={`${match.path}/master/codifications/${codificationId}`}
        component={Codifications}
      />
      <Route
        path={`${match.path}/master/codifications/settings/`}
        component={CodificationSettings}
      />
      <Route
        path={`${match.path}/master/distribution_group/`}
        component={DistributionGroup}
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

export default withRouter(DMS)