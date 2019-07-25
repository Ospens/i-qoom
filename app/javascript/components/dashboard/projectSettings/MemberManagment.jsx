import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import { withRouter } from 'react-router-dom'
import ActiveMembers from './memberManagment/ActiveMembers'
import PendingMembers from './memberManagment/PendingMembers'
import NewModal from '../../../elements/Modal'
import Tabs from '../../../elements/Tabs'
import roleList from '../../../images/task-list-edit'
import disciplineList from '../../../images/common-file-text'
import blueCheck from '../../../images/add_1'
import DropDown from '../../../elements/DropDown'
import pencil from '../../../images/pencil-write'
import emailSend from '../../../images/email-action-send-2'
import greenCheck from '../../../images/check_3'
import trash_bucket from '../../../images/trash_bucket'
import AddMember from './memberManagment/AddMember'
import { startFetchProjectMembers } from '../../../actions/projectMembersActions'

class MemberManagment extends Component {

  state = {
    addMemberModal: false
  }

  componentWillMount() {
    const { startFetchProjectMembers, match: { params: { project_id } } } = this.props
    startFetchProjectMembers(project_id)
  }

  renderDropDownItems = (pic, name) => (
    <a className='dropdown-item' href='#'>
      <ReactSVG
        svgStyle={{ height: 13, width: 13 }}
        src={pic}
      />
      <span className='item-text'>
        {name}
      </span>
    </a>
  )

  renderNewMemberModal = () => {
    const { match: { params: { project_id } } } = this.props
    return (
      <AddMember
        closeModal={() => this.setState({ addMemberModal: false })}
        projectId={project_id}
      />
    )
  }

  render() {
    const { addMemberModal } = this.state
    const { match: { params: { project_id } } } = this.props

    return (
      <div id='member-managment'>
        <div className='member-managment-first-line'>
          <h5 className='tab-title'>Define default filters</h5>
          <div className='member-managment-buttons'>
            <div>
              <button type='button' className='btn with-icon'>
                <ReactSVG
                  svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                  src={roleList}
                />
                <span>Role list</span>
              </button>
            </div>
            <div>
              <button type='button' className='btn with-icon'>
                <ReactSVG
                  svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                  src={disciplineList}
                />
                <span>Discipline list</span>
              </button>
            </div>
            <div>
              <button
                type='button'
                className='btn with-icon'
                onClick={() => this.setState({ addMemberModal: true })}
              >
                <ReactSVG
                  svgStyle={{ height: 13, width: 13, marginRight: 5 }}
                  src={blueCheck}
                />
                <span>Add member</span>
              </button>
            </div>
          </div>
        </div>
        <Tabs>
          <div label='Active members'>
            <React.Fragment>
              <div>
                <span className='tab-description'>Manage members and grant access</span>
                <DropDown
                  btnName='Action'
                  className='manage-members-actions-button mt-4'
                >
                  {this.renderDropDownItems(emailSend, 'Send invite')}
                  {this.renderDropDownItems(pencil, 'Edit member')}
                  {this.renderDropDownItems(trash_bucket, 'Delete')}
                </DropDown>
              </div>
              <ActiveMembers projectId={project_id}/>
            </React.Fragment>
          </div>
          <div label='Pending members'>
            <React.Fragment>
              <div>
                <span className='tab-description'>Manage members and grant access</span>
                <DropDown
                  btnName='Action'
                  className='mt-4'
                >
                  {this.renderDropDownItems(emailSend, 'Send invite')}
                  {this.renderDropDownItems(pencil, 'Edit member')}
                  {this.renderDropDownItems(trash_bucket, 'Delete')}
                </DropDown>
              </div>
              <PendingMembers />
            </React.Fragment>
          </div>
        </Tabs>
        <NewModal
          content={this.renderNewMemberModal()}
          open={addMemberModal}
          onClose={() => this.setState({ addMemberModal: false })}
        />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startFetchProjectMembers: id => dispatch(startFetchProjectMembers(id))
})

const mapStateToProps = state => ({ })

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberManagment))

