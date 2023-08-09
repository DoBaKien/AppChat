import { Card, IconButton, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Typograph = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    float: "left",
  },
}));
export const Typograp = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    float: "left",
  },
}));
export const StackContact = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    justifyContent: "end",
  },
}));
export const CardLeft = styled(Card)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginRight: "4%",
    width: "46%",
    float: "left",
    marginBottom: 10,
  },
}));
export const CardRight = styled(Card)(({ theme }) => ({
  width: "100%",
  marginTop: 10,
  marginBottom: 10,
  [theme.breakpoints.up("sm")]: {
    width: "49%",
    marginTop: 20,
    marginBottom: 10,
  },
}));

export const Camera = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 120,
  left: 125,
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "lightgray",
}));
