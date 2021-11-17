/* eslint-disable */

export const validateEmail = (email) => {
  /* email: string */
  // const re = /\S+@\S+\.\S+/
  const re = /^([^@\s]+)@((?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,})$/
  return re.test(email)
}
