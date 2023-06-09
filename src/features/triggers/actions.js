import { toast } from 'react-toastify'

import {
  getTriggersAPI,
  createTriggerAPI,
  updateTriggerAPI,
  deleteTriggerAPI,
} from '../../api/api'

export const TRIGGERS_START_FETCHING = 'triggers/fetch'
export const TRIGGERS_FETCH_SUCCESS = 'triggers/fetch_success'
export const TRIGGERS_FETCH_FAILURE = 'triggers/fetch_failure'
export const TRIGGER_ADDED = 'triggers/add'
export const TRIGGER_UPDATED = 'triggers/update'
export const TRIGGER_DELETED = 'triggers/delete'
export const TRIGGER_CREATION_FAILURE = 'triggers/creation_failure'
export const TRIGGER_CLEAR_CREATION_NOTIFICATION = 'triggers/clear_notification'

const triggersStartFetching = () => ({
  type: TRIGGERS_START_FETCHING,
  isFetching: true,
})

export const triggersFetchSuccess = (data) => ({
  type: TRIGGERS_FETCH_SUCCESS,
  data,
})

export const triggersFetchFailure = (payload) => ({
  type: TRIGGERS_FETCH_FAILURE,
  payload,
})

export const triggerAdded = (payload) => ({
  type: TRIGGER_ADDED,
  payload,
})

export const triggerUpdated = (payload) => ({
  type: TRIGGER_UPDATED,
  payload,
})

export const triggerDeleted = (triggerId) => ({
  type: TRIGGER_DELETED,
  payload: triggerId,
})

export const triggerCreationFailure = (error) => ({
  type: TRIGGER_CREATION_FAILURE,
  payload: error,
})

export const closeTriggerCreationNotification = () => ({
  type: TRIGGER_CLEAR_CREATION_NOTIFICATION,
})

export const fetchTriggers = () =>
  async function addTriggerThunk(dispatch, getState) {
    const state = getState()
    dispatch(triggersStartFetching())
    getTriggersAPI(state.auth.user.id)
      .then((response) => {
        dispatch(triggersFetchSuccess(response.data))
      })
      .catch((error) => {
        dispatch(triggersFetchFailure(error.message))
      })
  }

export const addTrigger = (data) =>
  async function addTriggerThunk(dispatch, getState) {
    const state = getState()
    createTriggerAPI(data, state.auth.user.id)
      .then((response) => {
        dispatch(triggerAdded(response.data))
      })
      .catch((error) => {
        dispatch(triggerCreationFailure(error.message))
        toast.error(`Error creating trigger: ${error.message}`)
      })
  }

export const editTrigger = (data) =>
  async function editTriggerThunk(dispatch, getState) {
    const state = getState()
    updateTriggerAPI(data, state.auth.user.id)
      .then(() => {
        dispatch(triggerUpdated(data))
        toast.success('Trigger was updated successfully')
      })
      .catch((error) => {
        toast.error(`Error updating trigger: ${error.message}`)
      })
  }

export const deleteTrigger = (triggerId) =>
  async function deleteTriggerThunk(dispatch, getState) {
    const state = getState()
    deleteTriggerAPI(triggerId, state.auth.user.id)
      .then(() => {
        dispatch(triggerDeleted(triggerId))
        toast.success('Trigger was deleted successfully')
      })
      .catch((error) => {
        toast.error(`Error deleting trigger: ${error.message}`)
      })
  }
