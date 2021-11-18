import { combineReducers } from 'redux'

import authReducer from './features/auth/reducer'

const initialState = {
  user_id: 'some_id',
  email: 'user',
}

const appReducer = combineReducers({
  auth: authReducer,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
