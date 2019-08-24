import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../actions/projectActions'
import { Route } from 'react-router-dom'

function Page({ title, ...props }) {

  const dispatch = useDispatch()

  useEffect(() => {
    document.title = title
    dispatch(setPageTitle(title))
  }, [dispatch, title])

  return (
    <Route {...props} />
  )
}

export default Page
