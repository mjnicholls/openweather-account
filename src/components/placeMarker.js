import React from 'react'

const MarkerSingleton = (() => {
  let instance

  function MarkerClass(position, map) {
    // eslint-disable-next-line
    return new google.maps.Marker({
      position,
      map,
    })
  }

  return {
    getInstance: (position, map) => {
      if (!instance) {
        instance = new MarkerClass(position, map)
        // Hide the constructor so the returned object can't be new'd...
        instance.constructor = null
      } else {
        instance.setPosition(position)
      }
      return instance
    },
  }
})()


const placeMarker = (position, map) => {
  MarkerSingleton.getInstance(position, map)
  map.panTo(position)
}

export default placeMarker
