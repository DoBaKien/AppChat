import { Box, Stack } from "@mui/material";
import { Side } from "../../components/Side";
import { useEffect, useState } from "react";
import "./Mess.css";
import Chat from "./Chat";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import SideList from "./SideList";
import BoxRightSide from "./BoxRightSide";
import axios from "axios";
import AddMember from "./AddMember";
import RemoveMember from "./RemoveMember";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import ShareMessage from "./ShareMessage";

function Mess({ mode, setMode, socket }) {
  const [show, setShow] = useState(false);
  const id = localStorage.getItem("id");
  const [conV, setConV] = useState("");
  const idc = useParams().id;
  const [addMem, setAddMem] = useState(false);
  const [del, setDel] = useState(false);
  const [share, setShare] = useState(false);
  const [shareC, setShareC] = useState("");
  const [testE, setTestE] = useState([]);
  const [members, setMembers] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit("join_room", id);
    socket.emit("join_room", idc);

    axios
      .get(`/loadUserConv/${id}`)
      .then(function (response) {
        setConV(response.data);
        socket.on("kicked-group", (data) => {
          const result = response.data.filter((word) => word.cid !== data.cid);
          setConV(result);
          axios
            .get(`/loadUserConv/${response.data}`)
            .then(function (response) {
              navigate(`/home/${response.data[0].cid}`);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
        var doneTasks = response.data.filter(function (task) {
          return task.cid === idc;
        });

        setTestE(doneTasks);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id, socket, idc, navigate]);
  useEffect(() => {
    socket.on("new-group", (data) => {
      setConV((list) => [...list, data]);
    });
  }, [socket]);

  const { t } = useTranslation();
  const errorC = () => {
    if (testE.length === 1) {
      return (
        <Box
          bgcolor={"background.default"}
          color={"text.primary"}
          sx={{ overflow: "hidden", height: "100vh" }}
        >
          <Stack direction="row" justifyContent="space-evenly" spacing={1}>
            <Side setMode={setMode} mode={mode} />
            <SideList
              t={t}
              conV={conV}
              socket={socket}
              setAddMem={setAddMem}
              setDel={setDel}
            />
            <Box
              sx={{
                flex: { xl: 6, md: 10, sm: 20, xs: 6 },
                minWidth: 100,
              }}
            >
              <Box>
                <Header show={show} setShow={setShow} idc={idc} conV={conV} />
              </Box>
              <Box>
                {addMem && (
                  <AddMember
                    setAddMem={setAddMem}
                    idc={idc}
                    setMembers={setMembers}
                    socket={socket}
                  />
                )}
                {share && (
                  <ShareMessage idc={idc} setShare={setShare} shareC={shareC} />
                )}
                {del && (
                  <RemoveMember
                    idc={idc}
                    setDel={setDel}
                    socket={socket}
                    setMembers={setMembers}
                    setMessageList={setMessageList}
                  />
                )}
                <Chat
                  setShareC={setShareC}
                  setShare={setShare}
                  idc={idc}
                  conV={conV}
                  socket={socket}
                  addMem={addMem}
                  del={del}
                  setMessageList={setMessageList}
                  messageList={messageList}
                  setUser={setUser}
                  user={user}
                />
              </Box>
            </Box>
            {show && (
              <BoxRightSide
                setMembers={setMembers}
                members={members}
                idc={idc}
                setAddMem={setAddMem}
                addMem={addMem}
                del={del}
                setDel={setDel}
              />
            )}
          </Stack>
        </Box>
      );
    } else {
      return <NotFound />;
    }
  };

  return <>{errorC()}</>;
}

export default Mess;
