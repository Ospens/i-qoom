import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../actions/projectActions'
import { Route } from 'react-router-dom'

function Page({ title, titleContent, ...props }) {

  const dispatch = useDispatch()

  useEffect(() => {
    document.title = title
    dispatch(setPageTitle(titleContent || <h2>{title}</h2>))
  }, [dispatch, title, titleContent])

  return (
    <Route {...props} />
  )
}

export default Page
