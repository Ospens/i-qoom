import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import Tabs from '../../../../../elements/Tabs'
import Overview from './Overview'
import UploadForm from './UploadForm'
import QuickSearch from './QuickSearch'
import Codification from './Codification'
import getAttributes from '../../../../../actions/dmSettingsActions'

function Content() {
  const project = useSelector(state => state.projects.current)

  return (
    <div className='dms-content edit-convention'>
      <div className='dms-content__header'>
        <h4>{project.name}</h4>
      </div>
      <div className='content-body pt-0'>
        <Tabs>
          <div label='Overview'>
            <Overview />
          </div>
          <div label='Upload form'>
            <UploadForm />
          </div>
          <div label='Quick search'>
            <QuickSearch />
          </div>
          <div label='Codification'>
            <Codification />
          </div>
        </Tabs>
      </div>
    </div>
  )
}

function DmsSettings() {
  const dispatch = useDispatch()
  // TODO: waiting a backend part
  // useEffect(() => { dispatch(getAttributes()) }, [])

  return (
    <DMSLayout
      sidebar={<DmsSideBar />}
      content={<Content />}
    />
  )
}

export default DmsSettings
