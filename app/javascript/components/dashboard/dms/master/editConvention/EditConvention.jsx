import React, { Component } from 'react'
import { connect } from 'react-redux'
import SideBarItem from '../../SideBarItem'
import DMSLayout from '../../DMSLayout'
import overviewIcon from '../../../../../images/task-checklist-check'
import dmsSettingsIcon from '../../../../../images/task-list-settings'
import docPlanIcon from '../../../../../images/calendar-3'
import DocumentFiledsTable from './DocFiledsTable'
import Tabs from '../../../../../elements/Tabs'

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

  renderTab = () => {
    return (
      <div className='dms-content bordered edit-convention'>
        <DocumentFiledsTable />
      </div>
    )
  }

  renderContent = () => {
    return (
      <Tabs className='conventios-tabs'>
        <div label='Convention - 1' >{this.renderTab()}</div>
        <div label='Convention - 2' >{this.renderTab()}</div>
        <div label='Convention - 3' >{this.renderTab()}</div>
      </Tabs>
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

const mapStateToProps = (state) => ({
  current: state.conventions.current
})

export default connect(mapStateToProps)(EditConvention)
