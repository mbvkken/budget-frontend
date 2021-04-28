import React from 'react';

class Loggut extends React.Component {
    componentDidMount() {
        const { history } = this.props;
        localStorage.removeItem('bruker_budsjett_token');
        history.replace('/logginn');
    }

render() {
    return(
        <div>Logger ut...</div>
    )
  }
}

export default Loggut;