import { Box, Divider, Stack } from "@mui/material";
import { Side } from "../../components/Side";
import Friends from "./Friends";

function ListFriend({ mode, setMode }) {
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Stack
        direction="row"
        spacing={1}
        justifyContent="space-evenly"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Side setMode={setMode} mode={mode} />

        <Box
          sx={{
            flex: { xl: 2, md: 10, sm: 20, xs: 6 },
            minWidth: 200,
            overflow: "auto",
          }}
        >
          <Friends />
        </Box>
      </Stack>
    </Box>
  );
}

export default ListFriend;
