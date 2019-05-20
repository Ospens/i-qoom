import React, { Component } from 'react'

class ModalWelcome extends Component {

  state = {
    showModal: false
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { showModal } = this.state
    return (
      <div>
        <div
          className={`modal fade ${showModal ? 'show' : ''}`}
          id='exampleModalLong'
          tabIndex='-1'
          role='dialog'
          aria-modal='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-body'>
                <h4>Welcome to i-Qoom!</h4>
                <p>You are now in the Project overview. This is where you will create and manage your projects.</p>
                <p>So, let's start your first project.</p>
              </div>
              <div className='modal-footer'>
                <button type='button' className='btn btn-white' onClick={this.handleCloseModal}>Cancel</button>
                <button type='button' className='btn btn-purple' onClick={this.handleCloseModal}>Let's go</button>
              </div>
            </div>
          </div>
        </div>
        {showModal && <div className='modal-backdrop fade show'></div>}
      </div>
    )
  }
}

export default ModalWelcome
