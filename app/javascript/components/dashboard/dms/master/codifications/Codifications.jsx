import React from 'react'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../sideBar/DmsSideBar'
import Content from './Content'

function Codifications() {
  return (
    <DMSLayout
      sidebar={<DmsSideBar />}
      content={<Content />}
    />
  )
}

export default Codifications
