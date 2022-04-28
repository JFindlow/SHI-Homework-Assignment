import { Component } from "react";

export default class brewData extends Component{
    constructor(props){
        super(props);
        this.state = {
          items: [],
        }
      }

    async getData(){
        let data = []
        for(let i = 1; i < 10; i++){
            var url = 'https://api.openbrewerydb.org/breweries?by_state=texas&per_page=50&page='+i+'&sort=name:asc'
            data.push(fetch(url).then(res => res.json()))
        }
        
        const merge = [].concat.apply([], await Promise.all(data));

        return merge
          
    }
}

