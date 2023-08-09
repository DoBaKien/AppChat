import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { BoxItema } from "./styled";
import Img1 from "../../assert/1.jpg";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import { ListMember } from "./styled";
import axios from "axios";
import BlockIcon from "@mui/icons-material/Block";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";

function BoxRightSide({
  setDel,
  del,
  addMem,
  setAddMem,
  idc,
  members,
  setMembers,
}) {
  const [dir, setDir] = useState("");
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const id = localStorage.getItem("id");
  const [conV, setConV] = useState("");
  const [conV1, setConV1] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState("panel1");
  const [typec, setTypeC] = useState("");
  const { t } = useTranslation("");
  useEffect(() => {
    axios.get(`/loadConv/${idc}`).then(function (response) {
      setConV(response.data.name);
      setTypeC(response.data.type);
      setConV1(response.data.name);
      setType(response.data.type);
    });
  }, [idc]);

  useEffect(() => {
    axios
      .get(`/loadConvMem/${idc}`)
      .then(function (response) {
        setMembers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idc, setMembers]);
  useEffect(() => {
    axios.get(`/getUserRole/${id}/${idc}`).then(function (response) {
      setRole(response.data);
    });
  }, [idc, id]);

  const deleteGr = () => {
    swal({
      title: "Are you sure?",
      text: "Remove all members and delete the group? This CANNOT be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/deleteGroup/${idc}`).then(function (response) {
          swal("Success", "You have delete success", "success").then(() => {
            axios
              .get(`/loadUserConv/${id}`)
              .then(function (response) {
                navigate(`/home/${response.data[0].cid}`);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        });
      }
    });
  };

  const handleLeave = () => {
    swal({
      title: "Are you sure?",
      text: "RLeaving group will also delete all that group's message. Do you want to continue?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/leaveGroup/${id}/${idc}`).then(function (response) {
          swal("Success", "You have leave success", "success").then(() => {
            axios
              .get(`/loadUserConv/${id}`)
              .then(function (response) {
                navigate(`/home/${response.data[0].cid}`);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        });
      }
    });
  };

  const handleEditName = () => {
    if (conV1 !== "") {
      axios
        .put(`/updateConvName/${idc}/${conV1}`)
        .then(function (response) {
          swal("Success!", "You have edit success!", "success").then(() => {
            window.location.reload(false);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      setOpen(false);
    }
  };

  const typeConv = () => {
    if (type === "direct") {
      return (
        <Box sx={{ marginTop: 1, marginBottom: 1, height: "100vh" }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent style={{ float: "left", marginTop: 2 }}>
                <BlockIcon fontSize="small" />
              </CardContent>
              <CardContent>
                <Typography gutterBottom variant="body1" component="div">
                  {t("Block")}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      );
    } else if (type === "group" && role === "Member") {
      return (
        <Box>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={handleLeave}>
                <CardContent style={{ float: "left", marginTop: 2 }}>
                  <ExitToAppIcon fontSize="small" />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {t("Leave conversation")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <ListMember
            navigate={navigate}
            members={members}
            setExpanded={setExpanded}
            expanded={expanded}
          />
        </Box>
      );
    } else {
      return (
        <Box>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => setOpen(!open)}>
                <CardContent style={{ float: "left", marginTop: 3 }}>
                  <EditIcon fontSize="small" />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {t("Edit Name Conversation")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={deleteGr}>
                <CardContent style={{ float: "left", marginTop: 2 }}>
                  <ExitToAppIcon fontSize="small" />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {t("Delete Group")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => setAddMem(!addMem)}>
                <CardContent style={{ float: "left", marginTop: 2 }}>
                  <PersonAddAlt1Icon fontSize="small" />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {t("Add Member")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <Box sx={{ marginTop: 1, marginBottom: 1 }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => setDel(!del)}>
                <CardContent style={{ float: "left", marginTop: 2 }}>
                  <PersonAddAlt1Icon fontSize="small" />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="body1" component="div">
                    {t("Manage Member")}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
          <ListMember
            navigate={navigate}
            members={members}
            setExpanded={setExpanded}
            expanded={expanded}
          />
        </Box>
      );
    }
  };

  useEffect(() => {
    axios
      .get(`/loadConvMem/${idc}`)
      .then(function (response) {
        var results = response.data.filter(function (word) {
          return word.uid !== localStorage.getItem("id");
        });
        setDir(results[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idc]);

  const typeasd = () => {
    if (typec === "direct") {
      return (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="Avatar user"
              src={dir.avatar || Img1}
              sx={{ width: 80, height: 80 }}
            />
          </Box>
          <Typography variant="h4" display={open ? "none" : "block"}>
            {dir.nickName}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Avatar
              alt="Avatar user"
              src={Img1}
              sx={{ width: 80, height: 80 }}
            />
          </Box>
          <Typography variant="h4" display={open ? "none" : "block"}>
            {conV}
          </Typography>
          <Box display={open ? "block" : "none"}>
            <TextField
              variant="outlined"
              size="small"
              value={conV1}
              sx={{ width: "100%" }}
              onChange={(e) => setConV1(e.target.value)}
            />
            <Box
              direction="row"
              sx={{
                marginTop: 2,
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              <Button
                variant="outlined"
                sx={{ width: "30%", height: 40 }}
                color="error"
                onClick={() => setOpen(false)}
              >
                {t("Exit")}
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "30%", height: 40 }}
                color="success"
                onClick={handleEditName}
              >
                {t("Apply")}
              </Button>
            </Box>
          </Box>
        </>
      );
    }
  };

  return (
    <BoxItema sx={{ display: { xs: "none", sm: "block" } }}>
      <Box sx={{ marginTop: 3, textAlign: "center" }} direction="column">
        {typeasd()}
      </Box>
      <Box sx={{ marginTop: 5 }}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardContent style={{ float: "left", marginTop: 2 }}>
              <NotificationsIcon fontSize="small" />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="body1" component="div">
                {t("Mute conversation")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      {typeConv()}
    </BoxItema>
  );
}

export default BoxRightSide;
