import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'
import NewModal from '../../../elements/Modal'
import Tabs from '../../../elements/Tabs'
import AddMember from './memberManagment/AddMember'
import DisciplineList from './memberManagment/DisciplineList'
import RoleList from './memberManagment/RoleList'
import MembersBlock from './memberManagment/MembersBlock'
import { ACTIVE_MEMBERS, PENDING_MEMBERS } from './memberManagment/membersTypes'

const modalContent = (type, closeModal) => {
  if (type === 'addMember') {
    return <AddMember closeModal={closeModal} />
  }
  if (type === 'role') {
    return <RoleList closeModal={closeModal} />
  }
  return <DisciplineList closeModal={closeModal} />
}

function MemberManagement() {
  const { projectId } = useParams()
  const [modal, setModal] = useState(false)
  const [type, setType] = useState('')

  const openModal = useCallback(neTtype => {
    setModal(true)
    setType(neTtype)
  }, [])
  const closeModal = useCallback(() => {
    setModal(false)
    setType('')
  }, [])

  return (
    <div id="member-management">
      <div className="member-management-first-line">
        <h5 className="tab-title">Define default filters</h5>
        <ul className="member-management-buttons buttons-with-icons-list">
          <li>
            <button
              type="button"
              className="button-with-icon"
              onClick={() => openModal('role')}
            >
              <span className="icon-task-list-edit" />
              <span data-title="Role list">Role list</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="button-with-icon"
              onClick={() => openModal('discipline')}
            >
              <span className="icon-common-file-text1" />
              <span data-title="Discipline list">Discipline list</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="button-with-icon"
              onClick={() => openModal('addMember')}
            >
              <span className="icon-add_1" />
              <span data-title="Add a member">Add a member</span>
            </button>
          </li>
        </ul>
      </div>
      <Tabs>
        <div label="Active members">
          <MembersBlock projectId={projectId} type={ACTIVE_MEMBERS} />
        </div>
        <div label="Pending members">
          <MembersBlock projectId={projectId} type={PENDING_MEMBERS} />
        </div>
      </Tabs>
      <NewModal
        content={modalContent(type, closeModal)}
        open={modal}
        onClose={closeModal}
        closeOnDimmerClick={false}
      />
    </div>
  )
}

export default MemberManagement
