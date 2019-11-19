import React from 'react'
import avatar from '../../images/tmp_avatar'
import UserAvatar from 'react-user-avatar'

function UserProfile() {
  return (
    <div className='user-profile'>
      <div className='d-flex mb-5 align-items-center'>
        <h2>Profile</h2>
        <a href='#' className='ml-auto blue-link'>Log into profile</a>
      </div>
      <div className='d-flex flex-row'>
        <div className='bd-highlight col-lg-2 user-column pr-5'>
          <div className='user-info-avatar avatar-block'>
            <img className='image-avatar mb-4' src={avatar} alt='' />
            <UserAvatar size='42' name='Anna Danielsson' />
          </div>
          <div className='main-user-info'>
            <span className='user-name mb-3'>Casillas de la Chao</span>
            <div className='user-position'>
              <span className='user-position-name'>Facility manager</span>
              <span className='user-position-place'>Humburg (GER)</span>
            </div>
          </div>
          <div className='contact-info'>
            <h6>Contact information</h6>
            <div className='info-block'>
              <span className='block-name'>Email(s)</span>
              <a href='#' className='blue-link'>firstemail@mail.zxc</a>
              <a href='#' className='blue-link'>secondemail@mail.zxc</a>
            </div>
            <div className='info-block'>
              <span className='block-name'>i-Qoom-ID</span>
              <a href='#' className='blue-link'>ABDCE12345</a>
            </div>
            <div className='info-block'>
              <span className='block-name'>Phone</span>
              <span>0123-4567-8901-2345</span>
            </div>
          </div>
        </div>
        <div className='bd-highlight col-lg-10 pl-5'>
          <h5>Basic information</h5>
          <div className='d-flex flex-row'>
            <div className='col-4 px-0'>
              <div className='info-block'>
                <span className='block-name'>Address</span>
                <span>Streetnumber123</span>
              </div>
              <div className='info-block'>
                <span className='block-name'>Member since</span>
                <span>01.01.2020</span>
              </div>
            </div>
            <div className='col-4 px-0'>
              <div className='info-block'>
                <span className='block-name'>City</span>
                <span>Humburg (GER)</span>
              </div>
            </div>
            <div className='col-4 px-0'>
              <div className='info-block'>
                <span className='block-name'>ZIP-code</span>
                <span>123987</span>
              </div>
            </div>
          </div>
          <div className='bio-row'>
            <h5>Bio</h5>
            <p>
              Praesent non mattis ante. Donec lobortis eu est ut porttitor.
              Nunc condimentum fringilla odio, ac sollicitudin eros volutpat at.
              Donec efficitur efficitur lacus, at aliquam nunc dictum vitae.
              Praesent eu viverra est, vel consequat quam. Nam ut eleifend lectus.
              Duis nec libero ullamcorper, tincidunt ipsum commodo, accumsan urna.
              In lobortis felis quis eros hendrerit bibendum. Donec a tempus lacus.
              Aliquam dictum, odio a condimentum dignissim, felis nisi bibendum mauris,
              id maximus dui enim porttitor est. Nam in sem id purus imperdiet aliquam.
              </p>
          </div>
          <div className='row row-projects'>
            {[...Array(3)].map((e, i) => (
              <div className='col-sm-4' key={i}>
                <div className='project-card blank'>
                  <label>Project {i + 1}:</label>
                  <span>MWP - Munster-windpark</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
