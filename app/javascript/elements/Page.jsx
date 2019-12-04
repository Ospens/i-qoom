import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import { setPageTitle } from '../actions/projectActions'

function Page({ title, titleContent, ...props }) {
  const dispatch = useDispatch()
  useEffect(() => {
    if (!title) return

    document.title = title
    dispatch(setPageTitle(titleContent || <h2>{title}</h2>))
  }, [dispatch, title, titleContent])

  return (
    <Route {...props} />
  )
}

export default Page
