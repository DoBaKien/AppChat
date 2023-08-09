import { Box, Divider, Stack } from "@mui/material";
import { Side } from "../../components/Side";


function Video({ mode, setMode, socket }) {
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
        <Side setMode={setMode} mode={mode} socket={socket} />
       
        <Box></Box>
      </Stack>
    </Box>
  );
}

export default Video;
