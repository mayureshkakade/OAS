import React, { Component } from 'react';
import { Container, Modal,ModalBody, Col,Table, Form, FormGroup, Label, Input, Row,Button, Card} from 'reactstrap';
import axios from 'axios';
import QuestionModal from './questionModal'
// import Modal from 'react-modal';


export default class questions extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
           Categories :[],
           srNo:0,
           isLoaded:false,
           inputValue: -1,
           subCategories:[],
           subCategoriesLoaded:false,
           text:"",
           message:"",
           questions:[],
           questionsLoaded:false,
           inputValueS:-1,
           option1:"",
           option2:"",
           option3:"",
           option4:"",
           modalIsOpen: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick=this.handleClick.bind(this);

    this.handleChanges = this.handleChanges.bind(this);
    this.openModal = this.openModal.bind(this);
   // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    }

    componentDidMount()
    {
        axios.get('http://mayureshka:5452/api/admin/category',{
			headers: {
				"Authorization" : sessionStorage.getItem('userID')
			}
		})
        .then(response=>{
            this.setState({
                srNo:0,
                isLoaded:true,
                Categories:response.data,
            })
        })
        .catch(error=>{
            console.log(error.response.statusText);
            this.setState({
              message:error.response.statusText
            })
            console.log(error);
        });
    }
    updateInputValue=evt=> {
        var x =document.getElementById("cat").value;
        this.state.inputValue=x;
        console.log(x)
        axios.get('http://172.27.233.165:5452/api/Admin/subcategory/?id='+x,{
			headers: {
				"Authorization" : sessionStorage.getItem('userID')
			}
		})
        .then(response => {
            this.setState({srNo:0,
              subCategories : response.data,
              subCategoriesLoaded:true
            })
          })
      }
      updateInputValueSub=evt=> {
        var x =document.getElementById("SubCat").value;
        this.state.inputValueS=x;
        console.log(x)
        axios.get('http://172.27.233.165:5452/api/Admin/Questions/?id='+x,{
			headers: {
				"Authorization" : sessionStorage.getItem('userID')
			}
		})
        .then(response => {
            this.setState({
              srNo:0,
              questions : response.data,
              questionsLoaded:true
            })
            console.log(this.state.questions);
          },()=>this.setState({srNo:0,questions : [],questionsLoaded : true}))
      }

      handleChange(e) {
          //console.log(this.state.text);
        this.setState({ text: e.target.value });
      }

      handleSubmit(e) {
        e.preventDefault();

        if (!this.state.text.length) {
          return;
        }
        let subCategory = {
            subCategoryName:this.state.text,
            is_Active:"true",
            categoryID:this.state.inputValue

          }
          console.log(subCategory);
        axios.post("http://localhost:60676/api/Admin/AddSubCategory", subCategory,{
			headers: {
				"Authorization" : sessionStorage.getItem('userID')
			}
		});


      }


    render()
    {


        var {isLoaded, Categories,subCategoriesLoaded,subCategories,questionsLoaded,questions} = this.state;
        if(!subCategoriesLoaded && !questionsLoaded)
        {
            if(!isLoaded){
                if(this.state.message === "Forbidden"){
                    return(
                      <div className="row h-100 align-items-center">
                        <div className="container mt-4 ">
                          <div className="col-8 mx-auto my-auto">
                            <div className="jumbotron text-center">
                              <h1>Access Denied</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  else{
                    return(
                      <div>Loading..</div>
                    );
                  }
            }


            else{
                return(

                    <Container>
                        <h3> </h3>
				{/* <h3>Category List</h3> */}
				{/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}

				{/* <select  id="cat"  onChange={this.updateInputValue}>
				<option >select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))} </select>
				*/}
				<FormGroup row>
				<Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
				<Col sm={6} >
				<Input type="select" id="cat" onChange={this.updateInputValue}>
				<option >Select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID} >{item.categoryName}</option>
					))}
					</Input>
					</Col>
					</FormGroup>

					</Container>



                //     <Container>
                //         <h3>Category List</h3>
                //         {/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}

                //         <select  id="cat"  onChange={this.updateInputValue}>
                //         <option >select</option>
                //         {Categories.map(item =>(
                //             <option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
                //         ))} </select>


                // </Container>

                );

        }
    }

    if(subCategoriesLoaded && !questionsLoaded)
    {
        return(

            <Container>
				<h3> </h3>
				{/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}

				{/* <select  id="cat"  onChange={this.updateInputValue}>
				<option >select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))} </select>
				*/}
				<FormGroup row>
				<Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
				<Col sm={6} >
				<Input type="select" id="cat" onChange={this.updateInputValue}>
				<option >Select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))}
					</Input>
					</Col>
					</FormGroup>

					{/* </Container>

            <Container> */}
                        {/* <h3>SubCategory List</h3> */}


				<FormGroup row>

                        <Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
				<Col sm={6} >
				<Input type="select" id="SubCat" onChange={this.updateInputValueSub}>
				<option >Select</option>
                {subCategories.map(item =>(
					<option key={item.subcategoryID} value={item.subcategoryID}  >{item.subcategoryName}</option>
					))}
					</Input>
					</Col>
					</FormGroup>
                        {/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}

                        {/* <select  id="SubCat"  onChange={this.updateInputValueSub}>
                        <option >select</option>
                        {subCategories.map(item =>(
                            <option key={item.subcategoryID} value={item.subcategoryID}  >{item.subcategoryName}</option>
                        ))} </select>
                         */}

                </Container>

        );
    }
    if(questionsLoaded)
    {
        return(


            <Container>
                <h3> </h3>
				{/* <h3>Category List</h3> */}
				{/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}

				{/* <select  id="cat"  onChange={this.updateInputValue}>
				<option >select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))} </select>
				*/}
				<FormGroup row>
				<Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
				<Col sm={6} >
				<Input type="select" id="cat" onChange={this.updateInputValue}>
				<option >Select</option>
				{Categories.map(item =>(
					<option key={item.categoryID} value={item.categoryID}  >{item.categoryName}</option>
					))}
					</Input>
					</Col>
					</FormGroup>

					{/* </Container>

            <Container> */}
                        {/* <h3>SubCategory List</h3> */}
                        <FormGroup row>

                        <Label for="exampleSelect" sm={{size:4, offset: 1}}>Select category</Label>
				<Col sm={6} >
				<Input type="select" id="SubCat" onChange={this.updateInputValueSub}>
				<option >Select</option>
                {subCategories.map(item =>(
					<option key={item.subcategoryID} value={item.subcategoryID}  >{item.subcategoryName}</option>
					))}
					</Input>
					</Col>
					</FormGroup>
                        {/* <select   value={this.state.inputValue} onChange={this.updateInputValue}> */}

                        {/* <select  id="SubCat"  onChange={this.updateInputValueSub}>
                        <option >select</option>
                        {subCategories.map(item =>(
                            <option key={item.subcategoryID} value={item.subcategoryID}  >{item.subcategoryName}</option>
                        ))} </select>
                         */}

                {/* </Container>
                    <Container> */}
                 <h3>Questions  List</h3>
             <Table striped className="text-center">
                 <thead>
                     <tr>
                         <th>Serial Number</th>
                         <th>Question</th>
                         {/* <th>Answer Text</th>   */}
                         <th>Option 1</th>
                         <th>Option 2</th>
                         <th>Option 3</th>
                         <th>Option 4</th>
                         <th>Answer</th>
                         {/* <th>Complexity</th>   */}
                         <th>Edit</th>


                     </tr>
                 </thead>
                 {questions.map(item =>(
                 <tbody>
                     <tr key={item.questionID}>
                         <td>{this.state.srNo =  this.state.srNo+1}</td>
                         <td>{item.questionText}</td>
                         {/* <td>{item.answerType}</td> */}
                         <td>{item.option1}</td>
                         <td>{item.option2}</td>
                         <td>{item.option3}</td>
                         <td>{item.option4}</td>
                         <td>{item.answer}</td>
                         {/* <td>{item.complexity}</td> */}
                        <td>
                            {console.log(item.questionID)}
                            <QuestionModal questionID={item.questionID}/>
                        </td>
                     </tr>
                 </tbody>

                 ))}
                    {/* <FormGroup>
                        <Button>EDIT</Button>
                    </FormGroup> */}
             </Table>

            </Container>
        );
    }

}
openModal() {
    this.setState({modalIsOpen: true});
  }
