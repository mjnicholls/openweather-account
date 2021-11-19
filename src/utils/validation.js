export const validateEmail = (email) => {
  const re = /^([^@\s]+)@((?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,})$/
  return re.test(email)
}
