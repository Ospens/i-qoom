import React, { useEffect } from 'react'
import TextEditor from '../../elements/TextEditor'
import { useSelector } from 'react-redux'

function Terms({ editable }) {
  const authed = useSelector(({ user }) => user.authStatus)
  const content = useSelector(({ landing }) => landing.terms.content)
  
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div>
      <section className='container info-container'>
        <div className='text-center'>
          {authed && editable
            ? <TextEditor text={content} /> 
            : <div dangerouslySetInnerHTML={{ __html: content }} />}
        </div>
      </section>
    </div>
  )
}

export default Terms
