import React, { useState, useEffect } from 'react'

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedValue(value) }, delay)

    return () => { clearTimeout(handler) }
  }, [value])

  return debouncedValue
}

export function debounce(func, wait, immediate) {
  let timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
