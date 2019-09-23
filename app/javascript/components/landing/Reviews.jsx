import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import classnames from 'classnames'
import TextEditor from '../../elements/TextEditor'
import Arrows from '../../elements/Arrows'
import DropDown from '../../elements/DropDown'
import tmpAvatar from '../../images/tmp_avatar'

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

class Reviews extends Component {

  state = {
    readMore: false
  }

  starsRender = (count) => {
    let stars = []
    for (let i = 0; i < count; ++i) {
      stars.push(
        <div key={i} className='vote-stars mr-1'>
          <span className='icon-Rating' />
        </div>
      )
    }
    return stars
  }

  renderAdminCard = (el, i) => (
    <div className='card text-left with-dropdown-menu' key={i}>
      <DropDown
        dots={true}
        className='dropdown-with-icon'
        ulClass='left'
      >
        {options.map(({ title, icon }, i) => (
          <button type='button' className='dropdown-item btn' key={i}>
            <div>
              <span className={classnames('mr-2', icon)} />
            </div>
            <span className='item-text'>
              {title}
            </span>
          </button>
        ))}
      </DropDown>
      <div className='reviews-user-info row'>
        <img className='review-card-avatar' src={tmpAvatar} alt='' />
        <div className='clearfix' />
        <div className='user-name-block col-9'>
          <div className='row'>
            <TextEditor text={el.name} />
            <span className='rounded-blue-check-icon ml-2' />
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
      <div className='reviews-user-info'>
        <img className='review-card-avatar' src={el.photo || tmpAvatar} alt='' />
        <div className='user-name-block'>
          <div className='d-flex'>
            <div dangerouslySetInnerHTML={{ __html: el.name }} />
            <span className='icon-choose_2 ml-2'>
              <span className='path1'/>
              <span className='path2'/>
            </span>
            </div>
          <div className='user-name-block__country' dangerouslySetInnerHTML={{ __html: el.country}} />
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
    const cardCount = window.innerWidth > 1580
      ? 3
      : window.innerWidth > 768
        ? 2
        : 1
    const settings = {
      infinite: true,
      speed: 1000,
      slidesToShow: cardCount,
      slidesToScroll: 1,
      nextArrow: <Arrows type='nextBtn' />,
      prevArrow: <Arrows type='prevBtn' />
    }
    // const { authed, editable } = this.props
    /*if (authed && editable) {
      reviewsContent = (
        reviews.map((el, i) => {
          return this.renderAdminCard(el, i)
        })
      )
      reviewsContent.push(
        <div className='card text-left with-dropdown-menu' key='new'>
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
          <div className='reviews-user-info row'>
            <img className='review-card-avatar' src={tmpAvatar} alt='' />
            <div className='clearfix' />
            <div className='user-name-block col-9'>
              <h6 className='user-name'>Name</h6>
              <span className='rounded-blue-check-icon ml-2' />
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
    }*/

    const reviewsContent = reviews.map((el, i) => this.renderCommonCard(el, i))

    return (
      <Slider className={`card-deck ${newClassName}`} {...settings}>
        {reviewsContent}
      </Slider>)
  }

  renderToggleButton = () => {
    const { readMore } = this.state
    return (
      <button
        type='button'
        className='btn btn-primary mx-auto'
        onClick={() => this.setState({ readMore: !readMore })}>
        {readMore ? 'Hide' : 'Read more'}
      </button>
    )
  }

  render() {
    const { authed, editable, description, cards } = this.props
    const { readMore } = this.state

    return (
      <section id='reviews-card'>
        <div className='container'>
          {/*authed && editable ?
            (
              <TextEditor text={description} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            )*/}
          <div className='reviews-card__title' dangerouslySetInnerHTML={{ __html: description }} />
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

