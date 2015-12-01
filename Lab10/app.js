import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import Label from 'react-bootstrap/lib/Label';
import Button from 'react-bootstrap/lib/Button';
import { on, trigger, off } from './my-dispatcher';

class LunchApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: 'Nothing', instructions: 'none' };
    }

    componentDidMount() {
        on('instructions', instructions => this.setState({instructions}) );
        on('selected', selected => this.setState({selected}) );
    }

    componentWillUnmount() {
        // off('instructions', evRef);
        // off('selected', evRef);
    }


    render() {
        var now = new Date();
        var formattedDate = moment( now ).format('MMMM Do YYYY');
        return (
            <div>
                <Panel>
                    <h2>Options for lunch for {formattedDate}:</h2>
                    <LunchOptionsPanel
                        lunchData={this.props.lunchChoices}
                        selected={this.state.selected}
                        instructions={this.state.instructions}
                        setInstructions={ trigger.bind(this, 'instructions') }
                        setSelected={ trigger.bind(this, 'selected') }
                    />
                </Panel>
            </div>
        );
    }


}

class LunchOptionsPanel extends React.Component {

    render() {
        let lunchOptions = this.props.lunchData.map( (c,i) => (
            <h3 key={i} onClick={ e => this.props.setSelected(e.target.textContent) }>
                <Label>{c}</Label>
            </h3>
        ));
            return (
                <div>
                    <Panel header="Please select one" bsStyle="info">
                        {lunchOptions}
                    </Panel>
                    <SelectedLunchPanel
                        selected={this.props.selected}
                        instructions={this.props.instructions}
                        setInstructions={this.props.setInstructions}
                    />
                </div>
            );
        }
    }

    class SelectedLunchPanel extends React.Component {

        render() {
            return (
                <div>
                    <Panel header="You've picked" bsStyle="warning">
                        <Label>{this.props.selected}</Label>
                        <p>Special Instructions: {this.props.instructions}</p>
                        <SpecialInstructionsInput
                            setInstructions={this.props.setInstructions}
                        />
                    </Panel>
                </div>
            );
        }
    }

    class SpecialInstructionsInput extends React.Component {

        render() {
            return (
                <div>
                    <Label>Enter special instructions:</Label>
                    <input
                        ref='specialInstructionsInput'
                        type='text'
                        />
                    <Button onClick={ () => this.props.setInstructions(this.refs.specialInstructionsInput.value) }>Submit</Button>
                </div>
            );
        }
    }

    var lunchChoices = ['Chicken', 'Fish', 'Vegetarian'];
    ReactDOM.render(
        <LunchApp lunchChoices={lunchChoices}/>,
        document.getElementById('root')
    );
