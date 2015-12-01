import React from 'react';
import ReactDOM from 'react-dom';
import Panel from 'react-bootstrap/lib/Panel';
import Label from 'react-bootstrap/lib/Label';


class LunchOptionsPanel extends React.Component {

    render() {
        return (
            <h3><Label>{this.props.name}</Label></h3>
        );
    }

}

class LunchApp extends React.Component {

    render() {

        let lunchChoices = this.props.lunchChoices.map(c => <LunchOptionsPanel name={c} />);

        return (
            <div>
                <Panel>
                    <h2>Options for lunch:</h2>
                    {lunchChoices}
                </Panel>
            </div>
        );
    }

}

var lunchChoices = ['pizza', 'bacon', 'ribs'];


ReactDOM.render(
  <LunchApp lunchChoices={ lunchChoices }/>,
  document.getElementById('root')
);
