import React from 'react';
import { Route, Link , Redirect, Switch } from 'react-router-dom';
import Home from '../Home';
import observer from 'helpers/observer';

import './index.sass';

@observer({
  loaders: 'app.loaders',
  token: 'app.token'
}, ['app.initApp', 'app.thunkInitApp'])
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.thunkInitApp('sdlkfjslkdfjk');
  }

  render() {
    return (
      <div className="root">
        <p className="text">Hello sick sad world!</p>
      </div>
    );
  };
}
