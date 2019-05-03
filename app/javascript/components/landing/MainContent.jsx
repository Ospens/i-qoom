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
      showMainPage,
      editable
    } = this.props

    return (
      <div>
        <FirstCard
          showSignInSlider={showSignInSlider}
          showSignUp={showSignUp}
          toggleSignInForm={toggleSignInForm}
          showMainPage={showMainPage}
          editable={editable}
        />
        <WhatIsIQoom editable={editable}/>
        {!showExamples && <SamplesContents toggleExamples={toggleExamples} editable={editable}/>}
        {showExamples && <ExampleCard toggleExamples={toggleExamples} editable={editable}/>}
        <Pricing toggleSignUp={toggleSignUp} editable={editable}/>
        <Reviews editable={editable}/>
        <GetStarted editable={editable}/>
      </div>
    )
  }
}

export default MainContent
