const initialState = {
  user_id: 'some_id',
  email: 'user',
  tariff: 'enterprise', // free, startup, developer, professional, enterprise
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
