import React from 'react'
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
                <Input className="input" type="text" />
              </FormGroup>
            </Form>
          </CardHeader>
        </Card>
      </Col>
    </Row>
  </Col>
)

export default SearchBox
