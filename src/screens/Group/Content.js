import { Box, Button, Grid, InputBase, Stack, Typography } from "@mui/material";

import { Search } from "./styled";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import "./Group.css";
import { useEffect } from "react";
import axios from "axios";
import ListGroup from "./ListGroup";

function Content({ setNewG, newG }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [conV, setConV] = useState("");
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`/loadUserConv/${id}`)
      .then(function (response) {
        var result = response.data.filter(function (word) {
          return word.type === "group";
        });
        setConV(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  const ser = (val) => {
    if (search === "") {
      return val;
    } else if (val.name.toLowerCase().includes(search.toLowerCase())) {
      return val;
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 3 }}>
      <Typography variant="h3">{t("All Group")}</Typography>
      <Stack
        direction={{ xl: "row", md: "row", sm: "row", xs: "column" }}
        spacing={5}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 3,
          marginBottom: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setNewG(!newG)}
          sx={{ width: 200 }}
        >
          {t("Create a group")}
        </Button>
        <Stack
          direction="row"
          sx={{
            width: { xl: "50%", xs: "90%" },
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              marginRight: 2,
              display: { xl: "block", sm: "none", xs: "none" },
            }}
          >
            {t("Search Group")}:
          </Typography>
          <Search sx={{ width: "70%" }}>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: 22 }}
              fullWidth
              placeholder={t("Search...")}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Search>
        </Stack>
      </Stack>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 2, md: 2 }}>
        {Array.from(conV)
          .filter(ser)
          .map((group, index) => {
            return <ListGroup key={index} group={group} />;
          })}
      </Grid>
    </Box>
  );
}

export default Content;
