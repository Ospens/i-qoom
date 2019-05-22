import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector
} from 'redux-form'
import overviewIcon from '../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../images/task-list-settings'
import editIcon from '../../../images/pencil-write'
import checkIcon from '../../../images/check_1'
import DocDocumentsAndFiles from './DocDocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'
import DocIdModal from './DocIdModal'
import AddRevisionModal from './AddRevisionModal'
import SideBarItem from './SideBarItem'
import DMSLayout from './DMSLayout'

const menuItems = [
  {
    title: 'Documents data & files',
    icon: overviewIcon,
    path: '/dashboard/documents/new/'
  },
  {
    title: 'Access & Communication',
    icon: dmsSettingsIcon,
    path: '/dashboard/documents/new/'
  }
]

class NewDocument extends Component {

  state = { 
    step: 1,
    modal: 0
   }

  renderSideBar = () => (

    <div className='dms-sidebar-menu'>

      <div className='dms-sidebar-menu__document-title'>
        <div className='editable-title'>
          <h5>(Document name)</h5>
          <ReactSVG
            svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
            src={editIcon}
          />
        </div>
        <button className='btn copy-to-folder'>Copy to folder</button>
        {false && <React.Fragment>
          <div className='copied-to-folder'>
            <ReactSVG
              svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
              src={checkIcon}
            />
            <span>Copied to folders</span>
            <button className='btn copy-to-folder'>change</button>
          </div>
          <div className='not-relevant-for-me'>
            <span>Not relevant for me</span>
            <button className='btn copy-to-folder'>More</button>
          </div>
        </React.Fragment>}
      </div>

      <div className='dms-sidebar-menu__block'>
        <h4>DMS menu</h4>
        <ul className='dms-sidebar-menu__list'>
          {menuItems.map(({ path, title, icon }, i) => (
            <React.Fragment key={i}>
              <SideBarItem path={path} label={title} icon={icon} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  )

  renderContent = () => {
    const { step } = this.state
    return (
      <div className='new-document bordered'>
        {step === 1
          ? <DocDocumentsAndFiles {...this.props} nextStep={() => this.setState({ step: 2 })} />
          : <AccessAndCommunication {...this.props} backStep={() => this.setState({ step: 1 })} />
        }
      </div>
    )
  }

  render() {
    const { modal } = this.state

    return (
      <React.Fragment>
        {modal === 1 && <DocIdModal />}
        {modal === 2 && <AddRevisionModal />}
        <DMSLayout
          sidebar={this.renderSideBar()}
          content={this.renderContent()}
        />
      </React.Fragment>
    )
  }
}

const selector = formValueSelector('document_form')

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('document_form')(state),
  orig_company: selector(state, 'orig_company')
})

const mapDispatchToProps = dispatch => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'document_form' })(NewDocument))
