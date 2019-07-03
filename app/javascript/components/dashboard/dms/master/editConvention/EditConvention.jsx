import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setInitialValuesField } from '../../../../../actions/conventionActions'
import DMSLayout from '../../DMSLayout'
import DocFieldsTable from './DocFieldsTable'
import Tabs from '../../../../../elements/Tabs'
import DmsSideBar from '../../DmsSideBar'

class EditConvention extends Component {

  componentWillMount() {
    const { setInitialValuesField } = this.props
    setInitialValuesField({})
  }

  renderTab = () => {
    return (
      <div className='dms-content bordered edit-convention'>
        <DocFieldsTable />
      </div>
    )
  }

  renderContent = () => {
    return (
      <Tabs className='big-tabs'>
        <div label='Convention - 1' >{this.renderTab()}</div>
        <div label='Convention - 2' >{this.renderTab()}</div>
        <div label='Convention - 3' >{this.renderTab()}</div>
      </Tabs>
    )
  }

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={this.renderContent()}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  current: state.conventions.current,
  projectId: state.projects.current.id
})

const mapDispatchToProps = dispatch => ({
  setInitialValuesField: (field) => dispatch(setInitialValuesField(field))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditConvention)
