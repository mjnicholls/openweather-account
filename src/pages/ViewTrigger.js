import React from 'react'

const ViewTrigger = (props) => {

  const data = {
      id: 1,
      condition: {
        condition: '>',
        units: 'metric',
        value: 20,
        variable: 'temp',
      },
      days: 3,
      name: 'Trigger 1',
      recipients: ['email1', 'email2', 'email3'],
      status: false,
      location: {
        name: 'Paris',
        lat: 40.4,
        lon: 28.8,
      },
      user_id: 1,
    }

  const {condition, days, id, location, name, recipients, status} = data

}

export default ViewTrigger