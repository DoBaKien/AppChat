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
import Logo from "../../assert/logo3.png";
import UI from "./UIRegister";

function Register({ mode }) {
  const BoxLogin = styled(Box)(({ theme }) => ({
    width: "500px",
    borderRadius: 10,
    backgroundColor: "red",
    boxShadow: "1px 1px 1px 5px #AAA",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      boxShadow: "none",
      marginLeft: "5%",
    },
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
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ height: window.innerHeight }}
    >
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
          height: window.innerHeight - 128,
          marginTop: "5%",
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
            <UI mode={mode} />
          </BoxLogin>
          <Box flex={0.2}></Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default Register;
