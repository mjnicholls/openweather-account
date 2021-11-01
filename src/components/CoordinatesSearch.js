/* eslint-disable */
import React from 'react'
import '../App.scss'
import { Col, Row, FormGroup, Label, Input } from 'reactstrap'


const CoordinatesForm = () => {

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      });
      // Create the search box and link it to the UI element.
      const input = document.getElementById("coordinates-search");
      const searchBox = new google.maps.places.SearchBox(input);
    
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
      // Bias the SearchBox results towards current map's viewport.
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
      });
    
      let markers = [];
    
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
    
        if (places.length == 0) {
          return;
        }
    
        // Clear out the old markers.
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers = [];
    
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
    
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
    
          const icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
          };
    
          // Create a marker for each place.
          markers.push(
            new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
            })
          );
          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });


      return (

        <Row className="search-box">
        <Col>
          <Label>Trigger coordinates</Label>
        </Col>
        <Col>
          <Label>Lat</Label>
          <FormGroup>
            <Input type="text"
            className="controls"
            id="coordinates-search" />
          </FormGroup>
        </Col>
        <Col>
          <Label>Lng</Label>
          <FormGroup>
            <Input
              type="text"
              // onChange={(e) => handleChange('city', e.target.value)}
              value=""
              //  className={error.city ? 'danger-border' : ''}
            />
          </FormGroup>
        </Col>
      </Row>
      )



}

export default CoordinatesForm