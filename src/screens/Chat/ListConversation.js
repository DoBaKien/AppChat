import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
export const ListConversation = (props) => {
  const [dir, setDir] = useState("");
  const [open, setOpen] = useState(false);
  const id = localStorage.getItem("id");
  useEffect(() => {
    axios
      .get(`/loadConvMem/${props.con.cid}`)
      .then(function (response) {
        var results = response.data.filter(function (word) {
          return word.uid !== id;
        });
        setDir(results[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.con.cid, id]);

  const directC = (type, name) => {
    if (type === "direct") {
      return <Typography>{dir.nickName}</Typography>;
    } else {
      return <Typography>{name}</Typography>;
    }
  };

  const handleSent = () => {
    setOpen(true);
    console.log(props.con.cid);
    axios
      .post("/send", {
        cid: props.con.cid,
        content: props.shareC,
        uid: localStorage.getItem("id"),
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#9999FF",
        height: 50,
        margin: 2,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 10,
      }}
    >
      {directC(props.con.type, props.con.name)}
      <Collapse in={open} sx={{ position: "absolute", right: 0, bottom: 0 }}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 1 }}
        >
          Success
        </Alert>
      </Collapse>
      <Button variant="contained" sx={{ marginLeft: 5 }} onClick={handleSent}>
        Send
      </Button>
    </Box>
  );
};
