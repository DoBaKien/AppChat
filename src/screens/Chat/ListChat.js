import { CardMedia, Typography, ListItemText } from "@mui/material";
import Img1 from "../../assert/1.jpg";
import "./Mess.css";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListChatButton } from "./styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export const ListChat = (props) => {
  const navigate = useNavigate();
  const [dir, setDir] = useState("");
  const getIdc = (idc) => {
    var results = props.conV.filter(function (word) {
      return word.cid !== idc;
    });
    results.map((result) => props.socket.emit("ic_leave", result.cid));
    navigate(`/home/${idc}`);
    localStorage.setItem("idc", idc);
    props.socket.emit("join_room", idc);
    props.setAddMem(false);
    props.setDel(false);
  };

  const handleListItemClick = (event, index) => {
    props.setSelectedIndex(index);
    getIdc(index);
  };
  useEffect(() => {
    axios
      .get(`/loadConvMem/${props.cid}`)
      .then(function (response) {
        var results = response.data.filter(function (word) {
          return word.uid !== localStorage.getItem("id");
        });
        setDir(results[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.cid]);
  const directchat = (type, name) => {
    if (type === "direct") {
      return (
        <>
          <ListItemIcon
            sx={{ display: { xs: "none", md: "block" }, marginRight: 2 }}
          >
            <CardMedia
              component="img"
              height="80"
              image={dir.avatar || Img1}
              alt="avatar"
              style={{
                width: "100%",
                float: "left",
              }}
            />
          </ListItemIcon>
          <ListItemText sx={{ color: "black" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="nameChat"
            >
              {dir.nickName}
            </Typography>
            <Typography component="div" className="chatlist">
              {type}
            </Typography>
          </ListItemText>
        </>
      );
    } else {
      return (
        <>
          <ListItemIcon
            sx={{ display: { xs: "none", md: "block" }, marginRight: 2 }}
          >
            <CardMedia
              component="img"
              height="80"
              image={Img1}
              alt="avatar"
              style={{
                width: "100%",
                float: "left",
                marginRight: 10,
              }}
            />
          </ListItemIcon>
          <ListItemText sx={{ color: "black" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="nameChat"
            >
              {name}
            </Typography>
            <Typography component="div" className="chatlist">
              {type}
            </Typography>
          </ListItemText>
        </>
      );
    }
  };
  return (
    <List component="nav" aria-label="main mailbox folders">
      <ListChatButton
        selected={props.selectedIndex === props.cid}
        onClick={(event) => handleListItemClick(event, props.cid)}
      >
        {directchat(props.type, props.name)}
      </ListChatButton>
    </List>
  );
};
