import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setInitialValuesField } from '../../../../../actions/conventionActions'
import DMSLayout from '../../DMSLayout'
import DocFieldsTable from './DocFieldsTable'
import Tabs from '../../../../../elements/Tabs'
import DmsSideBar from '../../DmsSideBar'

const renderTab = () => {
  return (
    <div className='dms-content bordered edit-convention'>
      <DocFieldsTable />
    </div>
  )
}

const Content = () => {
  return (
    <Tabs className='big-tabs'>
      <div label='Convention - 1' >{renderTab()}</div>
      <div label='Convention - 2' >{renderTab()}</div>
      <div label='Convention - 3' >{renderTab()}</div>
    </Tabs>
  )
}

const EditConvention = ({ setInitialValuesField, match: { params: { project_id } } }) => {
  useEffect(() => { setInitialValuesField({})}, [])
  
  return (
    <DMSLayout
      sidebar={<DmsSideBar />}
      content={<Content />}
    />
  )
}

const mapDispatchToProps = dispatch => ({
  setInitialValuesField: (field) => dispatch(setInitialValuesField(field))
})

export default connect(null, mapDispatchToProps)(EditConvention)
