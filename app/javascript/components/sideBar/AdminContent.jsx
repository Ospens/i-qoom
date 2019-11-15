import React from 'react'
import { Dropdown, Input } from 'semantic-ui-react'
import SideBarItem from './SideBarItem'

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

function AdminContent() {
  return (
    <ul className='nav flex-column nav-items'>
      <li className='nav-item'>
        <span className='gray-purple'>Selected language version</span>
      </li>
      <li className='nav-item'>
        <Dropdown
          text='English'
          button
          pointing='left'
          icon={<i className='arrow right ml-2' />}
          closeOnBlur={false}
          closeOnChange={false}
        >
          <Dropdown.Menu>
            <Input
              icon={<span className='icon-search-alternate' />}
              placeholder='Choose language'
            />
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
      <SideBarItem path='/admin_panel' label='Homepage' />
      <SideBarItem path='/admin_panel/users' label='Users' />
      <SideBarItem path='/admin_panel/terms' label="T & C's" />
    </ul>
  )
}

export default AdminContent
