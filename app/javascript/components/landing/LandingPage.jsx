import React, { Component } from 'react'
import LandingPageHeader from './LandingPageHeader'
import FirstCard from './FirstCard'
import WhatIsIQoom from './WhatIsIQoom'
import SamplesContents from './SamplesContents'
import Pricing from './Pricing'
import Reviews from './Reviews'
import GetStarted from './GetStarted'
import Footer from './Footer'
import ExampleCard from './ExampleCard'

class LandingPage extends Component {

  state = {
    showSignInSlider: false,
    showSignUp: false,
    showExamples: false
  }

  toggleSignInSlider = () => {
    const { showSignInSlider } = this.state
    this.setState({
      showSignInSlider: !showSignInSlider,
      showSignUp: false
    })
  }

  toggleSignUp = () => {
    const { showSignUp } = this.state
    this.setState({
      showSignUp: !showSignUp,
      showSignInSlider: false
    })
  }

  showMainPage = () => {
    this.setState({
      showSignUp: false,
      showSignInSlider: false
    })
  }

  toggleExamples = () => {
    const { showExamples } = this.state
    this.setState({
      showExamples: !showExamples,
    })
  }

  render() {
    const { showSignInSlider, showSignUp, showExamples } = this.state
    return (
    <div className='landing-page'>
        <LandingPageHeader
          showSignInSlider={showSignInSlider}
          showSignUp={showSignUp}
          showMainPage={this.showMainPage}
          toggleSignInForm={this.toggleSignInSlider}
          toggleSignUp={this.toggleSignUp}
        />
        <FirstCard
          showSignInSlider={showSignInSlider}
          showSignUp={showSignUp}
          toggleSignInForm={this.toggleSignInSlider}
          showMainPage={this.showMainPage}
        />
        <WhatIsIQoom />
        {!showExamples && <SamplesContents toggleExamples={this.toggleExamples} />}
        {showExamples && <ExampleCard toggleExamples={this.toggleExamples} />}
        <Pricing toggleSignUp={this.toggleSignUp}/>
        <Reviews />
        <GetStarted />
        <Footer />
    </div>
    )
  }
}

export default LandingPage
