import { Component } from "react";
import Brewery from './Brewery'
export default class brewData extends Component {
    constructor() {
        super();
        this.state = JSON.parse(window.localStorage.getItem('state')) || {
            items: [],
            timeLoaded: 1,
        }
    }

    setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state))
        super.setState(state)
    }

    async getData() {
        var time = new Date().getTime();
        var tempTime = 0
        console.log((time - tempTime) / (1000 * 60 * 60 * 24))
        console.log("Current time: " + time)
        if ((time - tempTime) / (1000 * 60 * 60 * 24) >= 1) {
            let data = []
            for (let i = 1; i < 10; i++) {
                var url = 'https://api.openbrewerydb.org/breweries?by_state=texas&per_page=50&page=' + i + '&sort=name:asc'
                data.push(fetch(url).then(res => res.json()))
            }

            const merge = [].concat.apply([], await Promise.all(data))
            this.setState({
                items: merge,
                timeLoaded: time
            })

        }
        console.log(new Brewery(this.state.items[0]))
        console.log("Updated items at: " + this.state.timeLoaded)
        return this.state.items
    }
}
