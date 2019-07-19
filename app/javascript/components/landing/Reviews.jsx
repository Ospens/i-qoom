import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import TextEditor from '../../elements/TextEditor'
import Arrows from '../../elements/Arrows'
import DropDownMenu from '../../elements/DropDownMenu'
import pencil from '../../images/pencil-write'
import trashBucket from '../../images/trash_bucket'
import direction_button from '../../images/direction-button-5'
import tmpAvatar from '../../images/tmp_avatar'

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
          <i className='svg-icon star-icon' />
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
        <div className='row'>
          <TextEditor text={el.name} />
          <i className='svg-icon rounded-blue-check-icon ml-2' />
        </div>
          <TextEditor text={el.country} />
          <div className='user-stars'>{this.starsRender(el.stars)}
          </div>
        </div>
      </div>
      <div className='card-body'>
        <TextEditor text={el.desription} />
      </div>
    </div>
  )

  renderCommonCard = (el, i) => (
    <div className='card text-left with-dropdown-menu' key={i}>
      <div className='reviews-user-info row'>
        <img className='review-card-avatar' src={tmpAvatar} alt='' />
        <div className='clearfix' />
        <div className='user-name-block col-9'>
          <div className='row'>
            <div dangerouslySetInnerHTML={{ __html: el.name }} />
              <i className='svg-icon rounded-blue-check-icon ml-2' />
            </div>
          <div dangerouslySetInnerHTML={{ __html: el.country}} />
          <div className='user-stars'>{this.starsRender(el.stars)}
          </div>
        </div>
      </div>
      <div className='card-body'>
        <div dangerouslySetInnerHTML={{ __html: el.desription }} />
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
    const { authed, editable } = this.props
    let reviewsContent
    if (authed && editable) {
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
              <i className='svg-icon rounded-blue-check-icon ml-2' />
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
    const { authed, editable, description, cards } = this.props
    const { readMore } = this.state
 
    return (
      <section id='reviews-card'>
        <div className='container'>
          {authed && editable ?
            (
              <TextEditor text={description} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )}
        </div>
        {this.renderReviewsSlider(cards)}
        {readMore && this.renderReviewsSlider(cards, 'new-slider')}
        {readMore && this.renderReviewsSlider(cards, 'new-slider')}
        <div className='text-center container'>
          {this.renderToggleButton()}
        </div>
      </section>
    )
  }
}

const mapStateToProps = ({ user, landing }) => ({
  authed: user.authStatus,
  description: landing.reviews.description,
  cards: landing.reviews.cards,
})

export default connect(mapStateToProps)(Reviews)

