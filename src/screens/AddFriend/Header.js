import { Box, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BoBtn, BoxBtn } from "./styled";

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Stack
        direction={{ md: "row", sm: "column" }}
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <BoxBtn>
          <Button
            sx={{
              height: 45,
              borderRadius: 20,
              padding: 2,
              width: 200,
            }}
            variant="contained"
            color="success"
          >
            {t("Add Friend")}
          </Button>
        </BoxBtn>
        <BoxBtn>
          <BoBtn
            variant="outlined"
            onClick={() => {
              navigate(`/friend/rq`);
            }}
          >
            {t("Friend Request")}
          </BoBtn>
        </BoxBtn>
        <BoxBtn>
          <BoBtn
            variant="outlined"
            onClick={() => {
              navigate(`/friend/sent`);
            }}
          >
            {t("Friend Sent")}
          </BoBtn>
        </BoxBtn>
      </Stack>
    </Box>
  );
}

export default Header;
