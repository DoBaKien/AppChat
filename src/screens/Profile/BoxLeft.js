import { CardContent, Stack, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CardLeft } from "./styled";
import "./Profile.css";

function Left({ t, data }) {
  return (
    <CardLeft variant="outlined">
      <CardContent>
        <Typography variant="h4" component="div">
          {t("ABOUT ME")}
        </Typography>

        <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
          {t("Name")} : {data.lastName} {data.firstName}
        </Typography>
        <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
          {t("Gender")} : {data.gender}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            disabled
            value={data.dateOB}
            openTo="year"
            inputFormat="DD/MM/YYYY"
            views={["year", "month", "day"]}
            onChange={(newValue) => {}}
            renderInput={(params) => (
              <Stack direction="row" spacing={1} style={{ marginTop: 10 }}>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ marginTop: 3 }}
                >
                  {t("Date of birth")} :
                </Typography>
                <TextField
                  variant="standard"
                  {...params}
                  sx={{ width: 150 }}
                  helperText={params?.inputProps?.placeholder}
                />
              </Stack>
            )}
          />
        </LocalizationProvider>
      </CardContent>
    </CardLeft>
  );
}

export default Left;
