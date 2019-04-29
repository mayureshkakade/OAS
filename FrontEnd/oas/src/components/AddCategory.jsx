// import React from 'react';

// import { Button } from 'reactstrap';

// class AddCategory extends React.Component {

//     render(){
//         return{

//         }
//     }
// }
// export default AddCategory;

import React from 'react';
import axios from 'axios';

class PersonList extends React.Component {
    constructor()
    {
        super();
        this.state ={categories :[]}
    }

  componentWillMount()
  {
      this.setState({categories : [{categoryID : 1, categoryName: 'Cat1'},{categoryID: 2,categoryName: 'Cat2'},{categoryID : 3,categoryName: 'Cat3'}]})
  }
  componentDidMount() {
    axios.get('http://172.27.233.165:5452/api/Admin/category')
      .then(res => {
        const catg = res.data;
        this.setState({ catg });
      })
  }

  render() {
    return (
      <ul>
        { this.state.catg.map(c => <li>{c.categoryName}</li>)}
      </ul>
    )
  }
}
export default PersonList;