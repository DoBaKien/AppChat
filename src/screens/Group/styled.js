import { Box, Button, Paper, styled } from "@mui/material";

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
  justifyContent: "center",
  alignItems: "center",
  height: 250,
}));

export const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "#E8E8E8",
  borderRadius: 8,

  height: 40,
}));
export const ModalAdd = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#F5F5F5",
  color: "black",
  position: "absolute",
  top: 200,
  borderRadius: 20,
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  padding: 20,
}));
export const BoxChoose = styled(Box)(() => ({
  overflow: "auto",
  paddingTop: 5,
}));
export const BtnModal = styled(Button)(() => ({
  width: "40%",
  borderRadius: 30,
  height: 50,
  fontSize: 20,
  color: "white",
  marginTop: 20,
}));
