import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { Link, Route } from 'react-router-dom'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector
} from 'redux-form'
import overviewIcon from '../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../images/task-list-settings'
import DocDocumentsAndFiles from './DocDocumentsAndFiles'
import AccessAndCommunication from './AccessAndCommunication'

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
const SideBarItem = ({ path, label, icon }) => (
  <Route path={path} exact>
    {({ match }) => (
      <li className='dms-sidebar-menu__item'>
        <Link className={`btn ${match ? '#active' : ''}`} to={path}>
          <ReactSVG
            svgStyle={{ height: 20, width: 20, marginRight: 10 }}
            src={icon}
          />
          <span className='head-button__gray-text'>{label}</span>
        </Link>
      </li>
    )}
  </Route>
)

class NewDocument extends Component {

  state = { 
    step: 1
   }

  render() {
    const { step } = this.state

    return (
      <div className='dms-container'>
        <div className='new-document'>
          <div className='row pt-5'>
            <div className='col-2'>
              <div className='dms-sidebar-menu'>
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
            </div>
            <div className='col-10 p-0 mb-5'>
              {step === 1
                ? <DocDocumentsAndFiles {...this.props} nextStep={() => this.setState({ step: 2 })} />
                : <AccessAndCommunication {...this.props} backStep={() => this.setState({ step: 1 })} />
              }
            </div>
          </div>
        </div>
      </div>
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
