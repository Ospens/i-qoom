import React from 'react'
import DMSLayout from '../../../DMSLayout'
import DmsSideBar from '../../../sideBar/DmsSideBar'
import Tabs from '../../../../../../elements/Tabs'
import TeamsTable from './TeamsTable'

function Content() {
  return (
    <Tabs className='big-tabs'>
      <div label='Teams'><TeamsTable type='oldTeams' /></div>
      <div label='New teams'><TeamsTable type='newTeams' /></div>
    </Tabs>
  )
}

function TeamsAccessRights() {
  return (
    <DMSLayout
      sidebar={<DmsSideBar />}
      content={<Content />}
    />
  )
}

export default TeamsAccessRights
