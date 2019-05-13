import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import { connect } from 'react-redux'
import DragAndDropField from '../../../elements/DragAndDropField'
import InputField from '../../../elements/InputField'
import overviewIcon from '../../../images/task-checklist-check'
import revisionIcon from '../../../images/Revise_2'
import dmsSettingsIcon from '../../../images/task-list-settings'
import editIcon from '../../../images/pencil-write'
import lockIcon from '../../../images/Locked'
import checkIcon from '../../../images/check_1'
import SideBarItem from './SideBarItem'
import {
  getFormSubmitErrors,
  reduxForm,
  Field
} from 'redux-form'

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

class AddRevision extends Component {

  render() { 
    const { submitErrors } = this.props
    return (
      <div className='dms-container'>
        <div className='new-document'>
          <div className='row pt-5'>
            <div className='col-2'>
              <div className='dms-sidebar-menu'>

                <div className='dms-sidebar-menu__document-title'>
                  <div className='editable-title'>
                    <h5>Presure Relief Dampers - Remediation of Defect by Mr. Cool</h5>
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

                <div className='dms-sidebar-menu__block'>
                  <h4>Document history</h4>
                  <div className='scroll-block'>
                    <div className='scroll-block-title'>
                      <ReactSVG
                        svgStyle={{ height: 15, width: 15, marginLeft: 10, marginRight: 10 }}
                        src={revisionIcon}
                      />
                      <span>Revision</span>
                    </div>
                    <ul className='revision-list'>
                      {[...Array(40)].map((e, i) => (
                        <li key={i}>
                          {i + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className='dms-sidebar-menu__block'>
                  <h4>Document history</h4>
                  <div className='scroll-block'>
                    <div className='scroll-block-title'>
                      <ReactSVG
                        svgStyle={{ height: 15, width: 15, marginLeft: 10, marginRight: 10 }}
                        src={dmsSettingsIcon}
                      />
                      <span>Versions</span>
                    </div>
                    <ul className='revision-list'>
                      {[...Array(2)].map((e, i) => (
                        <li key={i}>
                          {i + 1}
                        </li>
                      ))}
                      <li className='active'>
                        3.0
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            <div className='col-10 p-0 mb-5'>
              <div className='p-5'>
                <div className='revision-title-block'>
                  <h5>Add new Revision:</h5>
                  <label className='red-label ml-4'>
                    Revision 41
                    <ReactSVG
                      svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
                      src={lockIcon}
                    />
                  </label>
                  <label className='red-label ml-4'>
                    Version 0.0
                    <ReactSVG
                      svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
                      src={lockIcon}
                    />
                    </label>
                </div>

                <h5>Open upload form</h5>

                <div className='form-group col-6 pl-0 mt-4'>
                  <InputField
                    type='text'
                    name='originator'
                    id='originator'
                    errorField={[submitErrors]}
                    placeholder='Originator'
                    label='Type in originator*'
                  />
                </div>

                <div className='row mt-5'>
                  <div className='col-6'>
                    <Field
                      type='file'
                      name='native_file'
                      id='native_file'
                      label='Replace the document file to update revision*'
                      component={DragAndDropField}
                    />
                  </div>
                  <div className='col-6'>
                    <Field
                      type='file'
                      name='other_file'
                      id='other_file'
                      label='Add other file here'
                      component={DragAndDropField}
                    />
                  </div>
                </div>
              </div>

              <div className='create-document-footer'>
                <button type='button' className='btn btn-white'>Cancel</button>
                <button
                  type='submit'
                  className='btn btn-purple'
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  submitErrors: getFormSubmitErrors('revision_form')(state)
})

export default connect(
  mapStateToProps
)(reduxForm(
  {
    form: 'revision_form',
  })
  (AddRevision))
