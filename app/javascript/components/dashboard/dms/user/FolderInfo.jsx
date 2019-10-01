import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classnames from 'classnames'
import CreateFolder from './CreateFolder'
import { addDocumentToFolders, startFetchFolders } from '../../../../actions/foldersActions'
import DropDown from '../../../../elements/DropDown'

let initIds = []

const checkingFolder = (checked, value) => {
  const index = checked.indexOf(value)
  if (index > -1) {
    checked.splice(index, 1)
  } else {
    checked.splice(index, 0, value)
  }
  const newVal = new Array(...checked)
  return newVal
}

function FolderInfo({ match: { params: { document_id, project_id } } }) {
  if (!document_id) return <div />

  const folders = useSelector(state => state.folders.allFolders)
  const [checkedFolders, setFolders] = useState([null])

  const dispatch = useDispatch()
  const addDocToFolders = useCallback(() => 
    dispatch(addDocumentToFolders(document_id, checkedFolders)),
    [dispatch, checkedFolders])

  const fetchFolders = useCallback(() => 
    dispatch(startFetchFolders(project_id, document_id)),
    [dispatch])

  useEffect(() => { fetchFolders() }, [])
  useEffect(() => {
    initIds = folders.filter(f => f.enabled).map(el => el.id)
    initIds.push(null)
    setFolders(new Array(...initIds))
  }, [folders])

  return (
    <div className='copy-to-folder-block'>
      <DropDown
        btnClass='btn btn-copy-to-folder'
        btnComponent='Copy to folder'
        className='dropdown-with-icon'
        ulClass='right copy-to-folder-block__popup'
      >
        <label className='copy-to-folder-block__popup_title'>Copy to folder</label>
        <li className='new-folder'><CreateFolder /></li>
        {folders.map(({ id, disabled, title }, i) => {
          const checked = checkedFolders.includes(id)
          const change = () => checkingFolder(checkedFolders, id)

          return (
            <li
              key={i}
              className={classnames(
                { 'disabled': disabled },
                { 'checked': checked }
              )}
            >
              <button className='btn' onClick={() => setFolders(change())}>
                <input
                  type='checkbox'
                  id={id}
                  checked={checked}
                  onChange={() => setFolders(change())}
                />
                <label htmlFor='my_concerns' />
                <i
                  className={classnames('black',
                    { 'icon-folder-empty': !disabled },
                    { 'icon-folder-check': disabled })}
                />
                <span>{title}</span>
              </button>
            </li>
          )
        })}
        {JSON.stringify(initIds) !== JSON.stringify(checkedFolders) &&
        <button
          type='button'
          className='btn btn-white-blue wide-button'
          onClick={addDocToFolders}
        >
          Copy to folder(s)
        </button>}
      </DropDown>
    </div>
  )
}

export default withRouter(FolderInfo)
