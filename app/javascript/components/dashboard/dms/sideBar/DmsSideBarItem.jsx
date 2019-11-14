import React, { useCallback } from 'react'
import { submit } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import classnames from 'classnames'

export const DmsSideBarItem = ({ path, label, icon, root, nested }) => {
  const dispatch = useDispatch()
  const projectCode = useSelector(({ projects }) => projects.current.project_code)
  const dmsSections = useSelector(({ projects }) => projects.current.dmsSections)
  
  const remoteSubmit = useCallback(() => {
    if (!projectCode) {
      dispatch(submit('convention_code_form'))
    } else if (!dmsSections) {
      dispatch(submit('originating_company'))
      dispatch(submit('document_type'))
      dispatch(submit('discipline'))
    }
  }, [projectCode])

  return (
    <Route path={path} exact>
      {({ match, location }) => {
        const matched = match || location.pathname.indexOf(root) > -1
        return (
          <li className='dms-sidebar-menu__item'>
            {projectCode && dmsSections
              ? <Link className={classnames('btn', { 'active': matched })} to={path}>
                <span className={classnames('dark-gray mr-2', icon)} />
                <span className='head-button__gray-text'>{label}</span>
              </Link>
              : <button className={classnames('btn', { 'active': matched })} onClick={remoteSubmit} type='submit'>
                <span className={classnames('dark-gray mr-2', icon)} />
                <span className='head-button__gray-text'>{label}</span>
              </button>}
            {matched && nested &&
              <ul className='dms-sidebar-menu__sublitem'>
                {nested.map((subItem, i) => (
                  <li
                    key={i}
                    className='dms-sidebar-menu__sublink'
                  >
                    <Link
                      className={classnames({ 'active': location.pathname.indexOf(subItem.path) > -1 })}
                      to={subItem.path}
                    >
                      {subItem.title}
                    </Link>
                  </li>
                ))}
              </ul>}
          </li>
        )
      }}
    </Route>
  )
}

export default DmsSideBarItem
