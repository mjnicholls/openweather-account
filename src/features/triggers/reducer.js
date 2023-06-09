import {
  TRIGGERS_START_FETCHING,
  TRIGGERS_FETCH_SUCCESS,
  TRIGGERS_FETCH_FAILURE,
  TRIGGER_ADDED,
  TRIGGER_UPDATED,
  TRIGGER_DELETED,
  TRIGGER_CREATION_FAILURE,
  TRIGGER_CLEAR_CREATION_NOTIFICATION,
} from './actions'

const initialState = {
  isFetching: true,
  error: null,
  data: [],
  triggerCreationSuccess: null,
  triggerCreationError: null,
}

export default function polygonsReducer(state = initialState, action) {
  switch (action.type) {
    case TRIGGERS_START_FETCHING: {
      return { ...state, isFetching: true, error: null, data: [] }
    }
    case TRIGGERS_FETCH_SUCCESS: {
      return { ...state, isFetching: false, error: null, data: action.data }
    }
    case TRIGGERS_FETCH_FAILURE: {
      return { ...state, isFetching: false, error: action.payload, data: [] }
    }
    case TRIGGER_ADDED: {
      return {
        ...state,
        data: [...state.data, action.payload],
        triggerCreationSuccess: action.payload,
      }
    }
    case TRIGGER_CREATION_FAILURE: {
      return {
        ...state,
        triggerCreationError: action.payload,
      }
    }
    case TRIGGER_CLEAR_CREATION_NOTIFICATION: {
      return {
        ...state,
        triggerCreationSuccess: null,
        triggerCreationError: null,
      }
    }
    case TRIGGER_UPDATED: {
      const updatedTriggers = state.data.map((item) => {
        if (item.id !== action.payload.id) {
          return item
        }
        return {
          ...item,
          ...action.payload,
        }
      })
      return {
        ...state,
        data: updatedTriggers,
      }
    }
    case TRIGGER_DELETED: {
      const updatedTriggers = state.data.filter(
        (obj) => obj.id !== action.payload,
      )
      return {
        ...state,
        data: updatedTriggers,
      }
    }
    default:
      return state
  }
}
