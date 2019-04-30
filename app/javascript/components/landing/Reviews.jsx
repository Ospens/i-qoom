import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactSVG from 'react-svg'
import Slider from 'react-slick'
import TextEditor from '../../elements/TextEditor'
import Arrows from '../../elements/Arrows'
import blueCheck from '../../images/blue_check.svg'
import star from '../../images/gold_star.svg'
import DropDownMenu from '../../elements/DropDownMenu'
import pencil from '../../images/pencil-write'
import trashBucket from '../../images/trash_bucket'
import direction_button from '../../images/direction-button-5'
import tmpAvatar from '../../images/tmp_avatar'
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

class Reviews extends Component {

  state = {
    readMore: false
  }

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

  renderAdminCard = (el, i) => (
    <div className='card text-left with-dropdown-menu' key={i}>
      <DropDownMenu options={options} />
      <div className='reviews-user-info row'>
        <img className='review-card-avatar' src={tmpAvatar} alt='' />
        <div className='clearfix' />
        <div className='user-name-block col-9'>
          <TextEditor text={<h6 className='user-name'>{el.name}</h6>} />
          <ReactSVG
            src={blueCheck}
            svgStyle={{ width: 15, height: 15 }}
            className='blue-check'
          />
          <TextEditor text={<div className='user-country text-muted'>{el.country}</div>} />
          <div className='user-stars'>{this.starsRender(el.stars)}
          </div>
        </div>
      </div>
      <div className='card-body'>
        <TextEditor text={<div className='review-title'>{el.title}</div>} />
        <TextEditor text={<p className='card-text'>{el.desription}</p>} />
      </div>
    </div>
  )

  renderCommonCard = (el, i) => (
    <div className='card text-left with-dropdown-menu' key={i}>
      <div className='reviews-user-info row'>
        <img className='review-card-avatar' src={tmpAvatar} alt='' />
        <div className='clearfix' />
        <div className='user-name-block col-9'>
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

  renderReviewsSlider = (reviews, newClassName = '') => {
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <Arrows type='nextBtn' />,
      prevArrow: <Arrows type='prevBtn' />
    }
    const { authed, isAdmin } = this.props
    let reviewsContent
    if (authed && isAdmin) {
      reviewsContent = (
        reviews.map((el, i) => {
          return this.renderAdminCard(el, i)
        })
      )
      reviewsContent.push(
        <div className='card text-left with-dropdown-menu' key='new'>
          <DropDownMenu options={options} />
          <div className='reviews-user-info row'>
            <img className='review-card-avatar' src={tmpAvatar} alt='' />
            <div className='clearfix' />
            <div className='user-name-block col-9'>
              <h6 className='user-name'>Name</h6>
              <ReactSVG
                src={blueCheck}
                svgStyle={{ width: 15, height: 15 }}
                className='blue-check'
              />
              <div className='user-country text-muted'>Place</div>
              <div className='user-stars'>{this.starsRender(5)}
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='review-title'>Title</div>
            <p className='card-text'>Text</p>
          </div>
        </div>
      )
    } else {
      reviewsContent = (
        reviews.map((el, i) => {
          return this.renderCommonCard(el, i)
        })
      )
    }

    return (
      <Slider className={`card-deck mx-4 mb-4 ${newClassName}`} {...settings}>
        {reviewsContent}
      </Slider>)
  }

  renderToggleButton = () => {
    const { readMore } = this.state
    if (readMore) {
      return (
        <button
        type='button'
        className='btn btn-primary mt-5'
        onClick={() => this.setState({ readMore: false })}>
          Hide
        </button>
        )
    } else {
      return (
        <button
          type='button'
          className='btn btn-primary mt-5'
          onClick={() => this.setState({ readMore: true })}>
            Read more
        </button>
      )

    }
  }

  render() {
    const { authed, isAdmin } = this.props
    const { readMore } = this.state
    const reviews = [
      {
        name: 'Humayra Samiha',
        country: 'California, USA',
        stars: 5,
        title: 'Crevice kelpfish',
        desription: 'Elephant fish channel bass pike characid perch nurse shark, North American darter sea bass sixgill shark.'
      },
      {
        name: 'Humayra Samiha',
        country: 'Hamburg, GER',
        stars: 5,
        title: 'Crevice kelpfish',
        desription: 'North American darter sea bass sixgill shark. Freshwater hatchetfish whale catfish riffle dace, salmon shark lookdown catfish, menhaden sixgill shark sprat.'
      },
      {
        name: 'Humayra Samiha',
        country: 'Stockhorm, SE',
        stars: 5,
        title: 'Freshwater hatchetfish',
        desription: 'North American darter sea bass sixgill shark; weasel shark yellowfin croaker'
      },
      {
        name: 'Humayra Samiha',
        country: 'Stockhorm, SE',
        stars: 5,
        title: 'Freshwater hatchetfish',
        desription: 'North American darter sea bass sixgill shark; weasel shark yellowfin croaker'
      },
      {
        name: 'Humayra Samiha',
        country: 'Hamburg, GER',
        stars: 5,
        title: 'Crevice kelpfish',
        desription: 'North American darter sea bass sixgill shark. Freshwater hatchetfish whale catfish riffle dace, salmon shark lookdown catfish, menhaden sixgill shark sprat.'
      }
    ]

    return (
      <section id='reviews-card'>
        <div className='text-center container'>
          {authed && isAdmin ?
            (
              <React.Fragment>
                <TextEditor text={<h2 className='block-header'>i-Qoom Reviews</h2>} />
                <TextEditor text={<p className='block-description'>Snubnose parasitic eel slimy mackerel pineconefish pearl perch, cornetfish grouper: marlin</p>} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2 className='block-header'>i-Qoom Reviews</h2>
                <p className='block-description'>Snubnose parasitic eel slimy mackerel pineconefish pearl perch, cornetfish grouper: marlin</p>
              </React.Fragment>
            )}
        </div>
        {this.renderReviewsSlider(reviews)}
        {readMore && this.renderReviewsSlider(reviews, 'new-slider')}
        {readMore && this.renderReviewsSlider(reviews, 'new-slider')}
        <div className='text-center container'>
          {this.renderToggleButton()}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  authed: auth.authStatus,
  isAdmin: true
})

export default connect(mapStateToProps)(Reviews)

