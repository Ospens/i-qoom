import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DMSLayout from '../../DMSLayout'
import Content from './Content'
import SideBar from './SideBar'
import { startFetchDocument, getRevisionsAndVersions } from '../../../../../actions/documentsActions'

function ShowDocument() {
  const dispatch = useDispatch()
  const { document_id } = useParams()

  useEffect(() => {
    dispatch(startFetchDocument(document_id)),
    dispatch(getRevisionsAndVersions(document_id))
  }, [dispatch, document_id])

  return (
    <DMSLayout
      sidebar={<SideBar />}
      content={<Content />}
    />
  )
}

export default ShowDocument
