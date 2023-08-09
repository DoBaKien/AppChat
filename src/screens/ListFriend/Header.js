import { Box, InputBase, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BoBtn, BoxBtn, Search } from "./styled";

function Header({ t, setSearch }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Stack
        direction="row"
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
          <BoBtn
            variant="outlined"
            onClick={() => {
              navigate(`/friend/rq`);
            }}
          >
            {t("Friend Request")}
          </BoBtn>
        </BoxBtn>
        <BoxBtn>
          <BoBtn
            variant="outlined"
            onClick={() => {
              navigate(`/friend/sent`);
            }}
          >
            {t("Friend Sent")}
          </BoBtn>
        </BoxBtn>
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
