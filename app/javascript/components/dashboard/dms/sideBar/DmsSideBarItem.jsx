import React, { Fragment, useCallback, useState } from 'react'
import { submit } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, useParams } from 'react-router-dom'
import classnames from 'classnames'
import PlannedListModal from '../user/documentPlanning/plannedListForm/PlannedListModal'

function nestedItems(nested, location, customItem) {
  return (
    <ul className="dms-sidebar-menu__subitem">
      {nested.map(subItem => (
        <li key={subItem.path} className="dms-sidebar-menu__sublink">
          <Link
            className={classnames(
              { active: location.pathname.indexOf(subItem.path) > -1 }
            )}
            to={subItem.path}
          >
            {subItem.title}
          </Link>
        </li>
      ))}
      {customItem}
    </ul>
  )
}

function PlannedListItem({
  matched, text, location
}) {
  const [open, setOpen] = useState(matched)
  const [openForm, setOpenForm] = useState(false)
  const { projectId } = useParams()
  const plannedLists = useSelector(state => state.plannedLists.all)
  const items = plannedLists.map(list => ({
    title: list.name,
    path: `/dashboard/projects/${projectId}/documents/planning/${list.id}`
  }))

  const newList = (
    <li className="dms-sidebar-menu__sublink">
      <PlannedListModal open={openForm} setOpen={setOpenForm} />
      <button type="button" className="button-with-icon" onClick={() => setOpenForm(true)}>
        <span className="icon-add_1 mr-2" />
        <span data-title="Add new">
          <span>Add new</span>
        </span>
      </button>
    </li>
  )
  return (
    <Fragment>
      <button
        type="button"
        className={classnames('btn', { active: matched })}
        onClick={() => setOpen(!open)}
      >
        {text}
      </button>
      {open && nestedItems(items, location, newList)}
    </Fragment>
  )
}

function DmsSideBarItem({
  path, label, icon, root, nested, type = ''
}) {
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
  }, [dispatch, dmsSections, projectCode])

  const text = (
    <Fragment>
      <span className={classnames('dark-gray mr-2', icon)} />
      <span className="head-button__gray-text">{label}</span>
    </Fragment>
  )
  const link = matched => (
    <Link className={classnames('btn', { active: matched })} to={path}>
      {text}
    </Link>
  )
  const submitButton = matched => (
    <button
      type="submit"
      className={classnames('btn', { active: matched })}
      onClick={remoteSubmit}
    >
      {text}
    </button>
  )

  return (
    <Route path={path} exact>
      {({ match, location }) => {
        const matched = match || location.pathname.indexOf(root) > -1
        return (
          <li className="dms-sidebar-menu__item">
            {(() => {
              if (projectCode && dmsSections) {
                if (type === 'plannedList') {
                  return (
                    <PlannedListItem
                      matched={matched}
                      text={text}
                      location={location}
                    />
                  )
                }
                return (
                  <Fragment>
                    {link(matched)}
                    {matched && nested && nestedItems(nested, location)}
                  </Fragment>
                )
              }
              return submitButton(matched)
            })()}
          </li>
        )
      }}
    </Route>
  )
}

export default DmsSideBarItem
