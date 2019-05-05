import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import classnames from 'classnames'
import { connect } from 'react-redux'
import logo from '../images/Logo_header'
import searchIcon from '../images/search-alternate'
import burgerOpen from '../images/Burgermenu_1'
import SideBarItem from './SideBarItem'
import { Dropdown, Input } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const tagOptions = [
  {
    key: 'English',
    text: 'English',
    value: 'English',
  },
  {
    key: 'German',
    text: 'German',
    value: 'German',
  },
  {
    key: 'Spanish',
    text: 'Spanish',
    value: 'Spanish',
  }
]

class SideBar extends Component {
  render() {
    const { location: { pathname }, isAdmin, isOpen, toggle } = this.props
    const sideBarShow = isAdmin || pathname.includes('/dashboard')

    if (!sideBarShow) {
      return null
    }

    const mainClass = classnames('sidebar sidebar-admin-panel', { 'is-visible': isOpen })
    return (
      <aside className={mainClass}>
        <div className='sidebar-sticky'>
          <div className='side-bar-logo'>
            <div>
              <ReactSVG
                svgStyle={{ height: 30, width: 100 }}
                src={logo}
              />
              <span className='text-white'>Admin access</span>
            </div>
            <ReactSVG
              svgStyle={{ height: 10, marginLeft: 20 }}
              src={burgerOpen}
              className='burger-button'
              onClick={toggle}
            />
          </div>
          <ul className='nav flex-column nav-items'>
            <li className='nav-item'>
              <span className='gray-purple'>Selected language version</span>
            </li>
            <li className='nav-item'>
              <Dropdown
                text='English'
                button
                pointing='left'
                icon={<i className='arrow right ml-2'/>}
                closeOnBlur={false}
                closeOnChange={false}
              >
                <Dropdown.Menu>
                  <Input icon={
                    <ReactSVG
                      svgStyle={{ height: 15 }}
                      src={searchIcon}
                      className='svg-icon'
                    />
                  } placeholder='Choose language'/>
                  <Dropdown.Menu scrolling>
                    {tagOptions.map(option => (
                      <Dropdown.Item key={option.value} {...option} />
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Menu>
              </Dropdown>
            </li>
            <li className='nav-item mt-4'>
              <span className='gray-purple'>Administration</span>
            </li>
            <SideBarItem path='/admin_panel' label='Homepage'/>
            <SideBarItem path='/admin_panel/users' label='Users'/>
            <SideBarItem path='/admin_panel/terms' label="T & C's"/>
          </ul>
        </div>
      </aside>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  authed: user.authStatus,
  isAdmin: user.isAdmin
})

export default connect(mapStateToProps)(withRouter(SideBar))
