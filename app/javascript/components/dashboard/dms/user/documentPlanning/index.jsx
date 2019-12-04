import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DMSLayout from '../../DMSLayout'
import SideBar from './SideBar'
import Content from './Content'
import Header from './Header'
import { startFetchDocuments } from '../../../../../actions/documentsActions'
import toggleArray from '../../../../../elements/toggleArray'

function DocumentPlanning({ history, match: { params: { projectId } } }) {
  const [checkedDocs, setCheckedDocs] = useState([])
  const documents = useSelector(state => state.documents.allDocuments)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(startFetchDocuments(projectId, history)) }, [dispatch])

  const toggleDocs = useCallback((checked, value) => {
    setCheckedDocs(toggleArray(checked, value))
  }, [])

  return (
    <DMSLayout
      header={<Header checkedDocs={checkedDocs} />}
      sidebar={<SideBar checkedDocs={checkedDocs} />}
      content={<Content checkedDocs={checkedDocs} toggleDocs={toggleDocs} documents={documents}/>}
      classNames='with-header'
    />
  )
}

export default withRouter(DocumentPlanning)
