import React from 'react'
import { useSelector } from 'react-redux'
// import TextEditor from '../../elements/TextEditor'

function WhatIsIQoom() {
  const description = useSelector(({ landing }) => landing.whatISIQoom.description)
  const title = useSelector(({ landing }) => landing.whatISIQoom.title)

  return (
    <section id='what-is-card'>
      <div className='container'>
        {/*authed && editable ?
            (
              <React.Fragment>
                <TextEditor text={title} className='mb-5' />
                <TextEditor text={description} />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className='mb-5' dangerouslySetInnerHTML={{ __html: title }}></div>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </React.Fragment>
            )*/}
        <div className='what-is-card__title' dangerouslySetInnerHTML={{ __html: title }}></div>
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
    </section>
  )
}

export default WhatIsIQoom
