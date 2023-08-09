import { Box, InputBase, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import addNotification from "react-push-notification";
import Img1 from "../../assert/1.jpg";
import { ListChat } from "./ListChat";
import { Search } from "./styled";

function SideList(props) {
  const [noti, setNoti] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [search, setSearch] = useState("");
  useEffect(() => {
    props.socket.on("new-notification", (data) => {
      setNoti(data);
    });
  }, [props.socket]);

  if (noti !== "") {
    axios.get(`getUser/${noti.uid}`).then(function (response) {
      if (noti.content.length < 1000) {
        addNotification({
          title: `${response.data.nickName} in ${noti.conV}`,
          message: noti.content,
          duration: 4000,
          icon: response.data.avatar || Img1,
          native: true,
          onClick: () => setNoti(""),
        });
      } else {
        addNotification({
          title: `${response.data.nickName} in ${noti.conV}`,
          message: "Has send photo",
          duration: 4000,
          icon: response.data.avatar || Img1,
          native: true,
          onClick: () => setNoti(""),
        });
      }
      setNoti("");
    });
  }
  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };
  return (
    <Box
      sx={{
        overflowY: "scroll",
        overflow: "hidden",
        flex: 2,
        minWidth: 120,
        height: "100vh",
      }}
    >
      <Search>
        <InputBase
          sx={{ ml: 1, flex: 1, fontSize: 22 }}
          fullWidth
          placeholder={props.t("Search...")}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </Search>

      <Stack
        spacing={0.1}
        sx={{
          marginTop: 0.5,
          overflowY: "auto",
          height: "93vh",
        }}
      >
        {Array.from(props.conV)
          .filter(ser)
          .map((number) => {
            return (
              <ListChat
                noti={noti}
                conV={props.conV}
                setIdc={props.setIdc}
                key={number.cid}
                name={number.name}
                type={number.type}
                cid={number.cid}
                socket={props.socket}
                setSelectedIndex={setSelectedIndex}
                selectedIndex={selectedIndex}
                setAddMem={props.setAddMem}
                setDel={props.setDel}
              />
            );
          })}
      </Stack>
    </Box>
  );
}

export default SideList;
