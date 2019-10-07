export const required = value => (value || typeof value === 'number' ? undefined : 'Required')

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
)

export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined)

export const maxLength15 = value => (value && value.length > 15 ? 'Must be 15 characters or less' : undefined)

export const lessThan9999 = value => (value && value > 9999 ? 'Must be less then 9999' : undefined)
