import React, { Fragment, useCallback } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { downloadNativeFile } from '../../../../../actions/documentsActions'
import FileIcon from '../../../../../elements/FileIcon'

const renderBlock = field => {
  let content
  if (field.codification_kind === 'revision_number') {
    content = (
      <label className="rounded-label red">
        {`Revision ${field.value}`}
        <span className="icon-Locked ml-2" />
      </label>
    )
  } else if (field.codification_kind === 'revision_version') {
    content = (
      <label className="rounded-label red">
        {`Version ${field.value}`}
        <span className="icon-Locked ml-2" />
      </label>
    )
  } else if (field.codification_kind === 'revision_date') {
    content = <span>{moment(new Date(field.value)).format('M.D.YYYY')}</span>
  } else {
    content = <span>{field.value}</span>
  }
  return (
    <div key={field.title} className="document-show__info-row">
      <label>{field.title}</label>
      {content}
    </div>
  )
}

function Content() {
  const dispatch = useDispatch()
  const { projectId, document_id } = useParams()
  const document = useSelector(state => state.documents.current) || {}
  const revisionsWithVersions = useSelector(state => state.documents.revisions)
  const openFile = useCallback(() => {
    dispatch(downloadNativeFile(document_id, true))
  }, [dispatch, document_id])
  const firstColumn = document.document_fields
    .filter(el => el.column === 1
      && el.codification_kind !== 'additional_information'
      && el.kind !== 'upload_field')
  const secondColumn = document.document_fields.filter(el => el.column === 2)
  const fileFields = document.document_fields.filter(el => el.kind === 'upload_field')
  const additionalInformation = document.document_fields
    .find(el => el.codification_kind === 'additional_information') || {}
  const revisions = revisionsWithVersions[revisionsWithVersions.length - 1]
  let lastDocID

  if (revisions) {
    const { versions } = revisions
    lastDocID = versions[versions.length - 1].id
  }

  return (
    <div className="show-document bordered">
      <div className="dms-content__header">
        <div className="d-flex">
          <h4>Document details</h4>
          {lastDocID
          && (
            <div className="dms-content__header_links-block">
              <Link
                to={`/dashboard/projects/${projectId}/documents/${lastDocID}/edit`}
                className="mx-4 link"
                data-title="Edit document"
              >
                Edit document
              </Link>
              <Link
                to={`/dashboard/projects/${projectId}/documents/${lastDocID}/add_revision`}
                className="mx-4 link"
                data-title="Add revision"
              >
                Add revision
              </Link>
              <Link
                to="#"
                className="mx-4 link"
                data-title="Review document"
              >
                Review document
              </Link>
            </div>
          )}
        </div>
        <div className="dms-content__project-phases">
          <span>Project phases</span>
          <ul className="row mx-0">
            <li className="col-3 active">
              <button type="button">
                Planning
              </button>
            </li>
            <li className="col-3">
              <button type="button">
                Development
              </button>
            </li>
            <li className="col-3">
              <button type="button">
                Execution
              </button>
            </li>
            <li className="col-3">
              <button type="button">
                Operation
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="document-show content-body mb-2">
        <div className="main-block">

          <div className="left-column">
            <div className="document-show__info-row">
              <label>Project</label>
              <span>{document.project_name}</span>
            </div>

            <div className="document-show__info-row">
              <label>Document ID</label>
              <span>{document.document_id}</span>
            </div>

            {firstColumn.map(field => renderBlock(field))}
          </div>

          <div className="right-column">
            <div className="document-show__info-row" />

            <div className="document-show__info-row">
              <label>Title</label>
              <span>{document.title}</span>
            </div>

            {secondColumn.map(field => renderBlock(field))}
          </div>
        </div>

        <div className="my-4">
          <label className="mb-4">Additional information</label>
          <div className="d-flex align-items-center mb-4">
            <span>{additionalInformation.value}</span>
          </div>
        </div>

        <div className="my-4">
          <label className="mb-4">Files</label>
          {fileFields.map(field => (
            <div className="d-flex align-items-center mb-4" key={field.filename}>
              <button type="button" onClick={() => openFile()} className="d-flex">
                <FileIcon className="mr-2" filename={field.filename} />
                <span>{field.filename}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="main-block">
          <div className="left-column">
            <div className="document-show__info-row">
              <label>Uploaded on</label>
              <span>{moment(document.created_at).format('M.D.YYYY')}</span>
            </div>
          </div>

          <div className="right-column">
            <div className="document-show__info-row">
              <label>Uploaded by</label>
              {document.username
                && <span>{`${document.username.first_name} ${document.username.last_name}`}</span>}
            </div>
          </div>
        </div>

        {/* <div className="info-block pt-4">
          <div className="left-column">
            <label>Access rights</label>
          </div>

          <div className="right-column">
            <p>K. Koppes, D.Drennen, C. Caro, L. Lundell K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
          </div>
        </div>

        <div className="info-block">
          <div className="left-column">
            <label>E-mail to</label>
          </div>

          <div className="right-column">
            <p>Team Munster Windpark (Engeneers)</p>
          </div>
        </div> */}
      </div>

      {/* <div className="document-show content-body">
        <div className="border-divider" />

        <div className="info-block pt-4">
          <div className="left-column">
            <div><label>Issued on</label></div>
            <div><span>12.10.2019</span></div>
          </div>

          <div className="right-column">
            <p>K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
          </div>
        </div>

        <div className="info-block">
          <div className="left-column">
            <label>By</label>
          </div>

          <div className="right-column">
            <p>M. Lundell</p>
          </div>
        </div>

        <div className="border-divider" />

        <div className="info-block pt-4">
          <div className="left-column">
            <div><label>Reissued</label></div>
            <div><span>18.10.2019</span></div>
          </div>

          <div className="right-column">
            <p>K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
          </div>
        </div>

        <div className="info-block">
          <div className="left-column">
            <label>By</label>
          </div>

          <div className="right-column">
            <p>M. Lundell</p>
          </div>
        </div>
      </div> */}

      <div className="dms-footer">
        <Link
          className="btn btn-white"
          to={`/dashboard/projects/${projectId}/documents/`}
        >
          Back
        </Link>
        {lastDocID
        && (
          <Fragment>
            <Link
              className="btn btn-purple"
              to={`/dashboard/projects/${projectId}/documents/${lastDocID}/edit`}
            >
              Edit
            </Link>
            <Link
              className="btn btn-purple"
              to={`/dashboard/projects/${projectId}/documents/${lastDocID}/add_revision`}
            >
              Add revision
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default Content
