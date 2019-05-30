import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getFormSubmitErrors,
  reduxForm,
  formValueSelector,
  Field
} from 'redux-form'
import { startEditConvention } from '../../../../actions/conventionActions'
import ReactSVG from 'react-svg'
import SideBarItem from '../SideBarItem'
import InputField from '../../../../elements/InputField'
import SelectField from '../../../../elements/SelectField'
import CheckboxField from '../../../../elements/CheckboxField'
import DMSLayout from '../DMSLayout'
import overviewIcon from '../../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../../images/task-list-settings'
import docPlanIcon from '../../../../images/calendar-3'
import lockIcon from '../../../../images/Locked'
import DropDown from '../../../../elements/DropDown'
import DocumentFiledsTable from './DocumentFiledsTable'

const menuItems = [
  {
    title: 'Overview',
    icon: overviewIcon,
    path: '/dashboard/documents/overview/'
  },
  {
    title: 'DMS Settings',
    icon: dmsSettingsIcon,
    path: '/dashboard/documents/settings/'
  },
  {
    title: 'Document planning',
    icon: docPlanIcon,
    path: '/dashboard/documents/planning/'
  },
  {
    title: 'Master setting',
    icon: dmsSettingsIcon,
    path: '/dashboard/documents/planning/'
  }
]

class EditConvention extends Component {

  componentWillMount() {
    const { editConvention } = this.props
    editConvention()
  }

  renderSideBar = () => (
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
  )

  renderContent = () => {
    const { submitErrors, orig_company, current: { grouped_fields } } = this.props
    return (
      <div className='dms-content bordered edit-convention'>

        <div className='dms-content__header p-4'>
          <div className="d-flex align-items-center">
            <h4>Add documents data & files</h4>
            <label className="rounded-label red ml-4">
              Form version 0.1
              <ReactSVG
                svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
                src={lockIcon}
              />
            </label>
          </div>
          <div className='dms-content__project-phases'>
            <span>Project phases</span>
            <ul className='row mx-0 phases-row'>
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
              <button className="btn edit-button">
                Edit
              </button>
            </ul>
          </div>
        </div>
        <DocumentFiledsTable fields={grouped_fields}/>
      </div>
    )
  }

  render() {
    return (
      <React.Fragment>
        <DMSLayout
          sidebar={this.renderSideBar()}
          content={this.renderContent()}
        />
      </React.Fragment>
    )
  }
}

const selector = formValueSelector('convention_form')

const mapStateToProps = (state) => ({
  submitErrors: getFormSubmitErrors('document_form')(state),
  current: state.conventions.current
})
const mapDispatchToProps = dispatch => ({
  editConvention: () => dispatch(startEditConvention())
})

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({ form: 'convention_form' })(EditConvention))
