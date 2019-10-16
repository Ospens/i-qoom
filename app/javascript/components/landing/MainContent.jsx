import React from 'react'
import { withRouter } from 'react-router-dom'
import FirstCard from './FirstCard'
import WhatIsIQoom from './WhatIsIQoom'
import SamplesContents from './SamplesContents'
import Pricing from './Pricing'
import Reviews from './Reviews'
import GetStarted from './GetStarted'
import ExampleCard from './ExampleCard'

function MainContent({ showExamples, toggleExamples, editable, ...props }) {

  return (
    <React.Fragment>
      <FirstCard editable={editable} />
      <WhatIsIQoom editable={editable} />
      {!showExamples && <SamplesContents toggleExamples={toggleExamples} editable={editable} />}
      {showExamples && <ExampleCard toggleExamples={toggleExamples} editable={editable} />}
      <Pricing editable={editable} />
      <Reviews editable={editable} />
      <GetStarted editable={editable} />
    </React.Fragment>
  )
}

export default withRouter(MainContent)
