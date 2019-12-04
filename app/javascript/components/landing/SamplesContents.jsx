import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
import classnames from 'classnames'
import Arrows from '../../elements/Arrows'
// import TextEditor from '../../elements/TextEditor'
// import FileField from '../../elements/FileField'

const options = [
  {
    key: 'edit_text',
    title: 'Edit text',
    icon: 'pencil-icon',
    onClick: undefined
  },
  {
    key: 'replace_icon',
    title: 'Replace icon',
    icon: 'pencil-icon',
    onClick: undefined
  },
  {
    key: 'move_section',
    title: 'Move section',
    icon: 'pencil-icon',
    onClick: undefined
  },
  {
    key: 'delete',
    title: 'Delete',
    icon: 'trash-icon',
    onClick: undefined
  }
]

class SamplesContents extends Component {

  state = {
    activeTab: 'firstTab'
  }

  toggleManagment = (e) => {
    this.setState({ activeTab: e.target.getAttribute('data-id') })
  }

  renderCards = () => {
    const { toggleExamples, authed, editable, cards } = this.props
    const elements = cards.map((el, i) => {
      return (
        <div className='card with-dropdown-menu m-0' key={i}>
          {/*authed && editable &&
          <DropDown
            dots={true}
            className='dropdown-with-icon'
          >
            {options.map(({ title, icon }, i) => (
              <button type='button' className='dropdown-item btn' key={i}>
                <div>
                  <span className={classnames('gray mr-2', icon)} />
                </div>
                <span className='item-text'>
                  {title}
                </span>
              </button>
            ))}
            </DropDown>*/}
          <ReactSVG
            src={el.image}
            svgStyle={{ height: 100, marginTop: 40, marginBottom: 20 }}
            className='card-img-top text-center'
          />
          <div className='card-body'>
            {/*authed && editable ? (
              <React.Fragment>
                <TextEditor text={el.description} className='card-content'/>
              </React.Fragment>
            ) : (
              <div className='card-content' dangerouslySetInnerHTML={{ __html: el.description }} />
            )*/}
            <div className='card-content' dangerouslySetInnerHTML={{ __html: el.description }} />
            <button className='show-example' onClick={toggleExamples}>
              Show Examples
              <ReactSVG
                src={'Right'}
                svgStyle={{ height: 10, width: 10, marginLeft: 10 }}
              />
            </button>
          </div>
        </div>
      )
    })
    /*
    if (authed && editable) {
      elements.push(
        <div className='card with-dropdown-menu' key='new'>
          <DropDown
            dots={true}
            className='dropdown-with-icon'
          >
            {options.map(({ title, icon }, i) => (
              <button type='button' className='dropdown-item btn' key={i}>
                <div>
                  <span className={classnames('gray mr-2', icon)} />
                </div>
                <span className='item-text'>
                  {title}
                </span>
              </button>
            ))}
          </DropDown>
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
 */
    return elements
  }

  render() {
    const cardCount = window.innerWidth > 1580
      ? 5
      : window.innerWidth > 1220
        ? 4
        : window.innerWidth > 768
          ? 3
          : 1
    const { activeTab } = this.state
    const { authed, editable, title, firstTab, secondTab } = this.props

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: cardCount,
      slidesToScroll: 1,
      nextArrow: <Arrows type='right' />,
      prevArrow: <Arrows type='left' />
    }
    return (
      <section id='samples-card'>
        <div className='container'>
          {/*authed && editable ?
            (
              <React.Fragment>
                <TextEditor text={title} className='mb-5'/>
              </React.Fragment>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: title }} />
            )*/}
          <div className='samples-card__title'  dangerouslySetInnerHTML={{ __html: title }} />
          <div className='management'>
            <ul className='management-buttons col-4'>
              <li>
                {/*authed && editable ?
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
                      className={`btn ${activeTab === 'comercial' ? 'active' : ''}`}
                      onClick={this.toggleManagment}
                      data-id='comercial'
                    >
                      {firstTab.title}
                  </button>
                  )*/}
                <button
                  type='button'
                  className={classnames('btn', { 'active': activeTab === 'firstTab' })}
                  onClick={this.toggleManagment}
                  data-id='firstTab'
                >
                  {firstTab.title}
                </button>
              </li>
              <li>
                {/*authed && editable ?
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
                      className={`btn mt-3 ${activeTab === 'project' ? 'active' : ''}`}
                      onClick={this.toggleManagment}
                      data-id='project'
                    >
                      {secondTab.title}
                    </button>
                  )*/}

                <button
                  type='button'
                  className={classnames('btn mt-3', { 'active': activeTab === 'secondTab' })}
                  onClick={this.toggleManagment}
                  data-id='secondTab'
                >
                  {secondTab.title}
                </button>
              </li>
            </ul>
            <div className='col-8'>
              {/*authed && editable ?
                (
                  <TextEditor text={firstTab.description} />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: firstTab.description }} />
                )*/}
              <div dangerouslySetInnerHTML={{ __html: this.props[activeTab].description }} />
            </div>
          </div>
        </div>
        <Slider className='card-deck' {...settings}>
          {this.renderCards()}
        </Slider>
      </section>
    )
  }
}

const mapStateToProps = ({ user, landing }) => ({
  authed: user.authStatus,
  title: landing.samplesAndContent.title,
  firstTab: landing.samplesAndContent.firstTab,
  secondTab: landing.samplesAndContent.secondTab,
  cards: landing.samplesAndContent.cards,
})

export default connect(mapStateToProps)(SamplesContents)
