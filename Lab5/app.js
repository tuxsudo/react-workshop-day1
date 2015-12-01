import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
var Button = require('react-bootstrap').Button;
import Panel from 'react-bootstrap/lib/Panel'
import Input from 'react-bootstrap/lib/Input'
import ButtonInput from 'react-bootstrap/lib/ButtonInput'
import Label from 'react-bootstrap/lib/Label'

class LunchApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selected: this.props.selected };
    }

    _selectLunch(lunch) {
        this.setState({selected: lunch});
    }

    render() {
        var now = new Date();
        var formattedDate = moment(now).format('MMMM Do YYYY');

        return (
            <div>
                <Panel>
                    <h2>Options for lunch for {formattedDate}</h2>
                    <LunchOptionsPanel
                        lunchData={this.props.lunchChoices}
                        clickAction={ this._selectLunch.bind(this) }
                    />
                </Panel>

                <Panel>
                    <SelectedLunchPanel
                        selected={this.state.selected}>
                    </SelectedLunchPanel>
                </Panel>
            </div>
        );
    }
}


class SelectedLunchPanel extends React.Component {

    render() {
        return (
            <div>You selected {this.props.selected}</div>
        );
    }
}



class LunchOptionsPanel extends React.Component {
  render() {

    let lunchOptions = this.props.lunchData.map( (c,i) => (
          <h3 key={i} onClick={e=>this.props.clickAction(c) }>
              <Label>{c}</Label>
          </h3>
    ));

    return (
      <div>
        <Panel header="Please select one" bsStyle="info">
          {lunchOptions}
        </Panel>

      </div>
    );
  }
}

var lunchChoices = ['Chicken', 'Fish', 'Vegetarian'];
ReactDOM.render(
  <LunchApp lunchChoices={lunchChoices} selected="Nothing :("/>,
  document.getElementById('root')
);
