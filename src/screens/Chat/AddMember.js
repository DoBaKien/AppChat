import { Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { ModalAdd } from "./styled";

function AddMember({ setAddMem, idc, setMembers, socket }) {
  const id = localStorage.getItem("id");
  const [friends, setFriends] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`/loadFriendsToAddConv/${id}/${idc}`).then(function (response) {
      setFriends(response.data);
    });
  }, [id, idc]);

  const handleAdd = (e) => {
    axios
      .post(`/newMems/${idc}`, [e])
      .then(function (response) {
        axios
          .get(`/loadFriendsToAddConv/${id}/${idc}`)
          .then(function (response) {
            setFriends(response.data);
          });
        axios
          .get(`/loadConvMem/${idc}`)
          .then(function (response) {
            setMembers(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        axios
          .get(`/loadConv/${idc}`)
          .then(function (response) {
            const addgroup = {
              room: e,
              cid: idc,
              name: response.data.name,
              type: response.data.type,
            };
            socket.emit("add-group", addgroup);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <ModalAdd>
      <Stack>
        <Typography variant="h4" sx={{ marginLeft: 2 }}>
          {t("Add member")}
        </Typography>
        {Array.from(friends).map((friend) => (
          <Stack direction="row" key={friend.uid} sx={{ marginTop: 2 }}>
            <Box sx={{ width: 150 }}>
              <Typography variant="h6">{friend.nickName}</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => handleAdd(friend.uid)}
              color="success"
            >
              {t("add")}
            </Button>
          </Stack>
        ))}
        <Button
          variant="contained"
          color="error"
          sx={{ marginTop: 5 }}
          onClick={() => setAddMem(false)}
        >
          {t("close")}
        </Button>
      </Stack>
    </ModalAdd>
  );
}

export default AddMember;
