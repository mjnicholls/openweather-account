/*
const initialState = {
  user_id: 'some_id',
  email: 'user',
  tariff: 'enterprise', // free, startup, developer, professional, enterprise
  user: {
    email: "dev@openweathermap.org",
    id: "5eda321ad",
    tariff: "dev",
    tariff_full: "Developer",
    username: "dev@openweathermap.org"

  },
  limits: {
    email_recipients: true,
    max_triggers: 10
  }
}
*/

const initialState = {
  user: {
    email: 'dev@openweathermap.org',
    id: 'some_id',
    tariff: 'dev',
    tariff_full: 'Developer',
    username: 'dev@openweathermap.org',
  },
  limits: {
    email_recipients: true,
    // max_email_recipients: 10,
    max_triggers: 3,
  },
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
