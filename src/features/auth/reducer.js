const initialState = {
  user_id: 1,
  email: 'user',
  tariff: 'free'  // free, startup, developer, professional, enterprise
}



export default function authReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}