closeModal() {
    this.setState({modalIsOpen: false});
  }


handleChanges(e){
    this.setState({ questionText: e.target.value ,
                    option1: e.target.value ,
                    option2: e.target.value ,
                    option3: e.target.value ,
                    option4: e.target.value
    });
}


handleClick(){
    var x=document.getElementById().value;
    console.log(x);
    axios.get('http://172.27.233.165:5452/api/Admin/Questions/?id='+x)
    .then(response => {
        console.log(response);
        this.setState({
            question: response.data,
            modalIsOpen: true
        });
})
    .catch(error => {
    console.log(error.response);
    console.log(error);
})
}


handleSubmit(){
    var y=document.getElementById().value;
    console.log(y);
    let payload = {
        questionText:this.state.questionText,
        option1:this.state.option1,
        option2:this.state.option2,
        option3:this.state.option3,
        option4:this.state.option4
      }
    axios.post('http://172.27.233.165:5452/api/Admin/EditQuestion/?id='+y,payload)

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


// render () {
//     return (
//       <div>
//           <Button id="edit" onClick={this.handleClick}>Edit</Button>

//         <Modal
//           isOpen={this.state.modalIsOpen}
//           onAfterOpen={this.afterOpenModal}
//           onRequestClose={this.closeModal}
//         >
//         <Button id="submit" type="submit" onClick={this.handleSubmit}>Submit</Button>
//         <ModalBody>
//             <Input type="text" onClick={this.handleChanges}/>
//             <Button id="submit" type="submit" onClick={this.handleSubmit}>Submit</Button>
//         </ModalBody>
//         </Modal>
//       </div>
//     );
//   }
}
