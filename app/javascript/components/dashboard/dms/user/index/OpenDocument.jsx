import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { downloadNativeFile } from '../../../../../actions/documentsActions'

function OpenDocument({ docId }) {
  const dispatch = useDispatch()
  const openFile = useCallback(() => {
    dispatch(downloadNativeFile(docId, true))
  }, [dispatch, docId])

  return (
    <div>
      <button type="button" onClick={() => openFile()}>
        <span className="icon-common-file-text_big">
          <span className="path1" />
          <span className="path2" />
          <span className="path3" />
          <span className="path4" />
        </span>
      </button>
    </div>
  )
}

export default OpenDocument
