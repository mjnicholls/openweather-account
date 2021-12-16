import React from 'react'

import BeatLoader from 'react-spinners/BeatLoader'

const BeatLoaderComponent = () => (
  <div className="loader-container">
    <p>Fetching...</p>
    <BeatLoader color="#EB6E4B" size={15} />
  </div>
)

export default BeatLoaderComponent
