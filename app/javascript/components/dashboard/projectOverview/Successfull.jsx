import React from 'react'

function successfull(closeModal) {
  return (
    <React.Fragment>
      <div className="modal-body info-modal">
        <h4>Well Done!</h4>
        <p>
          You have successfully created your first project.
          It is possible to make changes to your project data
          whatever you want, using the settings button.
        </p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-purple" onClick={closeModal}>Done</button>
      </div>
    </React.Fragment>
  )
}

export default successfull
