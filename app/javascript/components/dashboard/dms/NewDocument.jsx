import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { Link, Route } from 'react-router-dom'
import {
  getFormSubmitErrors,
  reduxForm,
  Field,
  formValueSelector
} from 'redux-form'
import InputField from '../../../elements/InputField'
import overviewIcon from '../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../images/task-list-settings'

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
  state = {  }
  render() { 
    return (
      <div className='dms-container new-document'>
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
          <div className='col-10 p-4'>
            <div className='new-document__header'>
              <h4>Add documents data & files</h4>
              <div className='new-project__project-phases'>
                <span>Project phases</span>
                <ul className='row mx-0'>
                  <li className='col-3 active'>
                    <button>
                      Planning
                  </button>
                  </li>
                  <li className='col-3'>
                    <button>
                      Development
                  </button>
                  </li>
                  <li className='col-3'>
                    <button>
                      Execution
                  </button>
                  </li>
                  <li className='col-3'>
                    <button>
                      Operation
                  </button>
                  </li>
                </ul>
              </div>
            </div>

            <form className='form-body'>
              <div className='row'>

                <div className='col-6'>
                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='document_id'
                      id='document_id'
                      label='Pleace select or generate Document ID'
                    />
                  </div>

                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='orig_company'
                      id='orig_company'
                      label='Originating company*'
                    />
                  </div>

                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='discipline_company'
                      id='discipline_company'
                      label='Select a discipline*'
                    />
                  </div>

                  <div className='row'>
                    <div className='col-6'>
                      <div className='form-group'>
                        <InputField
                          type='text'
                          name='revision_number'
                          id='revision_number'
                          label='Define a revision number'
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='form-group'>
                        <InputField
                          type='text'
                          name='revision_number'
                          id='revision_number'
                          label='Revision Date*'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-6'>
                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='document_type'
                      id='document_type'
                      label='Select a document type*'
                    />
                  </div>

                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='document_titile'
                      id='document_titile'
                      placeholder='Title'
                      label='Define a document title*'
                    />
                  </div>

                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='relevance_first'
                      id='relevance_first'
                      label='Select relevance |'
                    />
                  </div>

                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='relevance_second'
                      id='relevance_second'
                      label='Select relevance ||'
                    />
                  </div>

                  <div className='form-group'>
                    <InputField
                      type='text'
                      name='originator'
                      id='originator'
                      label='Originator*'
                    />
                  </div>
                </div>

              </div>

              <div className='form-group'>
                <InputField
                  type='text'
                  name='originator'
                  id='originator'
                  placeholder='Information'
                  label='Add additional information'
                />
              </div>

              <div className='row'>
                <div className='col-6'>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default (reduxForm({ form: 'document_form' })(NewDocument))