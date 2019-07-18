import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'
import { Field } from 'redux-form'
import SelectField from '../../../../../elements/SelectField'
import UserTableBody from './UserTableBody'

const ddItems = [
  {
    value: 'STX',
    label: 'STX'
  },
  {
    value: 'EOS',
    label: 'EOS'
  }
]

export class ModalCopyDGTable extends Component {

  renderTeamBlock = checked => (
    <React.Fragment>
      <div className='first-row'>
        <div className='form-group'>
          <Field
            name='choose_team'
            id='choose_team'
            value={{}}
            options={ddItems}
            errorField={{}}
            component={SelectField}
            label='Choose team'
          />
        </div>
      </div>

      <div className='second-row'>
        {checked.length > 0 &&
          <span className='selected-count'>
            {`Copy ${checked.length} selected members to distribution group`}
          </span>}
        <div>
          Workgroup Lorem Ipsum Dolor
          </div>
      </div>
    </React.Fragment>
  )

  renderDGBlock = checked => (
    <React.Fragment>
      <div className='first-row'>
        <div className='form-group'>
          <div><label>Selected distribution group</label></div>
          <div className='dg-name'>Distribution group name</div>
        </div>
      </div>

      <div className='second-row'>
        {checked.length !== 0 &&
          <span className='selected-count'>
            {`Delete ${checked.length} selected members from distribution group`}
          </span>}
        <div>
          Distribution group name
          </div>
      </div>
    </React.Fragment>
  )

  render() {
    const { checkItem, checked, current, type } = this.props

    return (
      <div className='copy-team-to-dg-tables_column'>

        {type === 'Team' && this.renderTeamBlock(checked)}
        {type === 'DG' && this.renderDGBlock(checked)}
        
        <div className='table-contaniner'>
          <Table sortable className='main-table-block'>
            <Table.Header>
              <Table.Row>
                {type === 'DG' && <Table.HeaderCell />}
                <Table.HeaderCell className='table-checkbox'>
                  <div>
                    <input
                      type='checkbox'
                      id='check_all'
                    />
                    <label htmlFor='check_all' />
                  </div>
                </Table.HeaderCell>
                <Table.HeaderCell >
                  <span>Name</span>
                </Table.HeaderCell>
                <Table.HeaderCell >
                  <span className='divider' />
                  <span>Company</span>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <UserTableBody
              type={type}
              checkItem={checkItem}
              checked={checked}
              users={current.members}
            />

          </Table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ distributionGroups }, ownProps) => ({
  // TODO: change this
  current: distributionGroups.dgGroups[0]
})

export default connect(mapStateToProps)(ModalCopyDGTable)
