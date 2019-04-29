import React, { Component } from 'react';
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';

class Test extends Component
{
    render() {
        return (
          <Container className="App">
            <h2>Sign In</h2>
            <Form className="form">
              <Col md = {4} >
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="myemail@email.com"
                  />
                </FormGroup>
              </Col>
              <Col md = {4}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <Button >Submit</Button>
              </Col>
            </Form>
          </Container>
        );
    }
}

export default Test;