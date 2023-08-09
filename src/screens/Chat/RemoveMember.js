import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import swal from "sweetalert";

import { ModalAdd } from "./styled";

function RemoveMember({ setDel, idc, socket, setMembers, setMessageList }) {
  const id = localStorage.getItem("id");
  const [membersR, setMembersR] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(`/loadConvRoleMem/${idc}`)
      .then(function (response) {
        setMembersR(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, idc]);

  const handleAdd = (e) => {
    axios
      .put(`/nRole/${idc}/${id}/${e}`)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRemove = (uid) => {
    swal({
      title: "Are you sure?",
      text: "Remove this member from group",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/leaveGroup/${uid}/${idc}`).then(function (response) {
          swal("Success", "You have leave success", "success").then(() => {
            axios
              .get(`/loadConvMem/${idc}`)
              .then(function (response) {
                setMembers(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
            axios
              .get(`/loadConvRoleMem/${idc}`)
              .then(function (response) {
                setMembersR(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
            axios
              .get(`/receive/${idc}`)
              .then(function (response) {
                setMessageList(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
            axios
              .get(`/loadConv/${idc}`)
              .then(function (response) {
                const addgroup = {
                  room: uid,
                  cid: idc,
                  name: response.data.name,
                  type: response.data.type,
                };
                socket.emit("kick-group", addgroup);
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  return (
    <ModalAdd>
      <Stack sx={{ width: "40vw", marginLeft: 2 }}>
        <Typography variant="h4">{t("Manager member")}</Typography>

        {Array.from(membersR).map((friend) => (
          <Stack
            direction="row"
            key={friend.uid}
            sx={{
              justifyContent: "space-evenly",
              marginTop: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ width: 150 }}>
              <Typography variant="h6">{friend.nickName}</Typography>
            </Box>
            <Box sx={{ width: 80 }}>
              <Typography variant="caption text">Member</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => handleAdd(friend.uid)}
              color="success"
            >
              {t("change")}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleRemove(friend.uid);
              }}
              color="error"
            >
              {t("Remove")}
            </Button>
          </Stack>
        ))}
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 5 }}
          onClick={() => setDel(false)}
        >
          {t("close")}
        </Button>
      </Stack>
    </ModalAdd>
  );
}

export default RemoveMember;
