import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Ava from "../../assert/1.jpg";
import { Chap } from "./styled";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MessageIcon from "@mui/icons-material/Message";
import swal from "sweetalert";
import { encode as base64_encode } from "base-64";
import Header from "./Header";

function Friend() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [friends, setFriends] = useState("");
  const [search, setSearch] = useState("");
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`/findUserFriends/${id}`)
      .then(function (response) {
        setFriends(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleProfile = (id) => {
    let encoded = base64_encode(id);
    navigate(`/profile/${encoded}`);
  };

  const handleChat = (fid) => {
    axios
      .get(`/startDirectChat/${fid}/${id}`)
      .then(function (response) {
        navigate(`/home/${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteFriend = (uid) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/removeFriend/${id}/${uid}`).then((res) => {
          swal("Success", "Delete success", "success").then(() => {
            axios
              .get(`/findUserFriends/${id}`)
              .then(function (response) {
                setFriends(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        });
      }
    });
  };
  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.nickName.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };
  return (
    <Box sx={{ textAlign: "center", marginTop: 3 }}>
      <Typography variant="h3">{t("All Friends")}</Typography>
      <Header t={t} setSearch={setSearch} search={search} />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {Array.from(friends)
          .filter(ser)
          .map((friend, index) => (
            <Grid xs={12} md={6} sm={6} xl={3} item key={index}>
              <Chap
                elevation={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={Ava}
                    sx={{ float: "left", marginRight: 2 }}
                  />
                  {friend.nickName}
                </Box>
                <Box>
                  <Tooltip title="Chat" placement="top">
                    <IconButton
                      size="large"
                      onClick={() => handleChat(friend.uid)}
                    >
                      <MessageIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Profile" placement="top">
                    <IconButton
                      size="large"
                      onClick={() => handleProfile(friend.uid)}
                    >
                      <AccountBoxIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete" placement="top">
                    <IconButton
                      size="large"
                      color="error"
                      onClick={() => deleteFriend(friend.uid)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Chap>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Friend;
