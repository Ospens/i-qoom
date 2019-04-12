import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import ReactSVG from 'react-svg'
import './Dashboard.scss'
import logo from '../../images/Logo_header'
import plus from '../../images/add_1'
import bell from '../../images/alarm-bell'
import messages from '../../images/email-action-unread'
import tmpAvatar from '../../images/colors'

class Dashboard extends Component {

  state = {
    user: null,
    showModal: false
  }

  componentDidMount() {
    const { token } = this.props.info
    if ( !token ) {
      console.log('Unauthorization')
    }

    axios.get('/home', { headers: { Authorization: token } })
      .then(res => this.setState({user: res.data.hello}))
  }


  handleOpenModal = () => {
    this.setState({ showModal: true })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }

  handleClickOutside = (event) => {
    if (this.state.showModal && this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      alert('You clicked outside of me!');
    }
  }

  render() {
    const { user, showModal } = this.state
    return (
      <div className='container-fluid'>
        <div className='row'>
          <nav className='col-md-2 d-none d-md-block sidebar'>
            <div className='sidebar-sticky'>
              <a className='navbar-brand logo_h' href='#'>
                <ReactSVG
                  svgStyle={{ height: 30, width: 100 }}
                  src={logo}
                />
              </a>
              <ul className='nav flex-column'>
                <li className='nav-item'>
                  <a className='nav-link active'>Project ovreview</a>
                </li>
              </ul>
            </div>
          </nav>

          <div className='col-md-9 ml-sm-auto col-lg-10 px-5'>            
            <div className='user-info'>
              <ul>
                <li className='nav-item'>
                  <button type='button' className='nav-link btn-transparent'>
                    <ReactSVG
                      svgStyle={{ height: 15, marginRight: 10 }}
                      src={messages}
                    />
                  </button>
                </li>
                <li className='nav-item'>
                  <button type='button' className='nav-link btn-transparent'>
                    <ReactSVG
                      svgStyle={{ height: 20, marginRight: 10 }}
                      src={bell}
                    />
                  </button>
                </li>
                <li className='nav-item'>
                  <button type='button' className='nav-link btn-transparent'>
                    <ReactSVG
                      svgStyle={{ height: 30, width: 30 }}
                      src={tmpAvatar}
                    />
                  </button>
                </li>
              </ul>
            </div>

            <main role='main' className='dashboard-content'>
              <h2 className='page-title'>Project ovreview</h2>
              
              <div className='row row-projects'>
                <div className='col-sm-4'>
                  <div className='project-card'>
                    <ReactSVG
                      svgStyle={{ height: 20, width: 20 }}
                      src={plus}
                    />
                    <label>Create a new project</label>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='project-card'>
                    <ReactSVG
                      svgStyle={{ height: 20, width: 20 }}
                      src={plus}
                    />
                    <label>Create a new project</label>
                  </div>
                </div>
                <div className='col-sm-4'>
                  <div className='project-card'>
                    <ReactSVG
                      svgStyle={{ height: 20, width: 20 }}
                      src={plus}
                    />
                    <label>Create a new project</label>
                  </div>
                </div>
              </div>
              <div className='statuses'>
                <label>Status</label>
                <ul>
                  <li>
                    <span className='green-dot'/>
                    <span>Active</span>
                  </li>
                  <li>
                    <span className='yellow-dot' />
                    <span>In Preparation</span>
                  </li>
                </ul>
              </div>

              <button type='button' className='btn btn-primary' onClick={this.handleOpenModal}>
                Launch demo modal
              </button>

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
                      <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.handleCloseModal}>Cancel</button>
                      <button type='button' className='btn btn-primary'>Let's go</button>
                    </div>
                  </div>
                </div>
              </div>
              {showModal && <div className='modal-backdrop fade show'></div>}
            </main>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  info: state.auth
})

export default connect(mapStateToProps)(Dashboard)
