/* eslint-disable */
import React, { useState } from 'react'

import AutoCompleteFormNew from './AutoCompleteFormNew'

const SearchBoxNew = ({
  mapRef,
  location,
  setLocation,
  error,
  name,
  setName,
  isName,
  setIsName,
  isSet,
  setIsSet,
}) => {
  const [activeTab, setActiveTab] = useState('location')

  return (
    <div>
      {activeTab ? (
        <AutoCompleteFormNew
          mapRef={mapRef}
          setLocation={setLocation}
          error={error}
          location={location}
          setIsName={setIsName}
          isName={isName}
          name={name}
          setName={setName}
          isSet={isSet}
          setIsSet={setIsSet}
        />
      ) : null}
    </div>
  )
}

export default SearchBoxNew
