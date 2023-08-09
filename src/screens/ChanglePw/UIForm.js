import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
function UIForm({ user }) {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewError, setPasswordNewError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass1, setShowPass1] = useState(false);
  const navigate = useNavigate();

  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setPassword(e);
      setPasswordError(false);
    } else {
      setPassword("");
      setPasswordError(true);
    }
  };
  const handleChanglePasswordNew = (e) => {
    if (regpass.test(e)) {
      setPasswordNew(e);
      setPasswordNewError(false);
    } else {
      setPasswordNew("");
      setPasswordNewError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        phoneNumber: userName,
        password: password,
      })
      .then(function (response) {
        if (response.data !== "Sai thong tin dang nhap") {
          axios
            .put(`/updatePassword/${user}`, {
              password: passwordNew,
            })
            .then(function (response) {
              navigate(`/`);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    if (user === "") {
      navigate(`/`);
    } else {
      axios
        .get(`getUser/${user}`)
        .then(function (response) {
          setUserName(response.data.phoneNumber);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [navigate, user]);

  return (
    <Stack sx={{ marginTop: 5 }}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box pb={2}>
          <Typography variant="h4">
            {t("Phone Number")}: {userName}
          </Typography>
          <TextField
            label={t("Old Password")}
            style={{ marginTop: 20, marginBottom: 20 }}
            fullWidth
            error={passwordError}
            type={showPass ? "text" : "password"}
            variant="outlined"
            onChange={(e) => handleChanglePassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={showPass ? `${t("Show")}` : `${t("Hidden")}`}>
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label={t("New Password")}
            style={{ marginTop: 20, marginBottom: 20 }}
            fullWidth
            error={passwordNewError}
            type={showPass1 ? "text" : "password"}
            variant="outlined"
            onChange={(e) => handleChanglePasswordNew(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={showPass1 ? `${t("Show")}` : `${t("Hidden")}`}
                  >
                    <IconButton onClick={() => setShowPass1(!showPass1)}>
                      {showPass1 ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box style={{ justifyContent: "center", textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "80%",
              borderRadius: 2,
              height: 50,
              fontSize: 20,
              backgroundColor: "#1976D2",
              color: "white",
            }}
          >
            {t("update")}
          </Button>
        </Box>
      </form>
    </Stack>
  );
}

export default UIForm;
