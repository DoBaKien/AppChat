import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Img1 from "../../assert/1.jpg";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { BoxUser } from "../ListFriend/styled";
import { encode as base64_encode } from "base-64";
import Header from "./Header";
import { useTranslation } from "react-i18next";

function Content() {
  const [number, setNumber] = useState("");
  const id = localStorage.getItem("id");
  const [user, setUser] = useState("asd");
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFind = () => {
    axios
      .get(`/findAllBySdt/${number}/${id}`)
      .then(function (response) {
        console.log(response.data);
        setUser(response.data);
        if (response.data.uid !== "nf") {
          axios
            .get(`/checkFStt/${id}/${response.data.uid}`)
            .then(function (response) {
              setType(response.data);
              console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .then(function (error) {
        console.log(error);
      });
  };
  const handleAdd = () => {
    axios
      .post(`/addFriend`, {
        uid1: id,
        uid2: user.uid,
      })
      .then(function () {
        swal("Success", "Add success", "success");
        setUser("asd");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleProfile = () => {
    let encoded = base64_encode(user.uid);

    navigate(`/profile/${encoded}`);
  };
  const handleReject = () => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/deleteRequest/${id}/${user.uid}`).then((res) => {
          swal("Success", "Delete success", "success");
        });
      }
    });
  };
  const handleAccept = () => {
    axios.put(`/acceptRequest/${id}/${user.uid}`).then((res) => {
      swal("Success", "Add success", "success");
    });
  };
  const handleMessage = () => {
    axios
      .get(`/startDirectChat/${user.uid}/${id}`)
      .then(function (response) {
        navigate(`/home/${response.data}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const UserFind = () => {
    if (user.uid !== "nf" && user !== "asd" && type === "Stranger") {
      return (
        <BoxUser>
          <Card sx={{ width: 345, border: "1px solid blue", borderRadius: 5 }}>
            <CardContent
              style={{ float: "left" }}
              onClick={() => handleProfile()}
            >
              <Avatar
                alt=""
                src={user.avatar || Img1}
                sx={{
                  width: 100,
                  height: 100,
                  "&:hover": {
                    transition: "0.3s",
                    opacity: "0.6",
                  },
                }}
              />
            </CardContent>
            <CardContent sx={{ marginLeft: 16 }}>
              <Typography gutterBottom variant="h5" component="div">
                {user.nickName}
              </Typography>
              <Typography gutterBottom variant="caption text" component="div">
                {type}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleAdd()}>
                {t("Add Friend")}
              </Button>
              <Button size="small" onClick={() => handleProfile()}>
                {t("Profile")}
              </Button>
            </CardActions>
          </Card>
        </BoxUser>
      );
    } else if (user.uid === "nf") {
      return (
        <Typography variant="h5">{t("Not found phone number")}</Typography>
      );
    } else if (
      user.uid !== "nf" &&
      user !== "asd" &&
      type === "Cancel request"
    ) {
      return (
        <BoxUser>
          <Card sx={{ width: 345 }}>
            <CardContent
              style={{ float: "left" }}
              onClick={() => handleProfile()}
            >
              <Avatar
                alt=""
                src={user.avatar || Img1}
                sx={{ width: 100, height: 100 }}
              />
            </CardContent>
            <CardContent sx={{ marginLeft: 16 }}>
              <Typography gutterBottom variant="h5" component="div">
                {user.nickName}
              </Typography>
              <Typography gutterBottom variant="caption text" component="div">
                {t("Have sent request")}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleReject()}>
                {t("Cancel request")}
              </Button>
            </CardActions>
          </Card>
        </BoxUser>
      );
    } else if (type === "Response") {
      return (
        <BoxUser>
          <Card sx={{ width: 345 }}>
            <CardContent
              style={{ float: "left" }}
              onClick={() => handleProfile()}
            >
              <Avatar
                alt=""
                src={user.avatar || Img1}
                sx={{ width: 100, height: 100 }}
              />
            </CardContent>
            <CardContent sx={{ marginLeft: 16 }}>
              <Typography gutterBottom variant="h5" component="div">
                {user.nickName}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleReject()}>
                {t("Cancel request")}
              </Button>
              <Button size="small" onClick={() => handleAccept()}>
                {t("Accept request")}
              </Button>
            </CardActions>
          </Card>
        </BoxUser>
      );
    } else if (type === "Friend") {
      return (
        <BoxUser>
          <Card sx={{ width: 345 }}>
            <CardContent
              style={{ float: "left" }}
              onClick={() => handleProfile()}
            >
              <Avatar
                alt=""
                src={user.avatar || Img1}
                sx={{ width: 100, height: 100 }}
              />
            </CardContent>
            <CardContent sx={{ marginLeft: 16 }}>
              <Typography gutterBottom variant="h5" component="div">
                {user.nickName}
              </Typography>
              <Typography gutterBottom variant="caption text" component="div">
                {type}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", width: "50%" }}>
              <Button size="small" onClick={() => handleMessage()}>
                {t("Message")}
              </Button>
              <Button size="small" onClick={() => handleAccept()}>
                {t("Profile")}
              </Button>
            </CardActions>
          </Card>
        </BoxUser>
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <Box flex={0.5}>
        <Header />
        <Stack direction="row">
          <TextField
            label={t("Phone Number")}
            variant="standard"
            fullWidth
            onChange={(e) => setNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFind();
              }
            }}
          />
          <Tooltip title="Find">
            <IconButton onClick={() => handleFind()} sx={{ marginTop: 1.7 }}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Stack>
        {UserFind()}
      </Box>
    </Box>
  );
}

export default Content;
