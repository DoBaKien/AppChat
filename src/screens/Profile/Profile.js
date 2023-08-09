import { Box, Divider, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { Side } from "../../components/Side";
import { Content } from "./Content";
import { decode as base64_decode } from "base-64";
function Profile({ mode, setMode }) {
  const { idbase64 } = useParams();

  let id = base64_decode(idbase64);

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{ height: "100vh" }}
    >
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-evenly"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Side setMode={setMode} mode={mode} />
        <Content id={id} />
        <Box></Box>
      </Stack>
    </Box>
  );
}

export default Profile;
