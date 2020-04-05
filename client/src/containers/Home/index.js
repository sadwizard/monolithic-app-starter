import React from 'react';
import observer from 'helpers/observer';

@observer({ messages: 'app.messages' }, [])
export default class Home extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="root">
        home
      </div>
    )
  }
}
