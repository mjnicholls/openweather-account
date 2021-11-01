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

const getContentString = (name, lat, lng) =>
  `<div class="mapPop">
    <h5>${name || 'Custom location'}</h5>
    <hr/>
    <div class="main">
      <div>
        <p><b>Latitude:</b> ${lat} </p>
        <p><b>Longitude:</b> ${lng}</p>
      </div>
      <div class="body">
        <button click="addMarker">
          Add location
        </button>
      </div>
    </div> 
  </div>`

const placeMarker = (position, map, name) => {
  const marker = MarkerSingleton.getInstance(position, map)

  const contentString = getContentString(
    name,
    position.lat().toFixed(6),
    position.lng().toFixed(6),
  )

  /* eslint-disable-next-line */
  const infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position,
  })

  infoWindow.open({
    anchor: marker,
    map,
    shouldFocus: false,
  })

  map.panTo(position)
}

export default placeMarker
