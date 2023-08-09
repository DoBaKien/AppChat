import { CardContent, Typography } from "@mui/material";
import { CardRight, StackContact, Typograp } from "./styled";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

function Right({ t, data }) {
  return (
    <CardRight variant="outlined">
      <CardContent>
        <Typograp variant="h5" component="div">
          {t("CONTACTS")}
        </Typograp>
        <StackContact direction="row" mt={0.5} gap={5}>
          <FacebookIcon color="primary" />
          <GitHubIcon color="secondary" />
          <TwitterIcon color="success" />
          <InstagramIcon color="error" />
        </StackContact>
        <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
          {t("Phone Number")} : {data.phoneNumber}
        </Typography>
        <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
          Email : {data.email}
        </Typography>
      </CardContent>
    </CardRight>
  );
}

export default Right;
