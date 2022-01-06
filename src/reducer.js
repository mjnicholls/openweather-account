import { combineReducers } from 'redux'

import authReducer from './features/auth/reducer'
import triggersReducer from './features/triggers/reducer'

const appReducer = combineReducers({
  auth: authReducer,
  triggers: triggersReducer,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
