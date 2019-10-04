import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link , withRouter } from 'react-router-dom';

class Home extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="">
      </div>      
    )
  }
}

const importProps  = (state) =>({
  messages: state.common.messages,
});

const importMethods = (dispatch) =>(bindActionCreators({
}, dispatch));

export default withRouter(connect(importProps, importMethods)(Home));