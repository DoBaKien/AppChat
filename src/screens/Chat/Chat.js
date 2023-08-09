import {
  Box,
  CircularProgress,
  Fade,
  IconButton,
  InputBase,
  Stack,
  Tooltip,
} from "@mui/material";
import { BoxChat, BoxHeaderItem, ChatCon } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { ImageI, SendI, EmojiI, PetI, GifI } from "../../components/ColorIcon";
import ScrollToBottom from "react-scroll-to-bottom";
import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import Picker from "emoji-picker-react";
function Chat({
  idc,
  socket,
  conV,
  addMem,
  del,
  setMessageList,
  messageList,
  setUser,
  user,
  setShareC,
  setShare,
}) {
  const [loading, setLoading] = useState(true);
  const id = localStorage.getItem("id");
  const [showPicker, setShowPicker] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [pic, setPic] = useState("");

  const [input, setInput] = useState("");
  const [hi, setHi] = useState(60);

  useEffect(() => {
    axios
      .get(`/receive/${idc}`)
      .then(function (response) {
        setMessageList(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idc, setLoading, setMessageList]);

  useEffect(() => {
    axios
      .get(`/loadConvMem/${idc}`)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [idc, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHi(60);
    setPic("");
    if (currentMessage !== "") {
      axios
        .post("/send", {
          cid: idc,
          content: currentMessage,
          uid: id,
        })
        .catch(function (error) {
          console.log(error);
        });
      var results = user.filter(function (word) {
        return word.uid !== id;
      });
      var results2 = conV.filter(function (word) {
        return word.cid === idc;
      });

      results.map((result) =>
        socket.emit("send-notification", {
          room: result.uid,
          conV: results2[0].name,
          uid: id,
          content: currentMessage,
        })
      );

      const messageData = {
        room: idc,
        uid: id,
        content: currentMessage,
        sentTime:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      setMessageList((list) => [...list, messageData]);

      await socket.emit("send_message", messageData);
    }
    setInput("");
    setCurrentMessage("");
    setShowPicker(false);
    setHi(60);
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket, setMessageList]);
  const onChangeImg = (e) => {
    if (e !== "") {
      setHi(300);
      const files = e.target.files;
      const file = files[0];
      getBase64(file);
    }
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const onLoad = (fileString) => {
    setCurrentMessage(fileString);
    setPic(fileString);
  };
  const ROOT_CSS = css({
    height: "100%",
    width: "100%",
    behavior: "smooth",
  });
  const onEmojiClick = (emojiObject) => {
    setInput((prevInput) => prevInput + emojiObject.emoji);
    setCurrentMessage((prevInput) => prevInput + emojiObject.emoji);
  };

  return (
    <Box className={addMem === true || del === true ? "bg" : ""}>
      <Stack
        direction="column"
        sx={{
          height: "85vh",
        }}
      >
        <Fade
          in={loading}
          size="100px"
          style={{
            transitionDelay: loading ? "800ms" : "0ms",
            position: "absolute",
            top: "40%",
            left: "60%",
            zIndex: 2,
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
        <ScrollToBottom className={ROOT_CSS} initialScrollBehavior="smooth">
          {Array.from(messageList).map((messageContent, i) => (
            <BoxChat
              text={user}
              key={i}
              idc={idc}
              setShareC={setShareC}
              setShare={setShare}
              uid={messageContent.uid}
              content={messageContent.content}
              time={messageContent.sentTime}
              msid={messageContent.msid}
              setMessageList={setMessageList}
            />
          ))}
        </ScrollToBottom>
      </Stack>

      <form noValidate autoComplete="off" onSubmit={handleSubmit} id="myForm">
        <BoxHeaderItem direction="column" sx={{ height: hi, bottom: hi - 60 }}>
          {pic && (
            <Box
              sx={{
                width: { xs: 200, md: 300 },
                height: { xs: 200, md: 240 },
                position: "absolute",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  color: "black",
                  backgroundColor: "white",
                }}
                onClick={() => {
                  setPic("");
                  setCurrentMessage("");
                  setHi(60);
                }}
              >
                <CloseIcon />
              </IconButton>
              <img
                alt=""
                src={pic}
                style={{
                  border: "1px solid black",
                  height: "100%",
                }}
              />
            </Box>
          )}
          {showPicker && (
            <div className="emoji">
              <Picker
                height={240}
                searchDisabled={true}
                onEmojiClick={onEmojiClick}
                emojiStyle="google"
              />
            </div>
          )}
          <Stack
            direction="row"
            sx={{
              width: "100%",
              position: "absolute",
              bottom: 10,
            }}
          >
            <Stack direction="row" gap={1}>
              <Tooltip title="Attach a file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={onChangeImg}
                  />
                  <ImageI />
                </IconButton>
              </Tooltip>
              <Tooltip title="Gif">
                <IconButton
                  sx={{
                    display: { xl: "flex", md: "flex", sm: "none", xs: "none" },
                  }}
                >
                  <GifI />
                </IconButton>
              </Tooltip>
            </Stack>
            <ChatCon>
              <InputBase
                value={input}
                sx={{
                  flex: 1,
                  width: "100%",
                  color: "black",
                  borderRadius: 8,
                }}
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                  setInput(e.target.value);
                }}
              />
            </ChatCon>
            <Stack direction="row" gap={1}>
              <Tooltip title="Stickers">
                <IconButton
                  sx={{
                    display: { xl: "flex", md: "flex", sm: "none", xs: "none" },
                    color: "#009999",
                  }}
                >
                  <PetI />
                </IconButton>
              </Tooltip>
              <Tooltip title="Emoji">
                <IconButton
                  onClick={() => {
                    setShowPicker((val) => !val);
                    setHi(hi === 300 ? 60 : 300);
                  }}
                >
                  <EmojiI />
                </IconButton>
              </Tooltip>
              <Tooltip title="Send Messenger">
                <IconButton type="Submit">
                  <SendI />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </BoxHeaderItem>
      </form>
    </Box>
  );
}

export default Chat;
