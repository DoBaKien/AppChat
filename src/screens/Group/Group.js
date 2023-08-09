import { Box, Divider, Stack } from "@mui/material";
import { useState } from "react";
import { Side } from "../../components/Side";
import Content from "./Content";
import Create from "./Create";

function ListFriend({ mode, setMode }) {
  const [newG, setNewG] = useState(false);

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
            flex: { xl: 6, md: 10, sm: 20, xs: 6 },
            overflow: "auto",
          }}
        >
          {newG && <Create setNewG={setNewG} />}
          <Content setNewG={setNewG} newG={newG} />
        </Box>
      </Stack>
    </Box>
  );
}

export default ListFriend;
