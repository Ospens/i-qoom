import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserAvatar from 'react-user-avatar'
import ReactSVG from 'react-svg'
import dots from '../../../images/dots-horizontal'
import plus from '../../../images/add_1'
import close from '../../../images/close'
import ConversationsBlock from './ConversationsBlock'

class DocumentPopup extends Component {

  renderDocuments = () => {
    const { documents } = this.props
    return (
      <div className='documents-in-review-block col-4'>
        <div className='documents-in-review-block__title'>
          <label>Documents in review</label>
          <ReactSVG
            svgStyle={{ height: 15, width: 15, marginLeft: 'auto' }}
            src={dots}
          />
        </div>
        <input type='text' className='search-input' placeholder='Search' />
        <div className='documents-in-review__doc-list'>
          {documents.map((doc, i) => {
            return (
              <div className={`documents-in-review__block ${i === 0 ? 'active' : ''}`} key={i}>
                <div className='documents-in-review__element'>
                  <span className='codification'>{doc.codification_kind}</span>
                  <span>{doc.title}</span>
                </div>
                <div className='ml-auto'>
                  <i className='arrow right ml-2' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  renderReviwers = () => {
    return (
      <div className='review-subject-block col-4'>
        <div className='review-subject__title'>
          <label>Review subject</label>
          <div className='add-subject'>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginRight: 5 }}
              src={plus}
            />
            <span>Add subject</span>
          </div>
        </div>
        <input type='text' className='search-input' placeholder='Search' />
        <div className='review-subject__doc-list'>
          <div className='review-subject'>
            <div className='review-subject__rows'>
              <div className='review-subject__first-row'>
                <span className='name'>Lorem Ipsum</span>
                <span className='date'>Today</span>
              </div>
              <div className='review-subject__second-row'>
                <span className='status accepted'>Accepted</span>
                <span className='row-info'>Row 26</span>
                <div className='review-subject__user-avatar-block'>
                  <UserAvatar size='24' name='A B' />
                  <span className='member-count'>2</span>
                  <span className='star-icon' />
                </div>
              </div>
            </div>
            <div className='ml-auto'>
              <span className='unread-messages'>5</span>
              <i className='arrow right ml-2' />
            </div>
          </div>
          <div className='review-subject'>
            <div className='review-subject__rows'>
              <div className='review-subject__first-row'>
                <span className='name'>Lorem Ipsum</span>
                <span className='date'>12.12.2019</span>
              </div>
              <div className='review-subject__second-row'>
                <span className='status accepted'>Accepted</span>
                <span className='row-info'>Row 7</span>
                <div className='review-subject__user-avatar-block'>
                  <UserAvatar size='24' name='Z S' />
                  <span className='member-count'>17</span>
                  <span className='star-icon' />
                </div>
              </div>
            </div>
            <div className='ml-auto'>
              <i className='arrow right ml-2' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { closePopup } = this.props

    return (
      <div className='document-popup'>
        <div className='row m-0'>
          {this.renderDocuments()}
          {this.renderReviwers()}
          {<ConversationsBlock/>}
        </div>
        <div
          className="document-popup__close"
          onClick={closePopup}
        >
          <ReactSVG
            svgStyle={{ height: 30, width: 30 }}
            src={close}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ documents }) => ({
  documents: documents.allDocuments
})

export default connect(mapStateToProps)(DocumentPopup)
