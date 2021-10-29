/* eslint-disable-next-line */
var newMarker;

// TODO position to lat, lon
export const placeMarker = (position, map, name) => {
  // eslint-disable-next-line
  name = name || 'Custom location'
  const myLatlng = { lat: position.lat(), lng: position.lng() }

  // eslint-disable-next-line
  console.log("** ", map)

  if (!newMarker) {
    /* eslint-disable-next-line */
    newMarker = new google.maps.Marker({
      position,
      map,
      lat: myLatlng.lat,
      lon: myLatlng.lng,
    })
  } else {
    newMarker.setPosition(position);
  }

  const contentString = `<div class="mapPop">
    <h5>${name}</h5>
    <hr/>

    <div class="main">

    <div>
 <p>
      <b>Latitude:</b> ${myLatlng.lat.toFixed(
        6,
      )} </p>
      <p>
      <b>Longitude:</b> ${myLatlng.lng.toFixed(
        6,
      )} </p>

      </div>

      <div 
      class="body">

    <button click="addMarker">
      Add location
    </button>
    </div>
  </div>
 
    </div>`

  /* eslint-disable-next-line */
  var infoWindow = new google.maps.InfoWindow({
    content: contentString,
    position,
  })

  infoWindow.open({
    anchor: newMarker,
    map,
    shouldFocus: false,
  })

  map.panTo(position)
}