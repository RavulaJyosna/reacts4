import React from "react";

import Table from "./table/index";
import View from "./view/index";
import Form from "./form/index";
import Edit from "./edit/index";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom'

const tableHeaders = ['Id', 'Name', 'Alias', 'Team'];

class App extends React.Component {
    state = {
        tableValues: [] 
    }                           

    constructor(props) {
        super(props)
        this.createRecord = this.createRecord.bind(this)
    }

    fetchList() {
        let self = this;
        const request = new Request('/heroes',
        {method: 'GET', headers: {"Content-Type": "application/json"}});
        fetch(request)
        .then(res => res.json())
        .then(function(data) {
            self.setState({'tableValues': data});
        });
    }

    componentDidMount() {
        this.fetchList()
    }

    createRecord(name,alias,team) {
        const self = this;
        var body={
            name: name,
            alias: alias,
            team: team
        };

        var request= new Request('/heroes',{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        fetch(request)
        .then(function() {
            self.fetchList();
        });
    
       
        //const ID = (Math.random() * 100).toString()
        //const newRecord = [ID, name, alias, team]
        //const newTableValues = [...this.state.tableValues]
        //newTableValues.push(newRecord)
        //this.setState({tableValues: newTableValues})
    }

    render() {
        return(
            <Router>
                <Switch>
                    <Route exact path= "/list" render={(props) => {
                        return <Table
                                     values={this.state.tableValues} 
                                     headers={tableHeaders}
                                     history={props.history} 
                                />
                    }}/>
                    <Route exact path= "/view/:id" component={View}/>
                    <Route exact path= "/create" render={(props) => {
                        return <Form 
                                    formSubmitCallback={this.createRecord}
                                    history={props.history} 
                                />
                    }}/>

                    <Route exact path= "/edit/:id" component={Edit}/>

                    <Redirect to="/list"/>
                </Switch>
             </Router>
        );
    }
} 

export default App;
  