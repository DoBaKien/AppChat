import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

export const BoxUser = styled(Box)(() => ({
  marginTop: 20,
  display: "flex",
  justifyContent: "center",
}));
export const BoxBtn = styled(Box)(() => ({
  height: 80,
  alignItems: "center",
  display: "flex",
  width: 200,
  justifyContent: "center",
}));
export const BoBtn = styled(Button)(() => ({
  color: "#008e47",
  border: "3px solid #008e47",
  borderRadius: 30,
  padding: 8,
  width: 200,
}));
