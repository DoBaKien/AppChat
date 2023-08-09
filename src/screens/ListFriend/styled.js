import { Box, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";

export const Chap = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#F5F5F5",
  padding: 20,
  textAlign: "center",
  margin: 5,
  fontSize: 20,
  borderRadius: 15,
  "&:hover": {
    transition: "0.3s",
    opacity: "0.8",
  },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
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
export const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "#E8E8E8",
  borderRadius: 8,
  width: "60%",
  height: 40,
  marginTop: 10,
  marginBottom: 5,
  paddingLeft: 10,
}));
