import React, { Component } from 'react'
import FirstCard from './FirstCard'
import WhatIsIQoom from './WhatIsIQoom'
import SamplesContents from './SamplesContents'
import Pricing from './Pricing'
import Reviews from './Reviews'
import GetStarted from './GetStarted'
import ExampleCard from './ExampleCard'

class MainContent extends Component {

  render() {
    const {
      showSignInSlider,
      showSignUp,
      showExamples,
      toggleExamples,
      toggleSignUp,
      toggleSignInForm,
      showMainPage
    } = this.props

    return (
      <div>
        <FirstCard
          showSignInSlider={showSignInSlider}
          showSignUp={showSignUp}
          toggleSignInForm={toggleSignInForm}
          showMainPage={showMainPage}
        />
        <WhatIsIQoom />
        {!showExamples && <SamplesContents toggleExamples={toggleExamples} />}
        {showExamples && <ExampleCard toggleExamples={toggleExamples} />}
        <Pricing toggleSignUp={toggleSignUp} />
        <Reviews />
        <GetStarted />
      </div>
    )
  }
}

export default MainContent
