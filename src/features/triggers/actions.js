import { toast } from 'react-toastify'

import {
  getTriggersAPI,
  createTriggerAPI,
  updateTriggerAPI,
  deleteTriggerAPI,
} from '../../api/api'
import { notifyError, notifySuccess } from '../notifications/actions'

export const TRIGGERS_START_FETCHING = 'triggers/fetch'
export const TRIGGERS_FETCH_SUCCESS = 'triggers/fetch_success'
export const TRIGGERS_FETCH_FAILURE = 'triggers/fetch_failure'
export const TRIGGER_ADDED = 'triggers/add'
export const TRIGGER_UPDATED = 'triggers/update'
export const TRIGGER_DELETED = 'triggers/delete'

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

export const fetchTriggers = () =>
  async function addTriggerThunk(dispatch, getState) {
    const state = getState()
    getTriggersAPI(state.auth.user.id)
      .then((response) => {
        dispatch(triggersFetchSuccess(response.data))
      })
      .catch((error) => {
        dispatch(notifyError(error.message))
      })
  }

export const addTrigger = (data) =>
  async function addTriggerThunk(dispatch, getState) {
    const state = getState()
    createTriggerAPI(data, state.auth.user.id)
      .then((response) => {
        dispatch(triggerAdded(response))
        dispatch(notifySuccess('Trigger created! '))
      })
      .catch((error) => {
        dispatch(notifyError(`Error creating trigger: ${error.message}`))
      })
  }

export const editTrigger = (data) =>
  async function editTriggerThunk(dispatch, getState) {
    const state = getState()
    updateTriggerAPI(data, state.auth.user.id)
      .then(() => {
        dispatch(triggerUpdated(data))
        toast.success('Trigger was updated successfully')
        // dispatch(notifySuccess('Trigger was updated successfully'))
      })
      .catch((error) => {
        // dispatch(notifyError(`Error updating trigger: ${error.message}`))
      })
  }

export const deleteTrigger = (triggerId) =>
  async function deleteTriggerThunk(dispatch, getState) {
    const state = getState()
    deleteTriggerAPI(triggerId, state.auth.user.id)
      .then(() => {
        dispatch(triggerDeleted(triggerId))
        // dispatch(notifySuccess('Trigger was deleted successfully'))
        toast.success('Trigger was deleted successfully')
      })
      .catch((error) => {
        // dispatch(notifyError(`Error deleting trigger: ${error.message}`))
        toast.error(`Error deleting trigger: ${error.message}`)
      })
  }
