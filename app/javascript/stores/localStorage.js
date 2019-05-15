export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('i-qoom')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('i-qoom', serializedState)
  } catch (err) {
    console.error('Error:', err)
  }
}
