import React from "react";

function fetchDetails(id) {
    const request = new Request('/heroes/' +id,
    {method: 'GET', headers: {"Content-Type": "application/json"}});
    return fetch(request);
}

class View extends React.Component {

    state={
        id: '',
        name: '',
        team: '',
        alias: ''
    }

    componentDidMount() {
        let self=this;
        fetchDetails(this.props.match.params.id)
        .then(res =>res.json())
        .then(function(data) {
            self.setState({
                id: data[0],
                name: data[1],
                alias: data[2],
                team: data[3]
            });
        });
    }

    render() {
        return(
            <section>
                <h3>View Detail</h3>
                <div>Name: {this.state.name}</div>
                <div>Alias: {this.state.alias}</div>
                <div>Team: {this.state.team}</div>
                
            </section>
        )
    }
}

export default View;