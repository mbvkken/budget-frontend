import React from 'react';
import { Nav, Body } from '../App-Styles';
import { Link } from 'react-router-dom';

class BudsjettLink extends React.Component {
constructor(props){
  super(props)
}
render() {
    const id = this.props.match.params.id;
    console.log(this.props.match.params)
        return (
            <div>                            
              Hello {id}!
            </div>
        )
    
}
}

export default BudsjettLink;