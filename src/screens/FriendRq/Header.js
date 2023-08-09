import { Box, Button, InputBase, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BoBtn, BoxBtn, Search } from "../ListFriend/styled";

function Header({ t, setSearch }) {
  const navigate = useNavigate();
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
          <BoBtn
            variant="outlined"
            color="success"
            onClick={() => {
              navigate(`/friend/add`);
            }}
          >
            {t("Add Friend")}
          </BoBtn>
        </BoxBtn>
        <BoxBtn>
          <Button
            sx={{
              height: 45,
              borderRadius: 20,
              padding: 2,
              width: 200,
              marginTop: { md: 0, sm: 2 },
            }}
            variant="contained"
            color="success"
          >
            {t("Friend Request")}
          </Button>
        </BoxBtn>
        <Box sx={{ paddingTop: { md: 0, sm: 3 } }}>
          <BoBtn
            onClick={() => {
              navigate(`/friend/sent`);
            }}
          >
            {t("Friend Sent")}
          </BoBtn>
        </Box>
      </Stack>
      <Box
        style={{
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Search>
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: 22 }}
            fullWidth
            placeholder={t("Search...")}
            onChange={(e) => {
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
          />
        </Search>
      </Box>
    </Box>
  );
}

export default Header;
