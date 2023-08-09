import { Box, CardMedia, Stack, styled, Typography } from "@mui/material";
import Img1 from "../../assert/notfound.png";
function NotFound() {
  const BoxItem = styled(Stack)(({ theme }) => ({
    border:
      theme.palette.mode === "dark" ? "10px dashed white" : "10px dashed black",
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
        <CardMedia
          component="img"
          image={Img1}
          alt="image not found"
          sx={{ width: 300, height: 300 }}
        />
        <Typography variant="h3">
          This page isn't available. Sorry about that
        </Typography>
      </BoxItem>
    </Box>
  );
}

export default NotFound;
