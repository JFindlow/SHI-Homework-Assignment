import { Component } from "react";

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
        if ((time - this.state.timeLoaded) / (1000 * 60 * 60 * 24) >= 1) {
            let data = []
            for (let i = 1; i < 10; i++) {
                var url = 'https://api.openbrewerydb.org/breweries?by_state=texas&per_page=50&page=' + i + '&sort=name:asc'
                data.push(fetch(url).then(res => res.json()))
            }

            const merge = [].concat.apply([], await Promise.all(data))
            console.log(merge)
            this.setState({
                items: merge,
                timeLoaded: time
            })

        }
        return this.state.items
    }
}
