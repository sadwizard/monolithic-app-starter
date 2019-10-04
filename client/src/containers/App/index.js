import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Link , Redirect , withRouter, Switch } from 'react-router-dom';
import Home from '../Home';

import Api from 'api/api';
import {
  appLoaded,
  initApp,
  setMessage,
} from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initApp();
  }

  render() {
    return (
      <div>
        <p style={{ textAlign: 'center', margin: '20px' }}>Hello sick sad world!</p>
        <Route exact path='/' component={Home} />
      </div>
    );
  };
}

App.propTypes = {
  loaders: PropTypes.object,
  setMessage: PropTypes.func,
  initApp: PropTypes.func,
};

const importProps = function(state){
  return {
    loaders: state.common.loaders,
  }
} 

const importMethods = (dispatch) => bindActionCreators({
  initApp,
  setMessage,
}, dispatch);

export default withRouter(connect(importProps , importMethods)(App));
