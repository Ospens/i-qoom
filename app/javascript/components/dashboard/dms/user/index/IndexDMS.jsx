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
  const { project_id } = useParams()
  const [checkedDocs, setСheckedDocs] = useState([])
  const documents = useSelector(state => state.documents.allDocuments)
  const toggleСheckedDocs = useCallback(value => { setСheckedDocs(toggleArray(checkedDocs, value)) }, [checkedDocs])
  useEffect(() => { dispatch(startFetchDocuments(project_id)) }, [dispatch, project_id])
  useEffect(() => { setСheckedDocs([]) }, [documents])

  return (
    <DMSLayout
      header={<Header checkedDocs={checkedDocs} />}
      sidebar={<Sidebar projectId={project_id} checkedDocs={checkedDocs} />}
      content={<Content projectId={project_id} checkItem={toggleСheckedDocs} checkedDocs={checkedDocs} />}
      classNames='with-header'
    />
  )
}

export default IndexDMS
