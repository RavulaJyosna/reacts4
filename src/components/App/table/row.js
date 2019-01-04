import React from "react";
import Column from "./column";

class Row extends React.Component {
    
    constructor(props) {
        super(props);
        this.onViewClick = this.onViewClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    onViewClick() {
        console.log(this.props.values)
        const ID=this.props.values[0]
        this.props.onViewClick(ID)
    }

    onEditClick() {
        console.log(this.props.values)
        const ID=this.props.values[0]
        this.props.onEditClick(ID)
    }

    render() {
        const values = this.props.values;
        let renderedCols = values.map((val,index) =>
        <Column key={index} isHeader = {this.props.isHeader}>{val}</Column>
        );

        let actionButton;
        if(this.props.isHeader) {
            actionButton=(<Column isHeader = {this.props.isHeader}>Action</Column> )
        } else {
            actionButton=(<Column isHeader = {this.props.isHeader}>
                             <button onClick={this.onViewClick}>view</button>
                          </Column>)
        }

        let actionButton2;
        if(this.props.isHeader) {
            actionButton2=(<Column isHeader = {this.props.isHeader}>EditAction</Column> )
        } else {
            actionButton2=(<Column isHeader = {this.props.isHeader}>
                             <button onClick={this.onEditClick}>edit</button>
                          </Column>)
        }


        return (<tr>{renderedCols}{actionButton}{actionButton2}</tr>)
    }
} 

export default Row;