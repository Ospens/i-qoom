import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import lockIcon from '../../../images/Locked'
import dmsSettingsIcon from '../../../images/task-list-settings'
import revisionIcon from '../../../images/Revise_2'
import pdfIcon from '../../../images/office-file-pdf'
import DMSLayout from './DMSLayout'
import ModalAddComment from './ModalAddComment'

class ShowDocument extends Component {

  state = {
    addComment: true
  }

  renderContent = () => {
    const { addComment } = this.state

    return (
      <div className='show-document bordered'>
        {addComment && <ModalAddComment/>}
        <div className='new-document__header p-4'>
          <h4>Document details</h4>
          <div className='new-project__project-phases'>
            <span>Project phases</span>
            <ul className='row mx-0'>
              <li className='col-3 active'>
                <button>
                  Planning
                      </button>
              </li>
              <li className='col-3'>
                <button>
                  Development
                      </button>
              </li>
              <li className='col-3'>
                <button>
                  Execution
                      </button>
              </li>
              <li className='col-3'>
                <button>
                  Operation
                      </button>
              </li>
            </ul>
          </div>
        </div>

        <div className='document-show p-4'>
          <div className='row'>

            <div className='col-6'>
              <div className='document-show__info-row'>
                <label>Project</label>
                <span>Munster Windpark</span>
              </div>

              <div className='document-show__info-row'>
                <label>Party</label>
                <span>STX</span>
              </div>

              <div className='document-show__info-row'>
                <label>Discipline</label>
                <span>STX France S.A.</span>
              </div>

              <div className='document-show__info-row'>
                <label>Document ID</label>
                <span>MWP-STX-EOS-XXX-1234</span>
              </div>

              <div className='document-show__info-row'>
                <label>Originator</label>
                <span>Mastus majus est</span>
              </div>

              <div className='document-show__info-row'>
                <label>Current Revision</label>
                <label className='rounded-label red'>
                  Revision 00
                          <ReactSVG
                    svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
                    src={lockIcon}
                  />
                </label>
              </div>

              <div className='document-show__info-row'>
                <label>Relevance I</label>
                <span>Mastus majus est
                          <div className='tooltip'>
                    <span>some text</span>
                  </div>
                </span>
              </div>
            </div>

            <div className='col-6'>
              <div className='document-show__info-row'>
              </div>

              <div className='document-show__info-row'>
                <label>Document type</label>
                <span>Invoice</span>
              </div>

              <div className='document-show__info-row'>
                <label>Title</label>
                <span>Invoice NTB-2018</span>
              </div>

              <div className='document-show__info-row'>
                <label>Revision date</label>
                <span>Dec 12, 2019</span>
              </div>

              <div className='document-show__info-row'>
              </div>

              <div className='document-show__info-row'>
                <label>Current Version</label>
                <label className='rounded-label red'>
                  Revision 00
                          <ReactSVG
                    svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
                    src={lockIcon}
                  />
                </label>
              </div>

              <div className='document-show__info-row'>
                <label>Relevance II</label>
                <span>As relevant as drinking water</span>
              </div>
            </div>
          </div>

          <div className='document-show__text-row row'>
            <label className='mb-4'>Additional information</label>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
          </div>

          <div className='document-show__files-row'>
            <label className='mb-4'>Files</label>
            <div className='d-flex align-items-center mb-4'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                src={pdfIcon}
              />
              <span>Lorem_Ipsum_Langer_Filename.pdf</span>
            </div>
            <div className='d-flex align-items-center'>
              <ReactSVG
                svgStyle={{ height: 20, width: 20, marginRight: 10 }}
                src={pdfIcon}
              />
              <span>Short_Intro.ppt</span>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col-6'>
              <div className='document-show__info-row'>
                <label>Uploaded on</label>
                <span>12.10.2019</span>
              </div>
            </div>

            <div className='col-6'>
              <div className='document-show__info-row'>
                <label>Uploaded by</label>
                <span>John Doe</span>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-2'>
              <div className='document-show__info-row'>
                <label>Access rights</label>
              </div>
            </div>

            <div className='col-10'>
              <div className='document-show__info-row'>
                <p>K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
                <p>K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
              </div>
            </div>
          </div>

          <div className='row'>
            <div className='col-2'>
              <div className='document-show__info-row'>
                <label>E-mail to</label>
              </div>
            </div>

            <div className='col-10'>
              <div className='document-show__info-row'>
                <p>Team Munster Windpark (Engeneers)</p>
              </div>
            </div>
          </div>
        </div>

        <div className='border-divider' />

        <div className='row p-4'>
          <div className='col-2'>
            <div className='document-show__info-row'>
              <label>Issued on</label>
              <span>12.10.2019</span>
            </div>
          </div>

          <div className='col-10'>
            <div className='document-show__info-row'>
              <p>K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
            </div>
          </div>
        </div>

        <div className='row p-4'>
          <div className='col-2'>
            <div className='document-show__info-row'>
              <label>By</label>
            </div>
          </div>

          <div className='col-10'>
            <div className='document-show__info-row'>
              <p>M. Lundell</p>
            </div>
          </div>
        </div>

        <div className='border-divider' />

        <div className='row p-4'>
          <div className='col-2'>
            <div className='document-show__info-row'>
              <label>Reissued</label>
              <span>18.10.2019</span>
            </div>
          </div>

          <div className='col-10'>
            <div className='document-show__info-row'>
              <p>K. Koppes, D.Drennen, C. Caro, L. Lundell</p>
            </div>
          </div>
        </div>

        <div className='row p-4'>
          <div className='col-2'>
            <div className='document-show__info-row'>
              <label>By</label>
            </div>
          </div>

          <div className='col-10'>
            <div className='document-show__info-row'>
              <p>M. Lundell</p>
            </div>
          </div>
        </div>

        <div className='dms-footer'>
          <button type='button' className='btn btn-white'>Back</button>
        </div>
      </div>
    )
  }

