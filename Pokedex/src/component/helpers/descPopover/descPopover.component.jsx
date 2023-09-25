import * as React from "react";
import Popover from "@mui/material/Popover";

import "./descPopover.style.css";

export default function DescPopover({ description, windowSize }) {
  console.log(windowSize);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <p
        style={{
          margin: "0",
          display: "inline",
        }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        Read more
      </p>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div
          className={
            windowSize > 600 ? "popover-modal" : "popover-modal-mobile"
          }
        >
          <p sx={{ p: 1, maxWidth: "400px" }}>{description}</p>
        </div>
      </Popover>
    </div>
  );
}
