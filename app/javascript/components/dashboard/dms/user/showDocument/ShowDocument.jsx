import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import DMSLayout from '../../DMSLayout'
import Content from './Content'
import { startFetchDocument } from '../../../../../actions/documentsActions'
import FolderInfo from '../FolderInfo'

const SideBar = () => {
  const document = useSelector(state => state.documents.current)
  let versions = document.document_fields.filter(field => field.codification_kind === 'revision_version')[0]
  let revisions = document.document_fields.filter(field => field.codification_kind === 'revision_number')[0]
  versions = versions ? Number(versions.value) : 0
  revisions = revisions ? Number(revisions.value) : 0

  return (
    <div className='dms-sidebar-menu'>

      <div className='dms-sidebar-menu__document-title'>
        <div className='editable-title'>
          <h5>{document.title || 'Empty name'}</h5>
        </div>
        <FolderInfo />
        {false && <React.Fragment>
          <div className='copied-to-folder'>
            <i className='svg-icon green-check-icon' />
            <span>Copied to folders</span>
            <button className='btn copy-to-folder'>change</button>
          </div>
          <div className='not-relevant-for-me'>
            <span>Not relevant for me</span>
            <button className='btn copy-to-folder'>More</button>
          </div>
        </React.Fragment>}
      </div>

      <div className='dms-sidebar-menu__block'>
        <h4>Document history</h4>
        <div className='scroll-block'>
          <div className='scroll-block-title'>
            <i className='svg-icon revision-icon black mx-2' />
            <span>Revisions</span>
          </div>
          <ul className='revision-list'>
            {[...Array(revisions)].map((_, i) => (
              <li className={classnames({ 'active': i + 1 === revisions})} key={i}>
                {i + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='dms-sidebar-menu__block'>
        <h4>Document history</h4>
        <div className='scroll-block'>
          <div className='scroll-block-title'>
            <i className='svg-icon task-list-settings-icon black mx-2' />
            <span>Versions</span>
          </div>
          <ul className='revision-list'>
            {[...Array(versions)].map((_, i) => (
              <li className={classnames({'active': i + 1 === versions})} key={i}>
                  {i + 1}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ShowDocument({ match: { params: { document_id } } }) {
  const dispatch = useDispatch()
  const fetchDocument = useCallback(() =>
    dispatch(startFetchDocument(document_id)),
    [dispatch]
  )
  
  useEffect(() => { fetchDocument() }, [])

  return (
    <DMSLayout
      sidebar={<SideBar />}
      content={<Content />}
    />
  )
}

export default withRouter(ShowDocument)
