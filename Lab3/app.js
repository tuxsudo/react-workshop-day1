import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import {Button, Jumbotron} from 'react-bootstrap';

class HelloWorld extends React.Component {
  render() {
    var now = new Date();
    var formattedDate = moment(now).format('MMMM Do YYYY, h:mm:ss A');
    return (
        <Jumbotron>
            <h1>Welcome to Fort Lauderdale!</h1>
            <p>The current time is: {formattedDate}</p>
            <Button>Learn More</Button>
        </Jumbotron>
    );
  }
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('root')
);
