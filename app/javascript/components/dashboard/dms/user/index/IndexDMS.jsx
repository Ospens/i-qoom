import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { startFetchDocuments } from '../../../../../actions/documentsActions'
import toggleArray from '../../../../../elements/toggleArray'
import DMSLayout from '../../DMSLayout'
import Sidebar from './SideBar'
import Content from './Content'
import Header from './Header'

function IndexDMS() {
  const dispatch = useDispatch()
  const { projectId } = useParams()
  const [checkedDocs, setCheckedDocs] = useState([])
  const documents = useSelector(state => state.documents.allDocuments)
  const toggleCheckedDocs = useCallback(value => {
    setCheckedDocs(toggleArray(checkedDocs, value))
  }, [checkedDocs])
  useEffect(() => { dispatch(startFetchDocuments(projectId)) }, [dispatch, projectId])
  useEffect(() => { setCheckedDocs([]) }, [documents])

  const header = <Header checkedDocs={checkedDocs} />
  const sidebar = <Sidebar projectId={projectId} checkedDocs={checkedDocs} />
  const content = (
    <Content
      projectId={projectId}
      checkItem={toggleCheckedDocs}
      checkedDocs={checkedDocs}
    />
  )

  return (
    <DMSLayout
      header={header}
      sidebar={sidebar}
      content={content}
      classNames="with-header"
    />
  )
}

export default IndexDMS
