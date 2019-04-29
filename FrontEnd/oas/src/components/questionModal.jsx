import React, { Component } from 'react';
import { Container, Modal,ModalBody,ModalHeader,ModalFooter, Col,Table, Input,Button} from 'reactstrap';
import axios from 'axios';

  
export default class QuestionModal extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
         question:[],
         questionText:"",
         option1:"",
         option2:"",
         option3:"",
         option4:"",
         answer:"",
         modalIsOpen: false
    } 
   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    }

initialQ = ()=>{
    this.setState((state)=>({
        questionText:state.question.questionText,
        option1:state.question.option1,
        option2:state.question.option2,
        option3:state.question.option3,
        option4:state.question.option4,
        answer:state.question.answer,
    }
    ),()=>console.log(this.state))
}

openModal() {
    this.setState({modalIsOpen: true});
  }
closeModal() {
    this.setState({modalIsOpen: false});
  }
 

handleChange(e){
  console.log([e.target.value]);
    this.setState({ 
      [e.target.name] : e.target.value,
      // questionText: e.target.value ,
      // option1: e.target.value ,
      // option2: e.target.value ,
      // option3: e.target.value ,
      // option4: e.target.value ,
      // answer:  e.target.value                         
    });
  console.log([e.target.value]);

}


handleClick(){
    var x=this.props.questionID;
    console.log(x);
    axios.get('http://172.27.233.165:5452/api/Admin/Question?id='+x,{
            headers: {
                "Authorization" : 2
            }
    })
    .then(response => {
        console.log(response);
        this.setState({
            question: response.data,
            modalIsOpen: true
        },this.initialQ);
})
    .catch(error => {
    console.log(error.response);
    console.log(error);
})
}


handleSubmit(){
    var y=this.props.questionID;
    console.log(y);
    let payload = {
        questionID:y,
        questionText:this.state.questionText,
        option1:this.state.option1,
        option2:this.state.option2,
        option3:this.state.option3,
        option4:this.state.option4,
        answer:this.state.answer
      }
      console.log(payload);
    axios.post('http://172.27.233.165:5452/api/Admin/EditQuestion',payload)
    
    .then(response => {
        console.log(response);
        this.setState({
            question: response.data,
            modalIsOpen: false
      });
    })
    .catch(error => {
    console.log(error.response);
    console.log(error);
})
}

render () {
    return (
      <div>
          <Button id="edit" onClick={this.handleClick}>Edit</Button>
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >
       < ModalHeader>Edit Question</ModalHeader>
        <ModalBody >

             <Table striped className="text-center">
                 <thead>
                        <tr>
                            <th>Question</th>   
                            <td><Input type="text" onChange={this.handleChange} name="questionText" defaultValue={this.state.question.questionText}/></td>  
                        </tr>
                        <tr>   
                            <th>Option 1</th>  
                            <th>Option 2</th>  
                            <th>Option 3</th>  
                            <th>Option 4</th>  
                            <th>Answer</th>  
                            
                        </tr>
                 </thead>
             <tbody> 
                    <tr>
                    <td><Input type="text" onChange={this.handleChange} name="option1" defaultValue={this.state.question.option1}/></td>
                    <td><Input type="text" onChange={this.handleChange} name="option2" defaultValue={this.state.question.option2}/></td>
                    <td><Input type="text" onChange={this.handleChange} name="option3" defaultValue={this.state.question.option3}/></td>
                    <td><Input type="text" onChange={this.handleChange} name="option4" defaultValue={this.state.question.option4}/></td>
                    <td><Input type="text" onChange={this.handleChange} name="answer" defaultValue={this.state.question.answer}/></td>

                </tr>
            </tbody> 

            </Table>

           < ModalFooter>
            <Button color="primary" id="submit" type="submit" onClick={this.handleSubmit}>Submit</Button>
            <Button color="secondary" onClick={this.closeModal}>Close</Button>
            </ModalFooter>

        </ModalBody>
        </Modal>
      </div>
    );
  }
}
