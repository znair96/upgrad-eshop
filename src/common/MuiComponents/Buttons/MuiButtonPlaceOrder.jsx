import { Button } from "@mui/material";
import React from "react";

const MuiButtonPlaceOrder = (props) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type="button"
      disabled={props.disabled}
      sx={{ mt: 2 }}
      onClick={props.onClick}
    >
      Place Order
    </Button>
  );
};

export default MuiButtonPlaceOrder;
