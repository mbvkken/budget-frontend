import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Horiz,
  PrimaryButton,
  SecondaryButton,
  SecondaryButtonSmall,
  EditMenuContain,
} from "../App-Styles";
import styled from "styled-components";
import { deleteBudget } from "../services/budget";
import { sletteKategori } from "../services/kategori";
import { sletteBudsjettpost } from "../services/budsjettpost";

import { EditBud, EditKat, EditPost } from "../primitives/editDeleteElements";

export function BudgetEDMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  async function handleDeleteBudgetClick() {
    const id = props.budID;
    console.log(id);
    if (!window.confirm("u sure?")) {
      return;
    }

    try {
      await deleteBudget(id);
      // const { history } = this.props;
      // history.push("/");
    } catch (error) {
      console.log("sletting av budsjett feilet...", error);
    }
  }

  return (
    <Horiz>
      <EditMenuContain toggle={isOpen}>
        <SecondaryButtonSmall onClick={handleDeleteBudgetClick}>
          Slett
        </SecondaryButtonSmall>
        {/* <PrimaryButton>Rediger</PrimaryButton> */}
        <EditBud budID={props.budID} />
      </EditMenuContain>
      <IconButton style={{ paddingLeft: "3px" }} onClick={toggle}>
        <MoreVertIcon />
      </IconButton>
    </Horiz>
  );
}

export function KatEDMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  async function handleDeleteKatClick() {
    const id = props.katid;
    console.log(id);
    if (!window.confirm("u sure?")) {
      return;
    }

    try {
      await sletteKategori(id);
      // const { history } = this.props;
      // history.push("/");
    } catch (error) {
      console.log("sletting av budsjett feilet...", error);
    }
    props.refreshPage();
  }

  return (
    <Horiz>
      <EditMenuContain toggle={isOpen}>
        <SecondaryButtonSmall onClick={handleDeleteKatClick}>Slett</SecondaryButtonSmall>
        <EditKat katid={props.katid} refreshPage={props.refreshPage} />
      </EditMenuContain>
      <IconButton style={{ padding: "3px" }} onClick={toggle}>
        <MoreVertIcon />
      </IconButton>
    </Horiz>
  );
}

export function PostEDMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  async function handleDeletePostClick() {
    const id = props.postID;
    console.log(id);
    if (!window.confirm("u sure?")) {
      return;
    }

    try {
      await sletteBudsjettpost(id);
      // const { history } = this.props;
      // history.push("/");
    } catch (error) {
      console.log("sletting av budsjett feilet...", error);
    }
    props.refreshPage();
  }

  return (
    <Horiz>
      <EditMenuContain toggle={isOpen}>
        <SecondaryButtonSmall onClick={handleDeletePostClick}>Slett</SecondaryButtonSmall>
        <EditPost postID={props.postID} refreshPage={props.refreshPage} />
      </EditMenuContain>
      <IconButton style={{ padding: "3px" }} onClick={toggle}>
        <MoreVertIcon />
      </IconButton>
    </Horiz>
  );
}
