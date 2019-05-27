import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import searchIcon from '../../../images/search-alternate-gray'
import attachIcon from '../../../images/attachment-1'
import sendIcon from '../../../images/send-email-2'
import dots from '../../../images/dots-horizontal'
import checkIcon from '../../../images/check_1'
import DropDown from '../../../elements/DropDown'
import { actionDDitems } from './constants'

export default class ConversationsBlock extends Component {

  state = {
    showReviwers: false,
    dotsDropDown: false
  }

  handleKeyDown = e => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight + 10}px`;
  }

  commentsForRevision = () => {
    return (
      <div className="tooltip-info-block">
        <label className='tooltip-info-block__title'>Comments for revision 42</label>
        <div className="row m-0">
          <div className="col-6 pl-0">
            <div className="review-owner">
              <label>Review owner</label>
              <div className="reviwer">
                <span>Prince Charles</span>
              </div>
            </div>
            <div className="review-lead">
              <label>Review lead</label>
              <div className="reviwer">
                <span>John Doe(you)</span>
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginLeft: 10 }}
                  src={checkIcon}
                />
              </div>
            </div>
          </div>
          <div className="col-6 pr-0">
            <div className="reviewers">
              <label>Reviewers</label>
              <div className="reviwer">
                <span>Prince Charles</span>
              </div>
              <div className="reviwer">
                <span>Michael Chack</span>
                <ReactSVG
                  svgStyle={{ height: 15, width: 15, marginLeft: 10 }}
                  src={checkIcon}
                />
              </div>
              <div className="reviwer">
                <span>Zig Zag</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { showReviwers, dotsDropDown } = this.state
    return (
      <div className='conversations-block'>
        <div className='conversations-block__title'>
          {showReviwers && this.commentsForRevision()}
          <label
            className='gray'
            onClick={() => this.setState({ showReviwers: !showReviwers})}
          >
            2/4
          </label>
          <ReactSVG
            svgStyle={{ height: 15, width: 15, marginRight: 15 }}
            src={searchIcon}
            className='ml-auto'
          />
          <ReactSVG
            svgStyle={{ height: 15, width: 15, marginRight: 15 }}
            src={attachIcon}
          />
          <DropDown
            dots={true}
            className='dropdown-with-icon dropleft'
            defaultValues={actionDDitems}
          >
          </DropDown>
        </div>
        <div className="conversations__messages-block">
          <div className="conversations__messages-list">
            <span className="date-block">Yesterday, Sa 10th January, 0:24</span>
            <div className="incoming-message">
              <div className="author-info">
                <span>Author | </span> QWE
              </div>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.              </p>
            </div>
            <span className="date-block">Yesterday, Sa 10th January, 0:40</span>
            <div className="my-message">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
              </p>
            </div>
          </div>
          <div className="type-message-block">
            <textarea
              type="text"
              className='type-message-area'
              placeholder='Type in Message'
              onKeyDown={this.handleKeyDown}
            />
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginRight: 5 }}
              src={sendIcon}
              className='check-icon'
            />
          </div>
        </div>
      </div>
    )
  }
}
