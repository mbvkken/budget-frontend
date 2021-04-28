import React from 'react';
import styled from 'styled-components';

const primaryGreen = '#5e8c71';
const Nav = styled.div`
background: ${primaryGreen};
height: 90px;
margin: 0px;
display: grid;
place-items: center;
width: 100%;
  position: fixed;
  bottom: 0;
`;

class BudsjettOversikt extends React.Component {

    render() {
        return (
            <div>
                 <Nav> <h1>push things</h1></Nav>
            </div>
        )
    }
}

export default BudsjettOversikt;