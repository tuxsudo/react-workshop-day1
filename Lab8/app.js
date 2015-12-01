import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel';
import Input from 'react-bootstrap/lib/Input';
import Label from 'react-bootstrap/lib/Label';

class LunchApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: 'Nothing :(',
            instructions: 'none'
        };
    }

    updateSelection(selected) {
        // may need to use innerText for older IE
        this.setState({selected});
    }

    updateInstructions(instructions) {
        this.setState({ instructions });
    }


    render() {
        var now = new Date();
        var formattedDate = moment(now).format('MMMM Do YYYY');
        return (
            <div>
                <Panel>
                    <h2>Options for lunch for {formattedDate}:</h2>
                    <LunchOptionsPanel
                        lunchData={this.props.lunchChoices}
                        selected={this.state.selected}
                        instructions={this.state.instructions}
                        updateSelection={this.updateSelection.bind(this)}
                        updateInstructions={this.updateInstructions.bind(this)}
                    />
                </Panel>
            </div>
        );
    }
}


class SpecialInstructionsInput extends React.Component {

    render() {
        return (
            <Panel header="Please enter special instructions">
                <Input type="text" value={this.props.value} onChange={e=>this.props.changeHandler(e.target.value) } />
            </Panel>
        );
    }

}


class LunchOptionsPanel extends React.Component {

    render() {

        let lunchOptions = this.props.lunchData.map( (c,i)=> (
            <h3 key={i} onClick={ e=>this.props.updateSelection(e.target.textContent) }>
                <Label bsStyle={c===this.props.selected?"primary":"default"}>{c}</Label>
            </h3>
        ));

        return (
            <div>
                <Panel header="Please select one" bsStyle="info">
                    {lunchOptions}
                </Panel>

                <SpecialInstructionsInput
                    changeHandler={ this.props.updateInstructions }
                />

                <SelectedLunchPanel
                    selectedLunch={this.props.selected}
                    instructions={this.props.instructions}
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
                    <h1><Label>{this.props.selectedLunch}</Label></h1>
                    <hr />
                    <h3>Special Instructions: <Label>{this.props.instructions}</Label></h3>
                </Panel>
            </div>
        );
    }
}

var lunchChoices = ['Chicken', 'Fish', 'Vegetarian'];
ReactDOM.render(
    <LunchApp lunchChoices={lunchChoices}/>,
    document.getElementById('root')
);
