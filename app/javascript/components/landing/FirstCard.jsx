import React from 'react'
import { useSelector } from 'react-redux'

function WelcomeText({ firstLine, secondLine }) {
  return (
    <div className='welocme-text'>
      {/*authed && editable ?
        (
          <React.Fragment>
            <TextEditor text={firstLine} />
            <TextEditor text={secondLine} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div dangerouslySetInnerHTML={{__html: firstLine}} />
            <div dangerouslySetInnerHTML={{ __html: secondLine}} />
          </React.Fragment>
        )*/}
      <div dangerouslySetInnerHTML={{ __html: firstLine }} />
      <div dangerouslySetInnerHTML={{ __html: secondLine }} />
      <a href='#get-started-card' className='btn btn-light contact-us'>Contact us</a>
    </div>
  )
}

function FirstCard() {
  const firstLine = useSelector(({ landing }) => landing.firstCard.firstLine)
  const secondLine = useSelector(({ landing }) => landing.firstCard.secondLine)

  return (
    <section id='first-card'>
      <div className='container'>
        <div className='welcome-and-signin justify-content-center'>
          <WelcomeText firstLine={firstLine} secondLine={secondLine} />
        </div>
      </div>
    </section>
  )
}

export default FirstCard
