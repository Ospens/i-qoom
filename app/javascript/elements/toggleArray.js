const toggleArray = (checked, value) => {
  let newVal = []
  newVal = newVal.concat(checked)
  const index = newVal.indexOf(value)

  if (index > -1) {
    newVal.splice(index, 1)
  } else {
    newVal.splice(index, 0, value)
  }
  return newVal
}

export default toggleArray
