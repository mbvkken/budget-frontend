import styled from 'styled-components';

// colors 
export const primaryGreen = '#5e8c71';
export const secondaryGreen ='#3C5948';
export const offWhite = '#FAF9F6';

// elements 
// header og nav
export const Header = styled.div`
font-family: Arial, Helvetica, sans-serif;
background: ${primaryGreen};
color: ${offWhite};
margin: 0px;
display: grid;
place-items: center;
overflow-y:auto;
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
background-color: ${offWhite};
overflow-x: hidden;
width: 100vw;
/* height: 90vh; */
`;
export const HorizontalList2 = styled.div`
display: grid;
width: 90vw;
/* flex-flow: row nowrap; */
display: grid;
    grid-auto-columns: 1fr 20px;
justify-content: space-between;
align-items: center;
/* height: 90vh; */
`;
export const HorizontalList = styled.div`
display: flex;
width: 90vw;
flex-flow: row nowrap;
justify-content: space-between;
align-items: center;
border-bottom: 2px solid grey;
/* border-bottom: 2px solid grey; */
/* height: 90vh; */
`;
export const Horiz = styled.div`
display: flex;
width: 100%;
flex-flow: row nowrap;
justify-content: center;
align-items: center;
margin: 5px;
/* height: 90vh; */
`;

// app
export const PageContain = styled.div`
display: flex;
flex-flow: column wrap;
align-items: center;
height: 100%;
width: 100vw;

background-color: ${offWhite};
overflow-y: scroll;


`;

// buttons
export const PrimaryButton = styled.button`
    background-color: ${primaryGreen};
    border-style: none;
    color: ${offWhite};
    margin: 1em;
    padding: 1em 2em;
    border-radius: 2em;
    transition: .1s;
    &:active {
    background-color: #7faa91;
    /* border: 0; */
    /* transform: scale(.99); */
    padding: .9em 1.9em;
  }
    &:focus { outline: none; }


`;

//elements

export const Carousel = styled.div`

display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;

/* background-color: red; */
`;


export const BudsjettIcon = styled.div`
    flex: 0 0 auto;
    margin: 5px;
    border: 4px solid ${secondaryGreen};
    box-sizing: border-box;
    border-radius: 10px;
    height: 8em;
    width: 8em;
    display: grid;
    place-items: center;
    `;

export const Containit = styled.div`
  margin: 0 20px;
  width: 85vw;
`;

export const Input = styled.input`
  width: 90%;
  padding: 12px 20px;
  margin: 8px 0;
  font-size: 1em;
  border: 1px solid #ccc;
`;
