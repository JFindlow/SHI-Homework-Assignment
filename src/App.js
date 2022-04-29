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

sortBy(sortedBy){
  let items = this.state.items
  items.sort(function(a,b){
    var keyA = a[sortedBy]
    var keyB = b[sortedBy]
    if(keyA < keyB) return -1;
    if(keyA > keyB) return 1;
    return 0
  })
  this.setState({items: items})
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
      <button onClick={() => this.sortBy("name")}>Name</button>
      <button onClick={() => this.sortBy("city")}>City</button>
      <button onClick={() => this.sortBy("brewery_type")}>Type</button>
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
}
export default App;
