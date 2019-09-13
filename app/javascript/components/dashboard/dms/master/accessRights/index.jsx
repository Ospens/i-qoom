import React from 'react'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import Tabs from '../../../../../elements/Tabs'
import MembersTable from './MembersTable'

const Content = () => (
  <Tabs className='big-tabs'>
    <div label='Members'>
      <MembersTable type='oldMembers'/>
    </div>
    <div label='New members'>
      <MembersTable type='newMembers'/>
    </div>
  </Tabs>
)

const MembersAccessRights = () => (
  <DMSLayout
    sidebar={<DmsSideBar />}
    content={<Content />}
  />
)

export default MembersAccessRights
