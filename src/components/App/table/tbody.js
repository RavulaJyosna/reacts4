import React from "react";
import Row from "./row";

class Tbody extends React.Component {
    render() {
        const values = this.props.values;
        let renderedRows = values.map((val,index) =>
        <Row key={index} isHeader={false} values={val} onViewClick={this.props.onViewClick} onEditClick={this.props.onEditClick}/>
        );
        return (
            <tbody>
                {renderedRows}
            </tbody>
        ); 
    }
}

export default Tbody;