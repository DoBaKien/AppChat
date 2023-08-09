import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import Ava from "../../assert/1.jpg";

import { useTranslation } from "react-i18next";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";
import { Chap } from "../ListFriend/styled";
import Header from "./Header";
function Content() {
  const { t } = useTranslation();
  const [friendSent, setFriendSent] = useState("");
  const id = localStorage.getItem("id");
  const [search, setSearch] = useState("");
  useEffect(() => {
    axios
      .get(`/findSentRequests/${id}`)
      .then(function (response) {
        setFriendSent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  const handleReject = (e) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/deleteRequest/${id}/${e}`).then((res) => {
          swal("Success", "Delete success", "success").then(() => {
            axios
              .get(`/findSentRequests/${id}`)
              .then(function (response) {
                setFriendSent(response.data);
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
      <Typography variant="h3">{t("Friends Sent")}</Typography>
      <Header t={t} setSearch={setSearch} />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {Array.from(friendSent)
          .filter(ser)
          .map((friend, index) => (
            <Grid item xs={12} sm={5} md={6} xl={3} key={index}>
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
                <Tooltip title="Cancel" placement="top">
                  <IconButton
                    size="large"
                    onClick={() => handleReject(friend.uid)}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Chap>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Content;
