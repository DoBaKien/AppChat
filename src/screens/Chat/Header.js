import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Img1 from "../../assert/1.jpg";
import { MenuI, PhoneI, VideoI } from "../../components/ColorIcon";
import { useEffect, useState } from "react";
import axios from "axios";
import { BoxHeader } from "./styled";

function Header({ show, setShow, idc }) {
  const id = localStorage.getItem("id");
  const [conV, setConV] = useState("");
  const [dir, setDir] = useState("");
  useEffect(() => {
    if (idc !== null) {
      axios
        .get(`/loadConv/${idc}`)
        .then(function (response) {
          setConV(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [id, idc]);
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

  const type = () => {
    if (conV.type === "direct") {
      return (
        <>
          <img
            alt="Avatar"
            src={dir.avatar || Img1}
            style={{ height: 50, marginRight: 10 }}
          />
          <Typography variant="h5">
            {dir.nickName || "name conversation"}
          </Typography>
        </>
      );
    } else {
      return (
        <>
          <img
            alt="Avatar"
            src={Img1}
            style={{ height: 50, marginRight: 10 }}
          />
          <Typography variant="h5">
            {conV.name || "name conversation"}
          </Typography>
        </>
      );
    }
  };

  return (
    <BoxHeader direction="row">
      <Stack direction="row" sx={{ alignItems: "center" }}>
        {type()}
      </Stack>

      <Stack
        direction="row"
        sx={{ display: { xl: "block", sm: "block", xs: "none" } }}
      >
        <Tooltip title="Phone Call">
          <IconButton size="large">
            <PhoneI />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video Call">
          <IconButton size="large">
            <VideoI />
          </IconButton>
        </Tooltip>
        <Tooltip title="Conversation details">
          <IconButton size="large" onClick={() => setShow(!show)}>
            <MenuI />
          </IconButton>
        </Tooltip>
      </Stack>
    </BoxHeader>
  );
}

export default Header;
