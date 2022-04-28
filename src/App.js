import React, {Component} from 'react'
import brewData from './brewData';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      gatheredData: false,
    }
  }

render(){
  if(!this.state.gatheredData){
    let bro = new brewData().getData();
    bro.then(json => {
      this.setState({items: json,
                      gatheredData: true})
      
    })
  }

  var items = this.state.items;
  
  return (
    <div className="App">
      <div className='btn-group'>
      <button>Name</button>
      <button>City</button>
      <button>Type</button>
      </div>
      <div className='data'>
      <ol>
        {items.map(item => (
          <li key={item.id}>
            <b>Name</b>: {(item.name===null ? 'N/A' : item.name)}<br/>
            <b>Type</b>: {(item.brewery_type===null ? 'N/A' : item.brewery_type)}<br/>
            <b>Address</b>: {(item.street===null ? 'N/A, ' : item.street + ', ')}
                            {(item.city===null ? 'N/A, ' : item.city + ', ')}
                            {item.state} 
                            {(item.postal_code===null ? ' N/A' : ' ' + item.postal_code)}<br/>
            <b>Phone</b>: {(item.phone===null ? 'N/A' : item.phone)}<br/>
            <b>Website</b>: {(item.website_url===null ? 'N/A' : item.website_url)}
          </li>
        ))}
      </ol>
      </div>
    </div>
  );
}

arraySplitter(arr){
  let result = []
  for(let i = 0; i < arr.length; i+= 25){
    let slice = arr.slice(i, i+25)
    result.push(slice)
  }
  return result
}


}



export default App;
