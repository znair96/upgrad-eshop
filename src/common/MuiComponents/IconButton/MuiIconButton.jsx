import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import React from "react";

const MuiIconButton = (props) => {
  return (
    <IconButton
      size="small"
      edge="start"
      color="inherit"
      aria-label="menu"
      disableRipple
      onClick={props.onClick}
    >
      <ShoppingCartIcon />
      <Typography variant="body1" component="span">
        upGrad E-Shop
      </Typography>
    </IconButton>
  );
};

export default MuiIconButton;
