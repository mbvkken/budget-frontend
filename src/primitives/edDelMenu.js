import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditKat from "../primitives/editDeleteElements";
import { Horiz } from "../App-Styles";

export default function EditDeleteMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    toggleChild();
    <EditKat katID={"eyoo" /*props.katid*/} isOpen={"jello"} />;
    handleClose();
  };

  function toggleChild() {
    setOpen(!open);
    // console.log(open);
  }

  return (
    <div>
      {/* <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Open Menu
      </Button> */}
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Horiz>
          <MenuItem onClick={handleEdit}>Rediger</MenuItem>
          <MenuItem onClick={handleClose}>Slett</MenuItem>
        </Horiz>
      </Menu>
    </div>
  );
}
