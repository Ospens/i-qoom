import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, useParams, useRouteMatch } from 'react-router-dom'
import './DMS.scss'
import { startFetchFolders } from '../../../actions/foldersActions'
import Page from '../../../elements/Page'
import DocumentForm from './user/documentForm/DocumentForm'
import ShowDocument from './user/showDocument/ShowDocument'
import IndexDMS from './user/index/IndexDMS'
import EditConvention from './master/editConvention/EditConvention'
import MembersAccessRights from './master/accessRights/index'
import TeamsAccessRights from './master/accessRights/team/TeamsAccessRights'
import QuickSearch from './master/quickSearch/QuickSearch'
import Codifications from './master/codifications/Codifications'
import CodificationSettings from './master/codifications/CodificationSettings'
import DistributionGroup from './master/distributionGroup/DistributionGroup'
import FolderSettings from './user/folderSettings/FolderSettings'
import DmsSettings from './user/dmsSettings/index'
import DocumentPlanning from './user/documentPlanning/index'
import UserProfile from './master/userProfile'

const documentHeader = (title, doc) => {
  if (!doc) return <Fragment />

  const ver = doc.document_fields.find(el => el.codification_kind === 'document_number')
  const rev = doc.document_fields.find(el => el.codification_kind === 'revision_number')

  return (
    <div className="d-flex">
      <h2>{title}</h2>
      <label className="rounded-label red ml-4">
        Revision

        {rev ? rev.value : '0'}
        <span className="icon-Locked ml-2" />
      </label>
      <label className="rounded-label red ml-4">
        Version

        {ver ? ver.value : '1'}
        <span className="icon-Locked ml-2" />
      </label>
    </div>
  )
}

function DMS() {
  const codificationId = 1
  const { path } = useRouteMatch()
  const { projectId } = useParams()
  const dispatch = useDispatch()
  useEffect(() => { dispatch(startFetchFolders(projectId)) }, [dispatch, projectId])
  const doc = useSelector(state => state.documents.current)

  return (
    <Switch>
      <Page
        title="New Document"
        titleContent={documentHeader('New Document', doc)}
        path={`${path}/new/`}
        component={DocumentForm}
      />
      <Page
        title="Edit Document"
        titleContent={documentHeader('Edit Document', doc)}
        path={`${path}/:document_id/edit/`}
        component={DocumentForm}
      />
      <Page
        title="Folders"
        path={[`${path}/folders/all/`, `${path}/folders/my_documents/`, `${path}/folders/:folder_id/`]}
        component={FolderSettings}
      />
      <Page
        title="Edit convention"
        path={`${path}/master/edit_convention/`}
        component={EditConvention}
      />
      <Page
        title="Documents management system"
        path={`${path}/master/access_rights/members/:memberId`}
        component={UserProfile}
      />
      <Page
        title="Access rights"
        path={`${path}/master/access_rights/members`}
        component={MembersAccessRights}
      />
      <Page
        title="Access rights"
        path={`${path}/master/access_rights/teams`}
        component={TeamsAccessRights}
      />
      <Page
        title="Quick search"
        path={`${path}/master/quick_search/`}
        component={QuickSearch}
      />
      <Page
        title="DMS User Settings"
        path={`${path}/settings/`}
        component={DmsSettings}
      />
      <Page
        title="Planned list"
        path={`${path}/planning/`}
        component={DocumentPlanning}
      />
      <Page
        title="Codifications"
        path={`${path}/master/codifications/${codificationId}`}
        component={Codifications}
      />
      <Page
        title="Codification settings"
        path={`${path}/master/codifications/settings/`}
        component={CodificationSettings}
      />
      <Page
        title="Distribution group"
        path={`${path}/master/distribution_group/`}
        component={DistributionGroup}
      />
      <Page
        title="Add revision"
        titleContent={documentHeader('Add revision', doc)}
        path={`${path}/:document_id/add_revision/`}
        component={DocumentForm}
      />
      <Page
        title="Documents management system"
        path={`${path}/:document_id/`}
        component={ShowDocument}
      />
      <Page
        title="Documents management system"
        path={`${path}`}
        component={IndexDMS}
      />
    </Switch>
  )
}

export default DMS
