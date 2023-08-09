import {
  Avatar,
  Box,
  ListItemButton,
  Stack,
  Typography,
  ListItemIcon,
  ListItemText,
  CardMedia,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Img1 from "../../assert/1.jpg";
import { encode as base64_encode } from "base-64";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import swal from "sweetalert";
import axios from "axios";
import ShareIcon from "@mui/icons-material/Share";

export const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "#E8E8E8",
  borderRadius: 8,
  width: "93%",
  height: 40,
  marginTop: 10,
  marginBottom: 5,
}));
export const ModalAdd = styled(Box)(() => ({
  backgroundColor: "#CCCCFF",
  color: "black",
  position: "absolute",
  width: "40vw",
  top: 200,
  left: "30%",
  borderRadius: 20,
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
}));
export const ModalShare = styled(Box)(() => ({
  backgroundColor: "#CCCCFF",
  color: "black",
  position: "absolute",
  height: 500,
  top: 150,
  left: "30%",
  borderRadius: 20,
  zIndex: 999,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
}));
export const BoxHeader = styled(Box)(() => ({
  backgroundColor: "#9999FF",
  width: "100%",
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

export const BoxItema = styled(Box)(() => ({
  overflow: "auto",
  height: "100%",
  flex: 2,
  minWidth: 250,
}));

export const BoxHeaderItem = styled(Box)(() => ({
  width: "100%",
  position: "relative",
  backgroundColor: "#9999FF",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2,
}));
export const ChatCon = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  borderRadius: 8,
  width: "80%",
  height: 35,
}));

export const ListChatButton = styled(ListItemButton)(() => ({
  backgroundColor: "#CCCCFF",
  borderRadius: 20,
  "&:hover": {
    background: "#a4a4ff",
  },
  "&.Mui-selected ": {
    "& .MuiListItemText-root": {
      color: "white",
      backgroundColor: "#9999FF",
      borderRadius: 10,
      paddingLeft: 10,
      fontWeight: "bold",
    },
  },
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));
export const ListMember = (props) => {
  const handleChange = (panel) => (event, newExpanded) => {
    props.setExpanded(newExpanded ? panel : false);
  };

  const handleProfile = (uid) => {
    let encoded = base64_encode(uid);

    props.navigate(`/profile/${encoded}`);
  };
  return (
    <Accordion
      expanded={props.expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Member ({props.members.length})</Typography>
      </AccordionSummary>
      <MuiAccordionDetails sx={{ overflowY: "auto", height: 200 }}>
        {Array.from(props.members).map((member, index) => (
          <ListItemButton key={index} onClick={() => handleProfile(member.uid)}>
            <ListItemIcon>
              <Avatar
                alt="Avatar user"
                src={member.avatar || Img1}
                sx={{ width: 40, height: 40, float: "left" }}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                sx={{ paddingTop: 1 }}
              >
                {member.nickName}
              </Typography>
            </ListItemText>
          </ListItemButton>
        ))}
      </MuiAccordionDetails>
    </Accordion>
  );
};

const idMessage = (id) => {
  let idSend = localStorage.getItem("id");
  return idSend === id;
};

export const ChatContent = styled(Box)(() => ({
  backgroundColor: "#CCCCFF",
  fontSize: "16px",
  maxWidth: 400,
  borderRadius: 10,
  color: "black",
  height: "100%",
  padding: 2,
}));

export const BoxChat = (props) => {
  const handleDelete = (msid, uid) => {
    if (idMessage(uid)) {
      swal({
        title: "Are you sure?",
        text: "Remove this message, CAN'T undo",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`/deleteMessage/${msid}`).then(function (response) {
            swal("Success", "You have delete success", "success").then(() => {
              axios
                .get(`/receive/${props.idc}`)
                .then(function (response) {
                  props.setMessageList(response.data);
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          });
        } else {
          swal("Your message is safe!");
        }
      });
    } else {
      swal("Can't delete message");
    }
  };

  const handleForward = (content) => {
    props.setShareC(content);
    props.setShare(true);
  };

  const test = (content, time, uid, msid) => {
    if (content.length > 1000) {
      return (
        <Box>
          <Box
            style={{
              justifyContent: idMessage(uid) ? "end" : "start",
              display: "flex",
            }}
          >
            <CardMedia
              component="img"
              image={content}
              alt="Paella dish"
              sx={{
                width: { xs: "80%", md: "50%" },
                border: "1px solid gray",
                borderRadius: 5,
              }}
            />
          </Box>
          <Box
            style={{
              justifyContent: idMessage(uid) ? "end" : "start",
              flexDirection: idMessage(props.uid) ? "row-reverse" : "row",
              display: "flex",
            }}
          >
            <Typography sx={{ fontSize: 15, marginTop: 0.8 }}>
              {time}
            </Typography>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleDelete(msid, uid)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleForward(content)}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box>
          <ChatContent>
            <Typography
              component="div"
              sx={{
                wordWrap: "break-word",
                margin: 1,
              }}
            >
              {content}
            </Typography>
          </ChatContent>
          <Box
            style={{
              justifyContent: idMessage(uid) ? "end" : "start",
              flexDirection: idMessage(props.uid) ? "row-reverse" : "row",
              display: "flex",
            }}
          >
            <Typography sx={{ fontSize: 15, marginTop: 0.8 }}>
              {time}
            </Typography>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleDelete(msid, uid)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Forward">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handleForward(content)}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      );
    }
  };
  return (
    <Box
      style={{
        justifyContent: idMessage(props.uid) ? "end" : "start",
        display: "flex",
        alignItems: "flex-end",
        flexDirection: idMessage(props.uid) ? "row-reverse" : "row",
        marginBottom: 10,
      }}
    >
      {Array.from(props.text)
        .filter((word) => word.uid === props.uid)
        .map((number, i) => (
          <Avatar
            key={i}
            alt="Alt"
            src={number.avatar || Img1}
            sx={{ float: "left", marginBottom: 3.5, marginRight: 1 }}
          />
        ))}
      <Stack
        style={{
          marginTop: 10,
          display: "flex",
          alignItems: idMessage(props.uid) ? "end" : "start",
          marginRight: idMessage(props.uid) ? 10 : 0,
          marginLeft: idMessage(props.uid) ? 10 : 0,
        }}
      >
        <Box
          sx={{
            justifyContent: idMessage(props.uid) ? "end" : "start",
            display: "flex",
          }}
        >
          {Array.from(props.text)
            .filter((word) => word.uid === props.uid)
            .map((number, i) => (
              <Typography key={i} component="div" className="nameChat">
                {number.nickName}
              </Typography>
            ))}
        </Box>

        {test(props.content, props.time, props.uid, props.msid)}
      </Stack>
    </Box>
  );
};
