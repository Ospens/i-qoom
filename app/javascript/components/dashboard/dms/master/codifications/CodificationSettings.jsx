import React, { Component } from 'react'
import classnames from 'classnames'
import ReactSVG from 'react-svg'
import UserAvatar from 'react-user-avatar'
import DMSLayout from '../../DMSLayout'
import DmsSideBar from '../../DmsSideBar'
import checkIcon from '../../../../../images/choose_2'

export class CodificationSettings extends Component {
  renderContent = () => {
    return (
      <div className='dms-content bordered'>
        <div className='dms-content__header p-4'>
          <h4>Codificarion settings</h4>
        </div>
        <div className='p-4'>
          <label>Administration codes for document codification</label>
          <div className='conventions-settings-table'>
            {[...Array(3)].map((e, i) => (
              <div className="conventions-settings-block" key={i}>
                <div
                  className={classnames('conventions-settings-card', { 'active': i === 1})}
                >
                  <ReactSVG
                    svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                    src={checkIcon}
                    className='check-icon'
                  />
                  <div className="conventions-settings-title-card">
                    <span className='conventions-settings-card__title'>Convention {i}</span>
                    {i === 1 && <span className='card-active'>Active</span>}
                  </div>
                  <button type='button' className='btn conventions-settings-btn-edit'>
                    Edit
                </button>
                </div>

                <div className="conventions-settings-conv-info">
                  <div className="conventions-settings-conv-info__row">
                    <label>Last change</label>
                    <span>01.12.2020</span>
                  </div>
                  <div className="conventions-settings-conv-info__row">
                    <label>Changed by</label>
                    <div className='changed-by'>
                      <UserAvatar size='42' name='Abel Maria' className=''/>
                      <div className="changed-by__user-info">
                        <span>Abel Maria</span>
                        <label>Company info</label>
                      </div>
                    </div>
                  </div>
                  <div className="conventions-settings-conv-info__row">
                    <label>Member ID</label>
                    <a href='#'>salomonABCD1234</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <DMSLayout
        sidebar={<DmsSideBar />}
        content={this.renderContent()}
      />
    )
  }
}

export default CodificationSettings
