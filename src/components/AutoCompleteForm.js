import React from 'react'
import '../App.scss'
import {
  Col,
  Row,
  Form,
  FormGroup,
} from 'reactstrap'
import Autocomplete from 'react-google-autocomplete'


// https://www.npmjs.com/package/react-google-autocomplete




const AutoCompleteForm = () => (
  <Col md="7">
    <Row className="search-header">
      <h1>Header</h1>
    </Row>
    <Row className="search-box">
      <Form>
        <FormGroup>
          <Autocomplete
            apiKey="AIzaSyDZ-G11woEVuWi_wkX6j77pP2tqPe_5lVY"
            style={{ width: '90%' }}
            onPlaceSelected={(place) => {
              console.log(place)
            }}
            options={{
              types: ['(regions)'],
              componentRestrictions: { country: 'gb' },
            }}
            defaultValue="London"
      
          />
        </FormGroup>
      </Form>
    </Row>
  </Col>
)

export default AutoCompleteForm
