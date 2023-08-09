import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

var regUserName = /^[0-9]{9,10}$/;
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function UI({ mode, setUser }) {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/login", {
        phoneNumber: userName,
        password: password,
      })
      .then(function (response) {
        if (response.data === "Sai thong tin dang nhap") {
          swal("Failed", "Wrong password!", "error");
        } else {
          swal("Success", "You have login success", "success").then(() => {
            axios
              .get(`/loadUserConv/${response.data}`)
              .then(function (response) {
                navigate(`/home/${response.data[0].cid}`);
              })
              .catch(function (error) {
                console.log(error);
              });
            setUser(response.data);
            localStorage.setItem("id", response.data);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const handleChangleUserName = (e) => {
    if (regUserName.test(e)) {
      setUserName(e);
      setUserNameError(false);
    } else {
      setUserName("");
      setUserNameError(true);
    }
  };

  const handleChanglePassword = (e) => {
    if (regpass.test(e)) {
      setPassword(e);
      setPasswordError(false);
    } else {
      setPassword("");
      setPasswordError(true);
    }
  };

  const [bg, setBg] = useState("#2C2C2C");
  useEffect(() => {
    if (mode === "dark") {
      setBg("#2C2C2C");
    } else {
      setBg("#F5F5F5");
    }
  }, [mode]);

  return (
    <Container
      pb={2}
      style={{ backgroundColor: bg }}
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack sx={{ width: "100%" }}>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box pb={2}>
            <TextField
              label={t("Phone Number")}
              variant="outlined"
              fullWidth
              style={{ marginTop: 20 }}
              onChange={(e) => handleChangleUserName(e.target.value)}
              error={userNameError}
            />

            <TextField
              label={t("Password")}
              style={{ marginTop: 20, marginBottom: 20 }}
              fullWidth
              error={passwordError}
              type={showPass ? "text" : "password"}
              variant="outlined"
              onChange={(e) => handleChanglePassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip
                      title={showPass ? `${t("Show")}` : `${t("Hidden")}`}
                    >
                      <IconButton onClick={() => setShowPass(!showPass)}>
                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
              {t("log in")}
            </Button>
          </Box>
        </form>

        <Box
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          <Link component="button" variant="body2">
            {t("Forgotten password?")}
          </Link>
        </Box>
        <Box
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          <Button
            variant="contained"
            sx={{
              width: 200,
              borderRadius: 2,
              color: "white",
              height: 50,
              fontSize: 20,
              backgroundColor: "#1976D2",
              marginBottom: 2,
            }}
            onClick={handleSignUp}
          >
            {t("sign up")}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
