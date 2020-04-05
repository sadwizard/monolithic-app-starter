import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import storeItems from 'store/actions';

const storeActions = storeItems.actions;

function observer (props, actions) {
  return (Component) => {
    if (typeof props !== 'object' || typeof actions !== 'object')
      throw new Error(`Props or actions had\'t been passed [${Component.name}]`)

    const importProps = function(state){
      const injectProps = {}
      const newProps = props || {}
      Object.keys(newProps).map(key => {
        const path = newProps[key].split('.')
        injectProps[key] = state[path[0]][path[1]]
      })

      return injectProps;
    }

    const importMethods = (dispatch) => {
      const injectMethods = {};
      (actions || []).map(action => {
        if (!storeActions[action])
          throw new Error(`Action with that name not found [${Component.name}]`)

        injectMethods[action] = storeActions[action]
      });
      return bindActionCreators(injectMethods, dispatch)
    };

    return withRouter(connect(importProps , importMethods)(Component));
  }
}

export default observer
