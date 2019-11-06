import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import classnames from 'classnames'
import FolderInfo from '../FolderInfo'
import { getRevisionsAndVersions } from '../../../../../actions/documentsActions'

export function DocHistory() {
  const { project_id, document_id } = useParams()
  const dispatch = useDispatch()
  const document = useSelector(state => state.documents.current)
  const revisions = useSelector(state => state.documents.revisions)
  const [revision, toggleRevision] = useState(0)
  let currentRevisionNumber = document.document_fields.find(field => field.codification_kind === 'revision_number')
  currentRevisionNumber = currentRevisionNumber ? currentRevisionNumber.value : '0'
  let versionsList = revisions.find(el => el.revision_number === currentRevisionNumber)
  versionsList = versionsList ? versionsList.versions : []

  useEffect(() => { toggleRevision(currentRevisionNumber) }, [currentRevisionNumber, document_id])

  useEffect(() => { dispatch(getRevisionsAndVersions(document_id)) }, [dispatch, document_id])

  return (
    <React.Fragment>
      <div className='dms-sidebar-menu__block'>
        <h4>Document history</h4>
        <div className='scroll-block'>
          <div className='scroll-block-title'>
            <span className='icon-Revise_1 dark-gray mr-2' />
            <span>Revisions</span>
          </div>
          <ul className='dms-sidebar-menu__ul-list'>
            {revisions.map(({ revision_number }, i) => (
              <li className={classnames({ 'active': revision_number === revision })} key={i}>
                <button type='button'>
                  {revision_number}
                </button>
              </li>
            ))} 
          </ul>
        </div>
      </div>
      <div className='dms-sidebar-menu__block'>
        <div className='scroll-block'>
          <div className='scroll-block-title'>
            <span className='icon-task-list-settings dark-gray mr-2' />
            <span>Versions</span>
          </div>
          <ul className='dms-sidebar-menu__ul-list'>
            {versionsList.map(({ id, revision_version }, i) => (
              <li key={i} className={classnames({ 'active': id === Number(document_id) })}>
                <Link to={`/dashboard/projects/${project_id}/documents/${id}`}>{revision_version}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

function SideBar() {
  const { project_id } = useParams()
  const document = useSelector(state => state.documents.current)

  return (
    <div className='dms-sidebar-menu'>
      <div className='dms-sidebar-menu__document-title'>
        <div className='editable-title'>
          <h5>{document.title || 'Empty name'}</h5>
        </div>
        <FolderInfo />
        {false && <React.Fragment>
          <div className='copied-to-folder'>
            <span className='icon-check_3' />
            <span>Copied to folders</span>
            <button className='btn copy-to-folder'>change</button>
          </div>
          <div className='not-relevant-for-me'>
            <span>Not relevant for me</span>
            <button className='btn copy-to-folder'>More</button>
          </div>
        </React.Fragment>}
      </div>

      <DocHistory />

      <Link to={`/dashboard/projects/${project_id}/documents`} className='btn-back-to-prev-page'>
        <span className='icon-Arrow_2_left mr-2'><span className='path1'></span><span className='path2'></span></span>
        BACK
      </Link>
    </div>
  )
}

export default SideBar
