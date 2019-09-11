import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import UserAvatar from 'react-user-avatar'
import DropDown from '../../../../elements/DropDown'
import { SelectComponent } from '../../../../elements/SelectField'
import { startUpdateProjectMember } from '../../../../actions/projectMembersActions'

const tableData = [
  { name: 'Anna Danielson', member_id: 'ArandomnameTest12dsf345', employment: 2, access: { DMS: true } },
  { name: 'Anna Danielsson', member_id: 'ArandomnameTest12345', employment: 1, access: { DMS: true } }
]

const columns = [
  { title: 'Person', divider: false },
  { title: 'Member-ID', divider: true },
  { title: 'Employment', divider: true },
  { title: 'Role', divider: true },
  { title: 'Discipline', divider: true },
  { title: 'Module access', divider: true }
]

const emplOptions = [
  { value: 0, title: 'Employee' },
  { value: 1, title: 'Internal contractor' },
  { value: 2, title: 'External contractor' }
]

class MemberTable extends Component {

  state = {
    column: null,
    data: tableData,
    direction: null,
    accesses: []
  }

  handleChange = (val, id, option) => {
    const { startUpdateProjectMember, projectId, type } = this.props
    const v = {
      id,
      [option]: val.value || val
    }

    return startUpdateProjectMember(v, projectId, type)
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        // data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  renderAccessOptions = (label, modeleMaster, checked, member_id) => {
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

  renderModuleAccess = (id, cms_module_access, cms_module_master, dms_module_access, dms_module_master) => {
    const titleItems = []
    if (cms_module_access) {
      titleItems.push('CMS')
    } 
    if (dms_module_access) {
      titleItems.push('DMS')
    }

    return (
      <DropDown
        className='dropdown-with-switch'
        btnName={titleItems.join(', ')}
        btnClass='btn btn-for-switch'
      >
        <button className='dropdown-item mainitem' type='button'>
          <span>Contract MS</span>
          <label className='switch ml-2' htmlFor={`cms_module_access_${id}`}>
            <input
              id={`cms_module_access_${id}`}
              type='checkbox'
              checked={cms_module_access}
              onChange={() => this.handleChange(!cms_module_access, id, 'cms_module_access')}
            />
            <span className='slider round' />
          </label>
        </button>
        {cms_module_access &&
        <button className='dropdown-item subitem' type='button'>
          <span>Module master</span>
          <label className='switch ml-2' htmlFor={`cms_module_master_${id}`}>
            <input
              type='checkbox'
              id={`cms_module_master_${id}`}
              checked={cms_module_master}
              onChange={() => this.handleChange(!cms_module_master, id, 'cms_module_master')}
            />
            <span className='slider round' />
          </label>
        </button>}
        <button className='dropdown-item mainitem' type='button'>
          <span>Document MS</span>
          <label className='switch ml-2' htmlFor={`dms_module_access_${id}`}>
            <input
              type='checkbox'
              id={`dms_module_access_${id}`}
              checked={dms_module_access}
              onChange={() => this.handleChange(!dms_module_access, id, 'dms_module_access')}
            />
            <span className='slider round' />
          </label>
        </button>
        {dms_module_access &&
        <button className='dropdown-item subitem' type='button'>
          <span>Module master</span>
          <label className='switch ml-2' htmlFor={`dms_module_master_${id}`}>
            <input
              type='checkbox'
              id={`dms_module_master_${id}`}
              checked={dms_module_master}
              onChange={() => this.handleChange(!dms_module_master, id, 'dms_module_master')}
            />
            <span className='slider round' />
          </label>
        </button>}
      </DropDown>
    )
  }

  render() {
    const { column, direction } = this.state
    const { members, roleOptions, discOptions } = this.props

    return (
      <div className='table-block'>
        <Table sortable className='main-table-block'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className='table-checkbox'>
                <div>
                  <input
                    type='checkbox'
                    id='check_all'
                  />
                  <label htmlFor='check_all'></label>
                </div>
              </Table.HeaderCell>
              {columns.map(({ title, divider }) => (
                <Table.HeaderCell
                  sorted={column === title ? direction : null}
                  onClick={this.handleSort(title)}
                  key={title}
                >
                  {divider && <span className='divider' />}
                  <span>{title}</span>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members.map(({ id, first_name, last_name, member_id, cms_module_access, cms_module_master, dms_module_access, dms_module_master, ...member }) => (
              <Table.Row key={id}>
                <Table.Cell className='table-checkbox'>
                  <div>
                    <input type='checkbox' id={id} />
                    <label htmlFor={id}></label>
                  </div>
                </Table.Cell>
                <Table.Cell className='name-column'>
                  <div>
                    <UserAvatar size='42' name={`${first_name} ${last_name}`} />
                    <span className='master-icon'>M</span>
                  </div>
                  <div className='user-and-company'>
                    <span className='user-names'>{`${first_name} ${last_name}`}</span>
                    <span className='company-title'>Company name</span>
                  </div>
                </Table.Cell>
                <Table.Cell className='member-id'>
                  <span>{member_id || 'Empty'}</span>
                </Table.Cell>
                <Table.Cell className='td-select-dropdown'>
                  <SelectComponent
                    id='employment_type'
                    name='employment_type'
                    onChange={val => this.handleChange(val, id, 'employment_type')}
                    options={emplOptions}
                    defaultValue={emplOptions.filter(el => member.employment_type === el.id)}
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell className='td-select-dropdown'>
                  <SelectComponent
                    id='company_type'
                    name='company_type'
                    onChange={val => this.handleChange(val, id, 'role_id')}
                    options={roleOptions}
                    defaultValue={roleOptions.filter(el => member.role_id === el.id)}
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell className='td-select-dropdown'>
                  <SelectComponent
                    id='discipline'
                    name='discipline'
                    onChange={val => this.handleChange(val, id, 'discipline_id')}
                    options={discOptions}
                    defaultValue={discOptions.filter(el => member.discipline_id === el.id)}
                    className='form-control-select'
                  />
                </Table.Cell>
                <Table.Cell className='access-column'>
                  {this.renderModuleAccess(id, cms_module_access, cms_module_master, dms_module_access, dms_module_master)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  roleOptions: state.projectMembers.roles,
  discOptions: state.projectMembers.disciplines
})

const mapDispatchToProps = dispatch => ({
  startUpdateProjectMember: (values, projectId, type) => dispatch(startUpdateProjectMember(values, projectId, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(MemberTable)
