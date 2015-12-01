import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import Bootstrap from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Panel from 'react-bootstrap/lib/Panel'
import Input from 'react-bootstrap/lib/Input'
import Label from 'react-bootstrap/lib/Label'
import ReactTransitionGroup from 'react/lib/ReactCSSTransitionGroup.js';

class LunchApp extends React.Component {
  render() {
    var now = new Date();
    var formattedDate = moment(now).format('MMMM Do YYYY');
    return (
      <div>
        <Panel>
          <h2>Options for lunch for {formattedDate}:</h2>
          <LunchOptionsPanel lunchData={this.props.lunchChoices}> </LunchOptionsPanel>
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
  render() {
    let clickHandler = this.handleClick;
    let lunchOptions = this.props.lunchData.map(function(c,i) {
      return <h3 key={i} onClick={clickHandler}><Label>{c}</Label></h3>
    });
    return (
      <div>
        <Panel header="Please select one" bsStyle="info">
          {lunchOptions}
        </Panel>

        <SelectedLunchPanel  selectedLunch={this.state.selectedLunch}></SelectedLunchPanel>
      </div>
    );
  }
}

class SelectedLunchPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var selectLunchMarkup = <Label key={this.props.selectedLunch}>{this.props.selectedLunch}</Label>;
    return (
      <div>
        <Panel header="You've picked" bsStyle="warning">
          <ReactTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {selectLunchMarkup}
        </ReactTransitionGroup>

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
