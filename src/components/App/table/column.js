import React from "react";

class Column extends React.Component {
    render() {
        if(this.props.isHeader) {
            return (<th>{this.props.children}</th>)
        }
        return(<td>{this.props.children}</td>)
        
    }
}

export default Column;