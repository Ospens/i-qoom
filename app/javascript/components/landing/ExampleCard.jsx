import React from 'react'
import Slider from 'react-slick'
import Arrows from '../../elements/Arrows'
import img1 from '../../images/tmpScreen.png'
import img2 from '../../images/tmpScreen2.png'
import img3 from '../../images/tmpScreen3.png'

const imagesSrc = [
  img1,
  img2,
  img3,
  img2,
]

const settings = {
  customPaging: i => <a><img src={imagesSrc[i]} /></a>,
  dots: true,
  dotsClass: 'slick-dots slick-thumb',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <Arrows type='right' />,
  prevArrow: <Arrows type='left' />
}

function ExampleCard({ toggleExamples }) {
  return (
    <section id='example-card'>
      <h2 className='block-header'>Example documents</h2>
      <Slider {...settings}>
        {imagesSrc.map((el, i) => {
          return (
            <div key={i}>
              <img src={el} />
            </div>
          )
        })}
      </Slider>
      <button type='button' className='btn btn-back' onClick={toggleExamples}>
        <span className='icon-arrow-button-left' />
        Back
        </button>
    </section>
  )
}

export default ExampleCard
