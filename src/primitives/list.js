import React, { useState } from 'react';
import styled from 'styled-components';
import { Body, HorizontalList } from '../App-Styles';
import { ReactComponent as Hus } from '../logos/hjem.svg';
import EditDeleteMenu from '../primitives/edDelMenu';

export default function ListBudsjett(props){
    const [isActive, setActive] = useState("false");
    const handleToggle = () => {
      setActive(!isActive);
      console.log(isActive)
    };

return(

    <HorizontalList>
<h3>{props.tittel}</h3>
{/* <button onClick={handleToggle}>click</button> */}
<EditDeleteMenu  budID={props.key}/>
</HorizontalList>
)

}

export  function ListPosts(props){
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive)
  };

return(

  <HorizontalList >
<p>{props.tittel}</p>
<p>{props.sum}</p>


{/* <button onClick={handleToggle}>click</button> */}
<EditDeleteMenu  budID={props.key}/>
</HorizontalList>
)

}