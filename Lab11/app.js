import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';
import axios from 'axios';
import { dispatch, getState, on } from './my-dispatcher.js'


class LunchApp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lunches: [],
            lunchChoices: []
        }

        on('SAVE_LUNCH', () => getState().then(this.setState.bind(this)) );
    }

    componentDidMount() {
        getState().then( this.setState.bind(this) );
    }

    render() {
        var now = new Date();
        var formattedDate = moment(now).format('MMMM Do YYYY');
        return (
            <div>
                <Panel>
                    <h2>Options for lunch for {formattedDate}:</h2>
                    <LunchOptionsPanel lunchData={this.state.lunchChoices}> </LunchOptionsPanel>
                </Panel>

                <Panel>
                    <AllLunchOrdersPanel orders={this.state.lunches} />
                </Panel>

            </div>
        );
    }
}

class LunchOptionsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedLunch: 'Nothing selected'};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        // may need to use innerText for older IE
        this.setState({
            selectedLunch: event.target.textContent
        });
    }

    handleSave() {
        dispatch({
            type: 'SAVE_LUNCH',
            name: this.refs.name.value,
            lunch: this.state.selectedLunch,
            instructions: this.refs.instructions.value
        });

    }

    render() {
        let lunchOptions = this.props.lunchData.map( (c,i) => (
            <Label key={i} bsStyle={c===this.state.selectedLunch?"primary":"default"} onClick={ this.handleClick.bind(this) }>{c}</Label>
        ));

        return (

            <Panel header="Place an Order" bsStyle="info">

                <h4>Name:</h4>
                <input
                    ref='name'
                    type="text"
                    placeholder="Enter your name"
                />


                <h4>Lunch: {lunchOptions}</h4>


                <h4>Enter special instructions:</h4>
                <input
                    ref='instructions'
                    type='text'
                    defaultValue="None :)"
                />


                <Button onClick={this.handleSave.bind(this)}>Save</Button>



            </Panel>

        );
    }
}

class SelectedLunchPanel extends React.Component {
    constructor(props) {
        super(props);
        this.updateInstructions = this.updateInstructions.bind(this);
        this.state = { instructions: '' };
    }
    updateInstructions(instructions) {
        this.setState({instructions: instructions});
    }
    render() {
        return (
            <div>

                    <Label>{this.props.selectedLunch}</Label>
                    <p>Special Instructions: {this.state.instructions}</p>


                    <SpecialInstructionsInput
                        value={this.state.instructions}
                        updateInstructions={this.updateInstructions}
                        />
            </div>
        );
    }
}

class SpecialInstructionsInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.props.updateInstructions(this.refs.specialInstructionsInput.value);
    }
    render() {
        return (
            <div>
                <Label>Enter special instructions:</Label>
                <input
                    ref='specialInstructionsInput'
                    type='text'
                    />
                <Button onClick={this.handleChange}>Submit</Button>
            </div>
        );
    }
}


class AllLunchOrdersPanel extends React.Component {
    render() {
        let orders = (this.props.orders||[]).map( (o,i)=>(
            <div key={i}>
                <strong>{o.name}</strong>: ordered {o.lunch} with special instructions: <em>{o.instructions}</em>
            </div>
        ));

        return (
            <Panel header="Current Orders" bsStyle="info">
                {orders}
            </Panel>
        );
    }
}

var lunchChoices = ['Chicken', 'Fish', 'Vegetarian'];
ReactDOM.render(
    <LunchApp lunchChoices={lunchChoices}/>,
    document.getElementById('root')
);
