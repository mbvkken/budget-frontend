import styled from 'styled-components';

// colors 
export const primaryGreen = '#5e8c71';
export const offWhite = '#FAF9F6';

// elements
// header og nav
export const Header = styled.div`
font-family: Arial, Helvetica, sans-serif;
background: ${primaryGreen};
color: ${offWhite};
/* height: 120px; */
margin: 0px;
display: grid;
place-items: center;
`;

export const Nav = styled.div`
background: ${primaryGreen};
/* padding: 1em 0; */
margin: 0px;
width: 100vw;
height: 100%;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
/* position: fixed; */
  /* bottom: 0; */
`;

export const Body = styled.div`
/* background-color: ${offWhite}; */
/* height: 90vh; */
`

// app
export const PageContain = styled.div`
display: flex;
flex-flow: column wrap;
align-items: center;
height: 100%;
background-color: ${offWhite};


`;

// buttons
export const PrimaryButton = styled.button`
    background-color: ${primaryGreen};
    border-style: none;
    color: ${offWhite};
    margin: 1em;
    padding: 1em 2em;
    border-radius: 2em;
`;

//elements

export const BudsjettIcon = styled.div`
  border: 1px solid grey;
  height: 10em;
  width: 10em;
  background-color: pink;
  `