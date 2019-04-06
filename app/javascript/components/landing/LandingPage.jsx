import React, { Component } from 'react'
import LandingPageHeader from './LandingPageHeader'
import FirstCard from './FirstCard'
import WhatIsIQoom from './WhatIsIQoom'
import SamplesContents from './SamplesContents'
import Pricing from './Pricing'
import Reviews from './Reviews'
import GetStarted from './GetStarted'
import Footer from './Footer'

class LandingPage extends Component {

  state = {
    showSignInSlidSecondCarder: false
  }

  toggleSignInSlider = () => {
    const { showSignInSlider } = this.state
    this.setState({ showSignInSlider: !showSignInSlider })
  }

  render() {
    const { showSignInSlider } = this.state
    return (
    <div className='landing-page'>
        <LandingPageHeader
          showSignInSlider={showSignInSlider}
          toggleSignInForm={this.toggleSignInSlider}
        />
        <FirstCard showSignInSlider={showSignInSlider} toggleSignInForm={this.toggleSignInSlider}/>
        <WhatIsIQoom />
        <SamplesContents />
        <Pricing />
        <Reviews />
        <GetStarted />
        <Footer />
    </div>
    )
  }
}

export default LandingPage
