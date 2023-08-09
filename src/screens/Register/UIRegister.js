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
import PasswordCheck from "./PasswordCheck";
import axios from "axios";
import { encode as base64_encode } from "base-64";
import swal from "sweetalert";
var regUserName = /^[0-9]{9,10}$/;
var regpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function UIRegister({ mode }) {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/register", {
        phoneNumber: userName,
      })
      .then(function (re) {
        console.log(re);
        if (re.data === "Phone number already in use") {
          swal("WARNING!", "Phone number already in use", "warning");
        } else {
          swal("OTP code sent to your registered phone number", {
            content: "input",
          }).then((value) => {
            axios
              .post(`/register/${value}`, {
                firstName: lastName,
                lastName: firstName,
                phoneNumber: userName,
                password: password,
                gender: "Male",
                nickName: `${firstName} ${lastName}`,
              })
              .then(function (response) {
                axios
                  .post("/login", {
                    phoneNumber: userName,
                    password: password,
                  })
                  .then(function (response) {
                    console.log(response);
                    swal("Success", "You have login success!", "success").then(
                      () => {
                        let encoded = base64_encode(response.data);
                        navigate(`/profile/${encoded}`);
                        localStorage.setItem("id", response.data);
                      }
                    );
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                console.log(error);
              });
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
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
              style={{ marginTop: 20 }}
              label={t("Last Name")}
              variant="outlined"
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
            <TextField
              style={{ marginTop: 20 }}
              label={t("First Name")}
              variant="outlined"
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
            <TextField
              label={t("Phone Number")}
              variant="outlined"
              fullWidth
              className="asd"
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
            <PasswordCheck password={password} />
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
                marginTop: 5,
              }}
              className="buttonSubmit"
            >
              {t("sign up")}
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
            onClick={handleLogin}
          >
            {t("log in")}
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
