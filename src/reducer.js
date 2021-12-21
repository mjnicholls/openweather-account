import { combineReducers } from 'redux'

import authReducer from './features/auth/reducer'
import notificationsReducer from './features/notifications/reducer'
import triggersReducer from './features/triggers/reducer'

const appReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  triggers: triggersReducer,
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
