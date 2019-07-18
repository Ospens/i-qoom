/* export const loadState = () => {
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
*/

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('i-qoom-user')
    if (serializedState === null) { return {} }

    const userState = JSON.parse(serializedState)
    const currentDate = new Date()
    const isActive = new Date(Number(userState.exp) * 1000) >= currentDate
    if (isActive) {
      return { user: userState }
    }
    return {}
  } catch (err) {
    return {}
  }
}

export default loadState
