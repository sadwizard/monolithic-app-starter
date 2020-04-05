import React from 'react';
import { Route, Link , Redirect , withRouter, Switch } from 'react-router-dom';
import Home from '../Home';
import observer from 'helpers/observer';

import './index.sass';

@observer({
  loaders: 'app.loaders'
}, ['initApp'])
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initApp('sdlkfjslkdfjk');
  }

  render() {
    return (
      <div className="root">
        <p className="text">Hello sick sad world!</p>
      </div>
    );
  };
}
