import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
import comm from '../../images/comm.svg'
import commonFileText from '../../images/common-file-text_big-1.svg'
import robotHead from '../../images/robot-head-1.svg'
import cogBrowser from '../../images/cog-browser.svg'
import conversationImg from '../../images/conversation-chat-bubble-1.svg'
import Arrows from '../../elements/Arrows'

class SamplesContents extends Component {

  state = {
    showDescription: 'comercial'
  }

  toggleManagment = (e) => {
    this.setState({ showDescription: e.target.getAttribute('data-id') })
  }

  render() {
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
      },
    ]

    const { showDescription } = this.state
    const header = showDescription === 'comercial'
      ? 'Comercial Managment'
      : 'Project Managment'

    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      nextArrow: <Arrows type='nextBtn' />,
      prevArrow: <Arrows type='prevBtn' />
    }
    return (
      <section id='third-card'>
        <div className='container'>
          <h2 className='text-center block-header'>Samples & Contents</h2>
          <div className='managment row'>
            <ul className='managment-buttons col-4'>
              <li>
                <button
                  type='button'
                  className={`btn ${showDescription === 'comercial' ? 'active' : ''}`}
                  onClick={this.toggleManagment}
                  data-id='comercial'
                >
                  Comercial Managment
                </button>
              </li>
              <li>
                <button
                  type='button'
                  className={`btn mt-3 ${showDescription === 'project' ? 'active' : ''}`}
                  onClick={this.toggleManagment}
                  data-id='project'
                >
                  Project Managment
                </button>
              </li>
            </ul>
            <div className='col-8'>
              <h4 className='managment-headers'>{header}</h4>
              <div className='managment-description'>
                Largemouth bass Arctic char, salmon brook lamprey,
                delta smelt thorny catfish cardinalfish
                barbelless catfish Atlantic trout velvetfish char greenling
              </div>
            </div>
          </div>
        </div>
        <Slider className='card-deck mx-4 mb-4' {...settings}>
          {slidersElements.map((el,i) => {
            return (
              <div className='card' key={i}>
                <ReactSVG
                  src={el.image}
                  svgStyle={{ width: 100 }}
                  className='card-img-top text-center'
                  alt='...'
                  svgClassName='mt-2'
                />
                <div className='card-body text-center'>
                  <h5 className='card-title'>{el.title}</h5>
                  <p className='card-text'>Spearfish damselfish electric knifefish amago bobtail snipe eel?</p>
                  <a href='#' className='card-link'>Show example ></a>
                </div>
              </div>
            )
          })}
        </Slider>
      </section>
    )
  }
}

export default SamplesContents
