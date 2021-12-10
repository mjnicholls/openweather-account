/*eslint-disable*/
import React, { useState } from 'react'
import '../App.scss'
import classnames from 'classnames/index'
import PropTypes from 'prop-types'
import Autocomplete from 'react-google-autocomplete'
import { Col, Row, FormGroup } from 'reactstrap'
import placeMarker from './placeMarker'

const AutoCompleteForm = ({
  mapRef,
  location,
  setLocation,
  error,
  name,
  setIsSet,
}) => {
  const onPlaceSelected = (place) => {
    if (mapRef && mapRef.current) {
      setLocation({
        name: place.formatted_address,
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
      })
      placeMarker(
        place.geometry.location,
        // eslint-disable-next-line
        mapRef.current.map_,
      )
    }
  }

  const [hmm, setHmm] = useState(false)

  /*
   
   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log('do validate');
        setHmm({
          name: 'London',
        })
      }
    }

    */

  /*
  const onKeyDown = (e) => {
    if (e.key === 13) { 
           setLocation({
        name: 'London'
      })
    }
  }
  */

  return (
    <div>
      <Row className="mt-3">
        <Col className="mb-2">
          <h6>Search location by name</h6>
          <FormGroup>
            {!hmm ? (
              <Autocomplete
                apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
                className={error.location ? 'danger-border' : ''}
                style={{ width: '100%', marginTop: '7px' }}
                onPlaceSelected={(place) => {
                  onPlaceSelected(place)
                  setIsSet(true)
                }}
                options={{
                  types: ['(regions)'],
                }}
                onChange={(e) => {
                  //    setLocation({ ...location, name: e.target.value })
                  setLocation({ name: e.target.value })
                }}
                value={location.name}
                /* eslint-disable-next-line */
              />
            ) : (
              <Autocomplete
                apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
                className={error.location ? 'danger-border' : ''}
                style={{ width: '100%', marginTop: '7px' }}
                options={{
                  types: ['(regions)'],
                }}
                onChange={(e) => {
                  //    setLocation({ ...location, name: e.target.value })
                  setLocation({ name: e.target.value })
                }}
                value={location.name}
                /* eslint-disable-next-line */
              />
            )}
          </FormGroup>
          <div
            className={classnames(
              'invalid-feedback ',
              error.location ? 'd-block' : '',
            )}
          >
            {error.location}
          </div>
        </Col>
      </Row>
    </div>
  )
}

AutoCompleteForm.propTypes = {
  setLocation: PropTypes.func,
  error: PropTypes.object,
  mapRef: PropTypes.string,
}

export default AutoCompleteForm
