import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Stack,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import UI from "./UI";
import Logo from "../../assert/logo3.png";

function Login({ mode, socket, setUser }) {
  const BoxLogin = styled(Box)(({ theme }) => ({
    width: "500px",
    borderRadius: 10,
    boxShadow: "1px 1px 1px 5px #AAA",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      boxShadow: "none",
      marginLeft: "5%",
    },
  }));

  const BoxContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "black" : "#F0F2F5",
    height: window.innerHeight,
  }));

  const { t, i18n } = useTranslation();
  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
    localStorage.setItem("lng", event.target.value);
    console.log(event.target.value);
    return i18n.changeLanguage(event.target.value);
  };

  return (
    <BoxContainer color={"text.primary"}>
      <Box>
        <FormControl sx={{ minWidth: 120 }}>
          <Select
            displayEmpty
            value={age}
            onChange={handleChange}
            autoWidth
            sx={{ height: 50 }}
          >
            <MenuItem value="">{t("Language")}</MenuItem>
            <MenuItem value="en">{t("English")}</MenuItem>
            <Tooltip title="Vietnamese" value="vn" placement="right">
              <MenuItem>Tiếng Việt</MenuItem>
            </Tooltip>
          </Select>
        </FormControl>
        <Box
          sx={{ display: { xs: "flex", lg: "none", sm: "flex", md: "none" } }}
        >
          <img alt="logo" src={Logo} width="80%" height="100" />
        </Box>
      </Box>
      <Box
        style={{
          width: "100%",
          height: window.innerHeight - 173,
          marginTop: "8%",
        }}
      >
        <Stack direction="row">
          <Box
            flex={1}
            sx={{
              display: { xs: "none", lg: "flex", sm: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack>
              <img alt="logo" src={Logo} width="100%" height="200" />

              <Typography
                variant="h3"
                color="text.primary"
                style={{
                  fontFamily: "Arial",
                  textAlign: "center",
                }}
              >
                {t("CONNECTING PEOPLE")}
              </Typography>
            </Stack>
          </Box>
          <BoxLogin>
            <UI mode={mode} socket={socket} setUser={setUser} />
          </BoxLogin>
          <Box flex={0.2}></Box>
        </Stack>
      </Box>
    </BoxContainer>
  );
}

export default Login;
