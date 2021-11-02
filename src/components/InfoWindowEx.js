import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { InfoWindow } from 'google-maps-react'

const InfoWindowEx = (props) => {
  const infoWindowRef = useRef(null)
  const contentElement = document.createElement(`div`)
  useEffect(() => {
    ReactDOM.render(React.Children.only(props.children), contentElement)
    infoWindowRef.current.infowindow.setContent(contentElement)
  }, [props.children])
  return <InfoWindow ref={infoWindowRef} {...props} />
}

export default InfoWindowEx
