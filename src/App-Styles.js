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
height: 120px;
margin: 0px;
display: grid;
place-items: center;
`;

export const Nav = styled.div`
background: ${primaryGreen};
padding: 1em 0;
margin: 0px;
width: 100vw;
display: flex;
flex-direction: row;
aligns-items: center;
justify-content: space-evenly;
`;

// app
export const PageContain = styled.div`
display: flex;
flex-flow: column wrap;
align-items: center;
min-height: 100vh;
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
