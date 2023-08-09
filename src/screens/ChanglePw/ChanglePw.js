import { Box, Stack, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import UIForm from "./UIForm";

function ChanglePw({ user }) {
  const { t } = useTranslation("");

  const BoxItem = styled(Stack)(({ theme }) => ({
    border:
      theme.palette.mode === "dark" ? "5px dashed white" : "5px dashed black",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    textAlign: "center",
  }));

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textAlign: "center",
      }}
    >
      <BoxItem>
        <Typography variant="h3"> {t("Changle password")}</Typography>
        <UIForm user={user} />
      </BoxItem>
    </Box>
  );
}

export default ChanglePw;
