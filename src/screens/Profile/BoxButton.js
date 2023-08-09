import { Box, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardRight } from "./styled";

function BoxButton({ hanle }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const deleteuser = (e) => {
    console.log(e);
  };
  return (
    <CardRight variant="outlined" sx={{ display: hanle }}>
      <Stack>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => console.log("asd")}
          >
            {t("Disable Account")}
          </Button>
          <Button variant="outlined" color="error" onClick={deleteuser}>
            {t(" Delete Account")}
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/ChanglePassword`)}
          >
            {t("Change Password")}
          </Button>
        </Box>
      </Stack>
    </CardRight>
  );
}

export default BoxButton;
