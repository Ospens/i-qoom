import React, { Component } from 'react'
import LandingPageHeader from './LandingPageHeader'
import FirstCard from './FirstCard'
import SecondCard from './SecondCard'
import ThirdCard from './ThirdCard'
import FourthCard from './FourthCard'

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
        <SecondCard/>
        <ThirdCard/>
        <FourthCard/>
    </div>
    )
  }
}

export default LandingPage
