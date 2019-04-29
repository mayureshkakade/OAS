import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Register from './Register';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  render() {
    return (
      <div>
      <span onClick={this.toggle}>{this.props.buttonLabel}</span>
      <Modal isOpen={this.state.modal} toggle={this.toggle}
      className={this.props.className}>
      <ModalHeader toggle={this.toggle}>Register</ModalHeader>
      <ModalBody>
      <Register/>
      </ModalBody>
      </Modal>
      </div>
      );
    }
  }
  
  export default ModalExample;
