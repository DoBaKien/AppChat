import { Box, Button, CardMedia, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListConversation } from "./ListConversation";
import { ModalShare } from "./styled";

function ShareMessage({ setShare, shareC }) {
  const [conver, setConver] = useState("");
  const { t } = useTranslation();
  useEffect(() => {
    axios
      .get(`/loadUserConv/${localStorage.getItem("id")}`)
      .then(function (response) {
        setConver(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const type = (content) => {
    if (shareC.length > 1000) {
      return (
        <Stack
          sx={{
            direction: "row",
            marginTop: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            image={content}
            alt="Paella dish"
            sx={{
              width: "35%",
              border: "1px solid gray",
              borderRadius: 5,
            }}
          />
          <Box style={{ overflowY: "scroll", height: 200, marginTop: 10 }}>
            {Array.from(conver).map((con) => {
              return (
                <ListConversation key={con.cid} con={con} shareC={shareC} />
              );
            })}
          </Box>
        </Stack>
      );
    } else {
      return (
        <Stack
          sx={{
            display: "flex",
            marginTop: 2,
            justifyContentL: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              border: "1px solid black",
              padding: 1,
              textAlign: "center",
            }}
          >
            <Typography>{content}</Typography>
          </Box>
          <Box style={{ overflowY: "scroll", height: 200, marginTop: 10 }}>
            {Array.from(conver).map((con) => {
              return (
                <ListConversation key={con.cid} con={con} shareC={shareC} />
              );
            })}
          </Box>
        </Stack>
      );
    }
  };

  return (
    <ModalShare sx={{ width: { xs: 220, sm: "40vw" } }}>
      <Stack
        sx={{
          width: "100%",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Forward</Typography>
        {type(shareC)}
        <Button
          color="error"
          variant="contained"
          onClick={() => setShare(false)}
          sx={{ marginTop: 2 }}
        >
          {t("close")}
        </Button>
      </Stack>
    </ModalShare>
  );
}

export default ShareMessage;
