export const required = value => (value || typeof value === 'number' ? undefined : 'Required')

export const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined
)

export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more` : undefined)

export const minLength6 = value => (value && value.length < 6 ? 'Must be 6 characters or more' : undefined)
export const minLength2 = value => (value && value.length < 2 ? 'Must have at least 2 character' : undefined)
export const minLength3 = value => (value && value.length < 3 ? 'Must have at least 3 character' : undefined)
export const minLength4 = value => (value && value.length < 4 ? 'Must have at least 4 character' : undefined)

export const maxLength15 = value => (value && value.length > 15 ? 'Must be 15 characters or less' : undefined)
export const maxLength4 = value => (value && value.length > 4 ? 'Must be 4 characters' : undefined)
export const maxLength2 = value => (value && value.length > 2 ? 'Must be 2 characters' : undefined)
