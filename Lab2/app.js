import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class HelloWorld extends React.Component {
  render() {
    var now = moment(new Date())
      .format('MMMM Do YYYY, h:mm:ss a');

    return (
        <div>
            <h1>Hello World!</h1>
            <h2>The current time is: {now}</h2>
        </div>
    );
  }
}

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById('root')
);
