import React from "react";

import Thead from "./thead";
import Tbody from "./tbody";

class Table extends React.Component {
    
    constructor(props) {
        super(props);
        this.onViewClick = this.onViewClick.bind(this)
        this.onEditClick = this.onEditClick.bind(this)
    }

    onViewClick(id) {
        this.props.history.push(`/view/${id}`)
    }

    onEditClick(id) {
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        return(
            <table id="myTable">
                <Thead values={this.props.headers}/>
                <Tbody values={this.props.values} onViewClick={this.onViewClick} onEditClick={this.onEditClick}/>
            </table>
        )
    }
}

export default Table;