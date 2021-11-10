import React from 'react'

import axios from 'axios'
import { getIndexURL } from './index'

export const getTriggers = (userId) => {
  /** Get a list of triggers  */

  const url = `${getIndexURL}?user_id=${userId}`
  return axios.get(url, { timeout: 15000 })
}
