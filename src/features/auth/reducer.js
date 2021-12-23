let initialState = {
  user: {
    email: 'dev@openweathermap.org',
    id: 'anna1',
    tariff: 'dev',
    tariff_full: 'Developer',
    username: 'dev@openweathermap.org',
  },
  limits: {
    email_recipients: true,
    // max_email_recipients: 10,
    max_triggers: 20,
  },
}

const gonObject = window.gon
console.log('gonObject', gonObject)

if (gonObject && Object.keys(gonObject).length) {
  initialState = gonObject
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
