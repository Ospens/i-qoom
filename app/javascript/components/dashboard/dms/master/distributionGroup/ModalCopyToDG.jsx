import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import ReactSVG from 'react-svg'
import { DragDropContext } from 'react-beautiful-dnd'
import NewModal from '../../../../../elements/Modal'
import accessRightsIcon from '../../../../../images/common-file-share'
import ModalCopyDGTable from './ModalCopyDGTable'

export class ModalCopyToDG extends Component {

  state = {
    checkedTeam: [],
    checkedDG: [],
    copyingToDG: false
  }

  handleOpen = () => this.setState({ copyingToDG: true})

  handleClose = () => this.setState({ copyingToDG: false })

  checkItem = (type, value) => {
    const checked = this.state[type]
    let newVal

    if (checked.includes(value)) {
      newVal = checked.filter(el => el !== value)
    } else {
      checked.push(value)
    }

    this.setState({ [type]: newVal || checked })
  }


  onDragEnd = result => {
    console.log('onDragEnd')
  }

  renderModalContent = () => {
    const { checkedDG, checkedTeam } = this.state
    const { groupId } = this.props

    return (
      <form>
        <div className='modal-container'>
          <div className='modal-container__title-block'>
            <h4>Copy team to distribution group</h4>
          </ div>
          <div className='modal-container__content-block pt-4'>
            <label>
              Select or drag and drop members from team to distribution group
            </label>
          </ div>
          <div className='copy-team-to-dg-tables'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <ModalCopyDGTable
                type='Team'
                checkItem={(type, value) => this.checkItem(type, value)}
                checked={checkedTeam}
              />
              <ModalCopyDGTable
                type='DG'
                groupId={groupId}
                checkItem={(type, value) => this.checkItem(type, value)}
                checked={checkedDG}
              />
            </DragDropContext>
          </div>
        </ div>
      </ form>
    )
  }

  renderTrigger = () => {
    return (
      <button
        type='button'
        className='dropdown-item btn'
        onClick={this.handleOpen}
      >
        <ReactSVG
          svgStyle={{ height: 13, width: 13 }}
          src={accessRightsIcon}
        />
        <span className='item-text'>
          Copy team members to DG
        </span>
      </button>
    )
  }
  
  render() {
    const { copyingToDG } = this.state
    // TODO: make it draggable

    return (
      <NewModal
        content={this.renderModalContent()}
        trigger={this.renderTrigger()}
        modalOpen={copyingToDG}
        handleClose={this.handleClose}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  
})

export default connect(mapStateToProps)
  (reduxForm(
    {
      form: 'copy_to_dg_group',
    })
  (ModalCopyToDG))

