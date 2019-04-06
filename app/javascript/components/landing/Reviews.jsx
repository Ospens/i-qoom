import React, { Component } from 'react'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
import comm from '../../images/comm.svg'
import Arrows from '../../elements/Arrows'
import blueCheck from '../../images/blue_check.svg'
import star from '../../images/gold_star.svg'

class Reviews extends Component {

  starsRender = (count) => {
    let stars = []
    for (let i = 0; i < count; ++i) {
      stars.push(
        <div key={i} className='vote-stars'>
          <ReactSVG
            src={star}
            svgStyle={{ width: 10, height: 10 }}
          />
        </div>
      )
    }
    return stars
  }

  render() {
    const reviews = [
      {
        name: 'Humayra Samiha',
        country: 'California, USA',
        image: comm,
        stars: 5,
        title: 'Crevice kelpfish',
        desription: 'Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      },
      {
        name: 'Humayra Samiha',
        country: 'Hamburg, GER',
        image: comm,
        stars: 5,
        title: 'Crevice kelpfish',
        desription: 'North American darter sea bass sixgill shark. Freshwater hatchetfish whale catfish riffle dace, salmon shark lookdown catfish, menhaden sixgill shark sprat.'
      },
      {
        name: 'Humayra Samiha',
        country: 'Stockhorm, SE',
        image: comm,
        stars: 5,
        title: 'Freshwater hatchetfish',
        desription: 'North American darter sea bass sixgill shark; weasel shark yellowfin croaker'
      },
      {
        name: 'Humayra Samiha',
        country: 'Stockhorm, SE',
        image: comm,
        stars: 5,
        title: 'Freshwater hatchetfish',
        desription: 'North American darter sea bass sixgill shark; weasel shark yellowfin croaker'
      },
      {
        name: 'Humayra Samiha',
        country: 'Hamburg, GER',
        image: comm,
        stars: 5,
        title: 'Crevice kelpfish',
        desription: 'North American darter sea bass sixgill shark. Freshwater hatchetfish whale catfish riffle dace, salmon shark lookdown catfish, menhaden sixgill shark sprat.'
      }
    ]

    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      centerMode: true,
      slidesToScroll: 1,
      nextArrow: <Arrows type='nextBtn' />,
      prevArrow: <Arrows type='prevBtn' />
    }

    return (
      <section id='fifth-card'>
        <div className='text-center container'>
          <h2 className='block-header'>i-Qoom Reviews</h2>
          <p className='block-description'>Snubnose parasitic eel slimy mackerel pineconefish pearl perch, cornetfish grouper: marlin</p>
        </div>
        <Slider className='card-deck mx-4 mb-4' {...settings}>
          {reviews.map((el, i) => {
            return (
              <div className='card text-left' key={i}>
                <div className='user-info row'>
                  <ReactSVG
                    src={el.image}
                    svgStyle={{ width: '100%', height: '100%' }}
                    className='col-4'
                    svgClassName='mt-2'
                  />
                  <div className='clearfix' />
                  <div className='user-name-block col-8'>
                    <h6 className='user-name'>{el.name}</h6>
                    <ReactSVG
                      src={blueCheck}
                      svgStyle={{ width: 15, height: 15 }}
                      className='blue-check'
                    />
                    <div className='user-country text-muted'>{el.country}</div>
                    <div className='user-stars'>{this.starsRender(el.stars)}
                    </div>
                  </div>
                </div>
                <div className='card-body'>
                  <div className='review-title'>{el.title}</div>
                  <p className='card-text'>{el.desription}</p>
                </div>
              </div>
            )
          })}
        </Slider>
        <div className='text-center container'>
          <button type='button' className='btn btn-primary mt-5'>Read more</button>
        </div>
      </section>
    )
  }
}

export default Reviews
