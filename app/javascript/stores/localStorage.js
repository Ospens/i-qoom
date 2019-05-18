export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('i-qoom')
    if (serializedState === null) {
      return {}
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return {}
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
