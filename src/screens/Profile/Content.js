import {
  Avatar,
  Box,
  Card,
  Typography,
  IconButton,
  CardMedia,
  CardContent,
  Tooltip,
  Stack,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Img2 from "../../assert/2.jpg";
import Img1 from "../../assert/1.jpg";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useTranslation } from "react-i18next";
import "./Profile.css";
import { Camera } from "./styled";
import Left from "./BoxLeft";
import Right from "./BoxRight";
import BoxButton from "./BoxButton";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export const Content = ({ id }) => {
  const { t } = useTranslation();
  const [data, setData] = useState("");
  const navigate = useNavigate();
  const [friend, setFriends] = useState("");

  const handleEdit = () => {
    navigate(`/${id}/edit/`);
  };

  useEffect(() => {
    axios
      .get(`getUser/${id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  const hanle = () => {
    if (id === localStorage.getItem("id")) {
      return "block";
    } else {
      return "none";
    }
  };
  useEffect(() => {
    axios
      .get(`/findUserFriends/${id}`)
      .then(function (response) {
        setFriends(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  return (
    <Box sx={{ flex: { xl: 8, md: 10, sm: 20, xs: 6 } }}>
      <Card sx={{ marginTop: 2 }}>
        <Tooltip title={t("Change Cover")} placement="bottom">
          <Button
            color="primary"
            component="label"
            height="300px"
            style={{ width: "100%", padding: 0 }}
            className="MyCustomButton"
          >
            <input hidden accept="image/*" type="file" />

            <CardMedia
              component="img"
              height="300px"
              image={Img2}
              alt="Cover Picture"
              className="imgBook"
            />
          </Button>
        </Tooltip>

        <Card sx={{ paddingLeft: { xl: 0, md: 0, sm: 0, xs: 10 } }}>
          <CardContent style={{ float: "left" }}>
            <IconButton color="primary" style={{ padding: 0 }}>
              <Avatar
                alt="Avatar"
                src={data.avatar || Img1}
                sx={{ width: 150, height: 150 }}
              />
              <Tooltip title={t("Change Avatar")} placement="right">
                <Camera color="primary" component="label">
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </Camera>
              </Tooltip>
            </IconButton>
          </CardContent>
          <CardContent style={{ float: "left" }}>
            <Typography variant="h5" component="div">
              {data.nickName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {friend.length} {t("Friends")}
            </Typography>

            <Stack direction="row">
              <Avatar
                alt="Remy Sharp"
                src={Img1}
                sx={{ width: 40, height: 40 }}
              />
              <Avatar
                alt="Travis Howard"
                src={Img1}
                sx={{ width: 40, height: 40 }}
              />
              <Avatar
                alt="Cindy Baker"
                src={Img1}
                sx={{ width: 40, height: 40 }}
              />
              <Avatar
                alt="Agnes Walker"
                src={Img1}
                sx={{ width: 40, height: 40 }}
              />
              <Avatar
                alt="Trevor Henderson"
                src={Img1}
                sx={{ width: 40, height: 40 }}
              />
            </Stack>
          </CardContent>
          <CardContent
            sx={{
              textAlign: { sm: "right", xs: "left" },
              paddingRight: 10,
              display: hanle,
            }}
          >
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              {t("Edit Profile")}
            </Button>
          </CardContent>
        </Card>
      </Card>

      <Box>
        <Left t={t} data={data} />

        <Right t={t} data={data} />
        <BoxButton hanle={hanle} />
      </Box>
    </Box>
  );
};
