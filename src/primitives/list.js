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
  const { history } = props;
  console.log(history);
  function handleClick(id, tittel) {
    // console.log(budsjettObj);

    const budsjettObj = { budsjettID: id, tittel };
    console.log(budsjettObj);

    // const { budsjett } = state;
    localStorage.setItem("currentBudget", JSON.stringify(budsjettObj));
    // console.log(budsjettObj);
    history.push("/budsjett-detaljer");
  }
  const budID = props.budID;
  const tittel = props.tittel;
  return (
    <HorizontalList>
      <div
        style={{ width: "50%", backgroundColor: "" }}
        onClick={() => handleClick(props.budID, props.tittel)}
      >
        <h3>{props.tittel}</h3>
      </div>
      <BudgetEDMenu budID={props.budID} refreshPage={props.refreshPage} />
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
          height: "50px",
          padding: "0 10px 0px 5px",
          // backgroundColor: "#fbfbfb",
          // borderRadius: "5px",
          borderBottom: " 3px solid rgba(113,127,125,0.49)",
          // boxShadow: "0px 3px 4px 0px #c4c2c2ab",
          // margin: "0px 10px 5px 10px",
        }}
      >
        <h3>{props.tittel}</h3>
        <h3>{props.sum}</h3>
      </GiveSpace>
      <PostEDMenu postID={props.postID} refreshPage={props.refreshPage} />
    </Horiz>
  );
}
