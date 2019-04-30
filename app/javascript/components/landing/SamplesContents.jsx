import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
import comm from '../../images/comm.svg'
import commonFileText from '../../images/common-file-text_big-1.svg'
import robotHead from '../../images/robot-head-1.svg'
import cogBrowser from '../../images/cog-browser.svg'
import conversationImg from '../../images/conversation-chat-bubble-1.svg'
import Arrows from '../../elements/Arrows'
import Right from '../../images/arrow-button-right'
import TextEditor from '../../elements/TextEditor'
import DropDownMenu from '../../elements/DropDownMenu'
import pencil from '../../images/pencil-write'
import trashBucket from '../../images/trash_bucket'
import direction_button from '../../images/direction-button-5'
import FileField from '../../elements/FileField'

const options = [
  {
    key: 'edit_text',
    text: 'Edit text',
    icon: pencil,
    onClick: undefined
  },
  {
    key: 'replace_icon',
    text: 'Replace icon',
    icon: direction_button,
    onClick: undefined
  },
  {
    key: 'move_section',
    text: 'Move section',
    icon: direction_button,
    onClick: undefined
  },
  {
    key: 'delete',
    text: 'Delete',
    icon: trashBucket,
    onClick: undefined
  }
]

const slidersElements = [
  {
    image: comm,
    title: 'Resources'
  },
  {
    image: commonFileText,
    title: 'Documents'
  },
  {
    image: robotHead,
    title: 'Technical Clarification'
  },
  {
    image: cogBrowser,
    title: 'Quality Control'
  },
  {
    image: conversationImg,
    title: 'Correspondences'
  },
  {
    image: robotHead,
    title: 'Documents'
  }
]

class SamplesContents extends Component {

  state = {
    showDescription: 'comercial'
  }

  toggleManagment = (e) => {
    this.setState({ showDescription: e.target.getAttribute('data-id') })
  }

  renderCards = () => {
    const { toggleExamples, authed, isAdmin } = this.props
    const elements = slidersElements.map((el, i) => {
      return (
        <div className='card with-dropdown-menu' key={i}>
          {authed && isAdmin && <DropDownMenu options={options} />}
          <ReactSVG
            src={el.image}
            svgStyle={{ height: 100, marginTop: 20 }}
            className='card-img-top text-center'
          />
          <div className='card-body text-center'>
            {authed && isAdmin ? (
              <React.Fragment>
                <TextEditor text={<h5 className='card-title'>{el.title}</h5>} />
                <TextEditor text={<p className='card-text'>Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h5 className='card-title'>{el.title}</h5>
                <p className='card-text'>Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>
              </React.Fragment>
            )}
            <button className='show-example' onClick={toggleExamples}>
              Show Examples
                        <ReactSVG
                src={Right}
                svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              />
            </button>
          </div>
        </div>
      )
    })

    if (authed && isAdmin) {
      elements.push(
        <div className='card with-dropdown-menu' key='new'>
          <DropDownMenu options={options} />
          <div className='add-img-for-card'>
            <FileField
              type='file'
              name='file_logo'
              id='file_logo'
              label='Add a logo'
              dataAllowedFileExtensions='jpg png bmp'
            />
          </div>
          <div className='card-body text-center'>
            <TextEditor text={<h5 className='card-title'>Title</h5>} />
            <TextEditor text={<p className='card-text'>Text</p>} />
            <button className='show-example' onClick={toggleExamples}>
              Add examples
            <ReactSVG
                src={Right}
                svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              />
            </button>
          </div>
        </div>
      )
    }
 
    return elements
  }

  render() {
    const cardCount = window.innerWidth > 1580 ? 5 : window.innerWidth > 1220 ? 4 : 3
    const { showDescription } = this.state
    const { authed, isAdmin } = this.props
    const header = showDescription === 'comercial'
      ? 'Comercial Managment'
      : 'Project Managment'

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: cardCount,
      slidesToScroll: 1,
      nextArrow: <Arrows type='nextBtn' />,
      prevArrow: <Arrows type='prevBtn' />
    }
    return (
      <section id='samples-card'>
        <div className='container'>
          {authed && isAdmin ?
            (
              <React.Fragment>
                <TextEditor text={<h2 className='text-center block-header'>Samples & Contents</h2>} />
              </React.Fragment>
            ) : (
              <h2 className='text-center block-header'>Samples & Contents</h2>
            )}
          <div className='managment row'>
            <ul className='managment-buttons col-4'>
              <li>
                {authed && isAdmin ?
                  (
                    <React.Fragment>
                      <TextEditor text={
                        <button
                          type='button'
                          className={`btn ${showDescription === 'comercial' ? 'active' : ''}`}
                          data-id='comercial'
                        >
                          Comercial Managment
                       </button>}
                      />
                    </React.Fragment>
                  ) : (
                    <button
                      type='button'
                      className={`btn ${showDescription === 'comercial' ? 'active' : ''}`}
                      onClick={this.toggleManagment}
                      data-id='comercial'
                    >
                      Comercial Managment
                  </button>
                  )}
              </li>
              <li>
                {authed && isAdmin ?
                  (
                    <React.Fragment>
                      <TextEditor text={
                        <button
                          type='button'
                          className={`btn ${showDescription === 'project' ? 'active' : ''}`}
                          data-id='comercial'
                        >
                          Project Managment
                        </button>}
                      />
                    </React.Fragment>
                  ) : (
                    <button
                      type='button'
                      className={`btn mt-3 ${showDescription === 'project' ? 'active' : ''}`}
                      onClick={this.toggleManagment}
                      data-id='project'
                    >
                      Project Managment
                    </button>
                  )}
              </li>
            </ul>
            <div className='col-8'>
              {authed && isAdmin ?
                (
                  <React.Fragment>
                    <TextEditor text={<h4 className='managment-headers'>{header}</h4>}/>
                    <TextEditor text={<div className='managment-description'>
                      Largemouth bass Arctic char, salmon brook lamprey,
                      delta smelt thorny catfish cardinalfish
                      barbelless catfish Atlantic trout velvetfish char greenling
                    </div>}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h4 className='managment-headers'>{header}</h4>
                    <div className='managment-description'>
                      Largemouth bass Arctic char, salmon brook lamprey,
                      delta smelt thorny catfish cardinalfish
                      barbelless catfish Atlantic trout velvetfish char greenling
                    </div>
                  </React.Fragment>
                )}
            </div>
          </div>
        </div>
        <Slider className='card-deck mx-4 mb-4' {...settings}>
          {this.renderCards()}
        </Slider>
      </section>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authed: auth.authStatus,
  isAdmin: true
})

export default connect(mapStateToProps)(SamplesContents)
