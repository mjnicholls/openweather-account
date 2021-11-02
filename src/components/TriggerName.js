import React, { useEffect, useState } from 'react'

const TriggerName = ({ location, name, setName }) => {
  const [isNameEdited, setIsNameEdited] = useState(false)

  const onNameChange = (e) => {
    setIsNameEdited(true)
    setName(e.target.value)
  }

  useEffect(() => {
    if (!isNameEdited && location.lat && location.lon) {
      const newName = `${location.name} (${location.lat.toFixed(
        2,
      )}, ${location.lon.toFixed(2)})`
      setName(newName)
    }
  }, [location, isNameEdited])

  return <input value={name} onChange={onNameChange} />
}

export default TriggerName
