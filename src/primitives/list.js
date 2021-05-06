import React, { useState } from "react";
import styled from "styled-components";
import { Body, Horiz, HorizontalList, GiveSpace } from "../App-Styles";
import { ReactComponent as Hus } from "../logos/hjem.svg";
import { PostEDMenu, BudgetEDMenu } from "../primitives/edDelMenu";

export default function ListBudsjett(props) {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive);
  };

  return (
    <HorizontalList>
      <h3>{props.tittel}</h3>
      {/* <button onClick={handleToggle}>click</button> */}
      <BudgetEDMenu budID={props.budID} />
    </HorizontalList>
  );
}

export function ListPosts(props) {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive);
  };

  return (
    <Horiz>
      <GiveSpace
        style={{
          padding: "0 10px 0px 5px",
          backgroundColor: "#fbfbfb",
          borderRadius: "5px",
          boxShadow: "0px 3px 4px 0px #c4c2c2ab",
          // margin: "0px 10px 5px 10px",
        }}
      >
        <h3>{props.tittel}</h3>
        <h3>{props.sum}</h3>

        {/* <button onClick={handleToggle}>click</button> */}
      </GiveSpace>
      <PostEDMenu postID={props.postID} refreshPage={props.refreshPage} />
    </Horiz>
  );
}
// return(

//   <HorizontalList >
// <p>{props.tittel}</p>
// <p>{props.sum}</p>

// {/* <button onClick={handleToggle}>click</button> */}
// <EditDeleteMenu  budID={props.key}/>
// </HorizontalList>
// )

// }
