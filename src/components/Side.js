import {
  Box,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FrAdd,
  GrAdd,
  HomeI,
  Lout,
  ProfileI,
  TransI,
  VideoI,
} from "./ColorIcon";
import { encode as base64_encode } from "base-64";
import axios from "axios";

export const Side = ({ mode, setMode }) => {
  const navigate = useNavigate();

  const handleLog = () => {
    localStorage.removeItem("id");
    navigate("/");
  };
  const handleFriend = () => {
    navigate("/friend");
  };
  const handleMessenger = () => {
    axios
      .get(`/loadUserConv/${localStorage.getItem("id")}`)
      .then(function (response) {
        navigate(`/home/${response.data[0].cid}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleGroup = () => {
    navigate(`/group`);
  };
  const handleProfile = () => {
    let encoded = base64_encode(localStorage.getItem("id"));

    navigate(`/profile/${encoded}`);
  };
  const handleVideo = () => {
    navigate("/room");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { i18n } = useTranslation();

  const handleClose = (lng) => {
    setAnchorEl(null);
    localStorage.setItem("lng", lng);
    return i18n.changeLanguage(lng);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = (mode) => {
    setAnchorEl2(null);

    setMode(mode === "dark" ? "dark" : "light");
    localStorage.setItem("mode", mode);
  };

  return (
    <Box
      sx={{
        width: 40,
        height: "100vh",
      }}
    >
      <Box>
        <List style={{ width: "20px" }}>
          <ListItem disablePadding>
            <Tooltip title="Home" placement="right">
              <IconButton onClick={handleMessenger}>
                <HomeI fontSize="large" />
              </IconButton>
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <Tooltip title="Friend" placement="right">
              <IconButton onClick={handleFriend}>
                <FrAdd fontSize="large" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title="Group" placement="right">
              <IconButton onClick={handleGroup}>
                <GrAdd fontSize="large" />
              </IconButton>
            </Tooltip>
          </ListItem>
          <ListItem disablePadding>
            <Tooltip title="Video" placement="right">
              <IconButton onClick={handleVideo}>
                <VideoI fontSize="large" />
              </IconButton>
            </Tooltip>
          </ListItem>

          <ListItem disablePadding>
            <IconButton onClick={handleClick}>
              <TransI fontSize="large" />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleClose("eng")}>English</MenuItem>
              <MenuItem onClick={() => handleClose("vn")}>Tiếng Việt</MenuItem>
            </Menu>
          </ListItem>

          <ListItem disablePadding sx={{}}>
            <IconButton onClick={handleProfile}>
              <ProfileI fontSize="large" />
            </IconButton>
          </ListItem>
          <ListItem disablePadding>
            <IconButton onClick={handleClick2}>
              {mode === "light" ? (
                <Brightness7Icon fontSize="large" sx={{ color: "#008e47" }} />
              ) : (
                <Brightness4Icon fontSize="large" sx={{ color: "#CCFFE6" }} />
              )}
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl2}
              open={open2}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleClose2("light")}>Light</MenuItem>
              <MenuItem onClick={() => handleClose2("dark")}>Dark</MenuItem>
            </Menu>
          </ListItem>

          <ListItem disablePadding onClick={handleLog}>
            <IconButton>
              <Lout fontSize="large" />
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};