  renderSideBar = () => (
    <div className='dms-sidebar-menu'>

      <div className='dms-sidebar-menu__document-title'>
        <div className='editable-title'>
          <h5>(Document name)</h5>
        </div>
        <button className='btn copy-to-folder'>Copy to folder</button>
        {false && <React.Fragment>
          <div className='copied-to-folder'>
            <ReactSVG
              svgStyle={{ height: 13, width: 13, marginLeft: 10 }}
              src={checkIcon}
            />
            <span>Copied to folders</span>
            <button className='btn copy-to-folder'>change</button>
          </div>
          <div className='not-relevant-for-me'>
            <span>Not relevant for me</span>
            <button className='btn copy-to-folder'>More</button>
          </div>
        </React.Fragment>}
      </div>

      <div className='dms-sidebar-menu__block'>
        <h4>Document history</h4>
        <div className='scroll-block'>
          <div className='scroll-block-title'>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginLeft: 10, marginRight: 10 }}
              src={revisionIcon}
            />
            <span>Revision</span>
          </div>
          <ul className='revision-list'>
            {[...Array(5)].map((e, i) => (
              <li key={i}>
                {i + 1}
              </li>
            ))}
            <li className='active'>
              6
                      </li>
          </ul>
        </div>
      </div>

      <div className='dms-sidebar-menu__block'>
        <h4>Document history</h4>
        <div className='scroll-block'>
          <div className='scroll-block-title'>
            <ReactSVG
              svgStyle={{ height: 15, width: 15, marginLeft: 10, marginRight: 10 }}
              src={dmsSettingsIcon}
            />
            <span>Versions</span>
          </div>
          <ul className='revision-list'>
            {[...Array(2)].map((e, i) => (
              <li key={i}>
                {i + 1}
              </li>
            ))}
            <li className='active'>
              3.0
                      </li>
          </ul>
        </div>
      </div>
    </div>
  )

  render() { 
    return (
      <React.Fragment>
        <DMSLayout
          sidebar={this.renderSideBar()}
          content={this.renderContent()}
        />
      </React.Fragment>
    )
  }
}

export default ShowDocument
