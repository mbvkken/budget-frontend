import React, { useState } from "react";
import styled from "styled-components";
import { Body, Horiz, HorizontalList } from "../App-Styles";
import { ReactComponent as Hus } from "../logos/hjem.svg";
import EditDeleteMenu from "../primitives/edDelMenu";

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
      <EditDeleteMenu budID={props.key} />
    </HorizontalList>
  );
}

export function ListPosts(props) {
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
    console.log(isActive);
  };

  const GiveSpace = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;
    /* margin: 0 10px 0 10px; */
  `;

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
      <EditDeleteMenu budID={props.key} />
    </Horiz>
  );
}
