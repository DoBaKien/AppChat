import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";

const Add = ({ t, data }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const [firstName, setFirstName] = useState("");

  const gen = data.gender;
  const [gender, setGender] = useState(gen);
  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    console.log(gender);
    console.log(firstName);
  };

  return (
    <div>
      <Tooltip onClick={(e) => setOpen(true)} title="Edit">
        <Button variant="contained" startIcon={<EditIcon />}>
          {t("Edit Profile")}
        </Button>
      </Tooltip>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box
          width={400}
          height="100%"
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Stack sx={{ width: "100%" }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Box pb={2}>
                <TextField
                  label="Detail"
                  value={data.lastName}
                  margin="dense"
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  style={{ marginTop: 20 }}
                  label={t("First Name")}
                  variant="outlined"
                  fullWidth
                  value={data.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  style={{ marginTop: 20 }}
                  label={t("Nick Name")}
                  variant="outlined"
                  fullWidth
                  value={data.nickName}
                />
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <InputLabel id="demo-select-small">{t("Gender")}</InputLabel>
                  <Select
                    value={gender}
                    onChange={handleChange}
                    defaultValue={data.gender}
                  >
                    <MenuItem value={"Male"}>{t("Male")}</MenuItem>
                    <MenuItem value={"Female"}>{t("Female")}</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label={t("Phone Number")}
                  variant="outlined"
                  fullWidth
                  style={{ marginTop: 20 }}
                  value={data.phoneNumber}
                />
                <TextField
                  style={{ marginTop: 20 }}
                  label={t("Email")}
                  variant="outlined"
                  fullWidth
                  value={data.email}
                />
                <Box style={{ marginTop: 20 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Birth"
                      value={value}
                      views={["day", "month", "year"]}
                      minDate={dayjs("1900-01-01")}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          helperText={params?.inputProps?.placeholder}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
              <Box style={{ justifyContent: "center", textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "80%",
                    borderRadius: 2,
                    height: 50,
                    fontSize: 20,
                    backgroundColor: "#1976D2",
                    color: "white",
                    marginTop: 5,
                  }}
                  className="buttonSubmit"
                >
                  {t("Change")}
                </Button>
              </Box>
            </form>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Add;
