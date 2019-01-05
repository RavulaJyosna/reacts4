import React from "react";

class View extends React.Component {
    render() {
        return(
            <section>
                <h3>View Detail</h3>
                <div>Name: {this.props.name}</div>
                <div>Alias: {this.props.alias}</div>
                <div>Team: {this.props.team}</div>
                
            </section>
        )
    }
}

export default View;