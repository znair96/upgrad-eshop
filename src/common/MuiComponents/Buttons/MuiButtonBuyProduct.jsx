import { Button } from "@mui/material";
import React from "react";

const MuiButtonBuyProduct = (props) => {
  return (
    <Button size="small" variant="contained" onClick={props.onClick}>
      {props.value}
    </Button>
  );
};

export default MuiButtonBuyProduct;
