import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import DropDown from '../../../../elements/DropDown'
import { SelectComponent } from '../../../../elements/SelectField'
import { startUpdateProjectMember } from '../../../../actions/projectMembersActions'

const columns = [
  { title: 'Person', divider: false },
  { title: 'Member-ID', divider: true },
  { title: 'Employment', divider: true },
  { title: 'Role', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Module access', divider: true }
]

const emplOptions = [
  { value: 'employee', title: 'Employee' },
  { value: 'internal_contractor', title: 'Internal contractor' },
  { value: 'external_contractor', title: 'External contractor' }
]
/*

const renderAccessOptions = (label, modeleMaster, checked, member_id) => {
    const className = modeleMaster ? 'subitem' : 'mainitem'
    return (
      <a className={`dropdown-item ${className}`} href='#'>
        <span>{label}</span>
        <label className='switch ml-2'>
          <input type='checkbox' id={member_id} defaultChecked={checked}/>
          <span className='slider round' />
        </label>
      </a>
    )
  }
*/

const ModuleAccess = ({ member, currentUserId, handleChange }) => {
  const {
    id,
    cms_module_access: cmsModuleAccess,
    cms_module_master: cmsModuleMaster,
    dms_module_access: dmsModuleAccess,
    dms_module_master: dmsModuleMaster,
    user_id: userId
  } = member
  const [titleItems, setTitleItems] = useState([])
  useEffect(() => {
    const newTitle = []
    if (cmsModuleAccess) {
      newTitle.push('CMS')
    }
    if (dmsModuleAccess) {
      newTitle.push('DMS')
    }
    setTitleItems(newTitle)
  }, [cmsModuleAccess, dmsModuleAccess])

  return (
    <DropDown
      className="dropdown-with-switch"
      btnName={titleItems.join(', ')}
      btnClass="btn btn-for-switch"
    >
      <button className="dropdown-item mainitem" type="button">
        <span>Contract MS</span>
        <label className="switch ml-2" htmlFor={`cms_module_access_${id}`}>
          <input
            id={`cms_module_access_${id}`}
            type="checkbox"
            checked={cmsModuleAccess}
            disabled={userId === currentUserId}
            onChange={() => handleChange(!cmsModuleAccess, id, 'cms_module_access')}
          />
          <span className="slider round" />
        </label>
      </button>
      {cmsModuleAccess
      && (
        <button className="dropdown-item subitem" type="button">
          <span>Module master</span>
          <label className="switch ml-2" htmlFor={`cms_module_master_${id}`}>
            <input
              type="checkbox"
              id={`cms_module_master_${id}`}
              checked={cmsModuleMaster}
              onChange={() => handleChange(!cmsModuleMaster, id, 'cms_module_master')}
            />
            <span className="slider round" />
          </label>
        </button>
      )}
      <button className="dropdown-item mainitem" type="button">
        <span>Document MS</span>
        <label className="switch ml-2" htmlFor={`dms_module_access_${id}`}>
          <input
            type="checkbox"
            id={`dms_module_access_${id}`}
            checked={dmsModuleAccess}
            onChange={() => handleChange(!dmsModuleAccess, id, 'dms_module_access')}
          />
          <span className="slider round" />
        </label>
      </button>
      {dmsModuleAccess
      && (
        <button className="dropdown-item subitem" type="button">
          <span>Module master</span>
          <label className="switch ml-2" htmlFor={`dms_module_master_${id}`}>
            <input
              type="checkbox"
              id={`dms_module_master_${id}`}
              checked={dmsModuleMaster}
              onChange={() => handleChange(!dmsModuleMaster, id, 'dms_module_master')}
            />
            <span className="slider round" />
          </label>
        </button>
      )}
    </DropDown>
  )
}

function MemberTable({
  projectId, type, members, updateCheckedMembers, checkedMembers
}) {
  const dispatch = useDispatch()
  const roleOptions = useSelector(state => state.projectMembers.roles)
  const userId = useSelector(state => state.user.user_id)
  const discOptions = useSelector(state => state.projectMembers.disciplines)
  const handleChange = useCallback((val, id, option) => {
    const v = {
      id,
      [option]: val.value || val
    }
    dispatch(startUpdateProjectMember(v, projectId, type))
  }, [dispatch, projectId, type])

  return (
    <div className="table-block">
      <Table sortable striped className="main-table-block">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="table-checkbox">
              <div>
                <input
                  type="checkbox"
                  id="check_all"
                />
                <label htmlFor="check_all" />
              </div>
            </Table.HeaderCell>
            {columns.map(({ title, divider }) => (
              <Table.HeaderCell
                key={title}
              >
                {divider && <span className="divider" />}
                <span>{title}</span>
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {members.map(member => (
            <Table.Row key={member.id}>
              <Table.Cell className="table-checkbox">
                <div>
                  <input
                    type="checkbox"
                    id={member.id}
                    onChange={() => updateCheckedMembers(member.id)}
                    checked={checkedMembers.includes(member.id)}
                  />
                  <label htmlFor={member.id} />
                </div>
              </Table.Cell>
              <Table.Cell className="name-column">
                <div>
                  <UserAvatar size="42" name={`${member.first_name} ${member.last_name}`} />
                  <span className="master-icon">M</span>
                </div>
                <div className="user-and-company">
                  <span className="user-names">{`${member.first_name} ${member.last_name}`}</span>
                  <span className="company-title">Company name</span>
                </div>
              </Table.Cell>
              <Table.Cell className="member-id">
                <span>{member.member_id || 'Empty'}</span>
              </Table.Cell>
              <Table.Cell className="td-select-dropdown">
                <SelectComponent
                  id="employment_type"
                  name="employment_type"
                  onChange={val => handleChange(val, member.id, 'employment_type')}
                  options={emplOptions}
                  defaultValue={emplOptions.filter(el => member.employment_type === el.value)}
                  className="form-control-select"
                />
              </Table.Cell>
              <Table.Cell className="td-select-dropdown">
                <SelectComponent
                  id="company_type"
                  name="company_type"
                  onChange={val => handleChange(val, member.id, 'role_id')}
                  options={roleOptions}
                  defaultValue={roleOptions.filter(el => member.role_id === el.id)}
                  className="form-control-select"
                />
              </Table.Cell>
              <Table.Cell className="td-select-dropdown">
                <SelectComponent
                  id="discipline"
                  name="discipline"
                  onChange={val => handleChange(val, member.id, 'discipline_id')}
                  options={discOptions}
                  defaultValue={discOptions.filter(el => member.discipline_id === el.id)}
                  className="form-control-select"
                />
              </Table.Cell>
              <Table.Cell className="access-column">
                <ModuleAccess member={member} userId={userId} handleChange={handleChange} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default MemberTable
