import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Side } from "../../components/Side";
import EditForm from "./EditForm";

function EditProfile({ mode, setMode }) {
  const { t } = useTranslation();
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <Side setMode={setMode} mode={mode} />
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h1" sx={{ marginTop: 1.5 }}>
            {t("Edit Profile")}
          </Typography>
          <EditForm />
        </Box>
        <Box></Box>
      </Stack>
    </Box>
  );
}

export default EditProfile;
