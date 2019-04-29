import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TestStart from './TestStart'
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
      <Button onClick={this.toggle}>{this.props.buttonLabel}</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle}
      className={this.props.className}>
      <ModalHeader toggle={this.toggle}>Start Test</ModalHeader>
      <ModalBody>
        <TestStart subcategoryid={this.props.subcategoryid} categoryid={this.props.categoryid}/>
      </ModalBody>
      </Modal>
      </div>
      );
    }
  }
  export default ModalExample;
