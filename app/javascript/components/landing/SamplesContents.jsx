import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
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

class SamplesContents extends Component {

  state = {
    showDescription: 'comercial'
  }

  toggleManagment = (e) => {
    this.setState({ showDescription: e.target.getAttribute('data-id') })
  }

  renderCards = () => {
    const { toggleExamples, authed, isAdmin, cards } = this.props
    const elements = cards.map((el, i) => {
      return (
        <div className='card with-dropdown-menu' key={i}>
          {authed && isAdmin && <DropDownMenu options={options} />}
          <ReactSVG
            src={el.image}
            svgStyle={{ height: 100, marginTop: 20 }}
            className='card-img-top text-center'
          />
          <div className='card-body'>
            {authed && isAdmin ? (
              <React.Fragment>
                <TextEditor text={el.description} className='card-content'/>
              </React.Fragment>
            ) : (
              <div className='card-content' dangerouslySetInnerHTML={{ __html: el.description }} />
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
            <TextEditor text={`<h5 className='card-title'>Title</h5>`} className='card-content'/>
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
    const { authed, isAdmin, title, firstTab, secondTab } = this.props
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
                <TextEditor text={title} className='mb-5'/>
              </React.Fragment>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: title }} />
            )}
          <div className='managment row mt-5'>
            <ul className='managment-buttons col-4'>
              <li>
                {authed && isAdmin ?
                  (
                    <button
                      type='button'
                      className='btn active'
                      data-id='comercial'
                    >
                      <TextEditor text={firstTab.title} />
                    </button>
                  ) : (
                    <button
                      type='button'
                      className={`btn ${showDescription === 'comercial' ? 'active' : ''}`}
                      onClick={this.toggleManagment}
                      data-id='comercial'
                    >
                      {firstTab.title}
                  </button>
                  )}
              </li>
              <li>
                {authed && isAdmin ?
                  (
                    <button
                      type='button'
                      className='btn mt-2'
                      data-id='comercial'
                    >
                      <TextEditor text={secondTab.title} />
                    </button>
                  ) : (
                    <button
                      type='button'
                      className={`btn mt-3 ${showDescription === 'project' ? 'active' : ''}`}
                      onClick={this.toggleManagment}
                      data-id='project'
                    >
                      {secondTab.title}
                    </button>
                  )}
              </li>
            </ul>
            <div className='col-8'>
              {authed && isAdmin ?
                (
                  <TextEditor text={firstTab.description} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: firstTab.description }} />
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

const mapStateToProps = ({ auth, landing }) => ({
  authed: auth.authStatus,
  isAdmin: true,
  title: landing.samplesAndContent.title,
  firstTab: landing.samplesAndContent.firstTab,
  secondTab: landing.samplesAndContent.secondTab,
  cards: landing.samplesAndContent.cards,
})

export default connect(mapStateToProps)(SamplesContents)
