import React from 'react'
import GoogleMapReact from 'google-map-react'
import '../App.scss'
import {
  Col,
  Input,
  Row,
  Card,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Label,
} from 'reactstrap'


function initialize() {
    const input = document.getElementById('searchTextField');
     /* eslint-disable-next-line */
    new google.maps.places.Autocomplete(input);
  }
   /* eslint-disable-next-line */
  google.maps.event.addDomListener(window, 'load', initialize);

 /* eslint-disable-next-line */
//const autocomplete = new google.maps.places.Autocomplete(input, options);

const SearchBox = () => (
  <Col md="7">
    <Row>
      <h1>Search</h1>
    </Row>
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <Form>
              <FormGroup>
                <Label>Name</Label>
                <Input className="input" type="text" id="pac-input" />
              </FormGroup>
            </Form>
          </CardHeader>
        </Card>
      </Col>
    </Row>
    <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY' }}
          yesIWantToUseGoogleMapApiInternals
        
        />
  </Col>
  
)

export default SearchBox
