import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ResultDisplay from './ResultDisplayModel';
import { Redirect } from 'react-router-dom';

export default class ResultPopUp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: true,
      };
      this.toggle = this.toggle.bind(this);
    }
    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }
    render() {
      if (!this.state.modal) {
        return <Redirect to="/testlogs" />
      } 
      return (
        <div>
            <span onClick={this.toggle}>button</span>
            <Modal isOpen={this.state.modal} toggle={this.toggle}
                className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Result</ModalHeader>
                <ModalBody>
                    <ResultDisplay userTestID={this.props.location.state.userTestID}/>
                </ModalBody>
                <ModalFooter className="text-center">
                  <Button colour="secondary" onClick={this.toggle} >Close</Button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
}