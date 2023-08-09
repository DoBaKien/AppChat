import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { encode as base64_encode } from "base-64";
function EditForm() {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(dayjs("2022-04-07"));
  const [preview, setPreview] = useState(null);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8083/getUser/${id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setNickName(res.data.nickName);
        setGender(res.data.gender);
        setPhoneNumber(res.data.phoneNumber);
        setEmail(res.data.email);
        setPreview(res.data.avatar);
        setValue(res.data.dateOB);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/updateUser/${id}`, {
        uid: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        nickName: nickName,
        phoneNumber: phoneNumber,
        email: email,
        dateOB: value,

        avatar: preview,
      })
      .then((res) => {
        swal({
          title: "Good job!",
          text: "You clicked the button!",
          icon: "success",
        }).then(() => {
          let encoded = base64_encode(id);
          navigate(`/profile/${encoded}`);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (view) => {
    setPreview(view);
  };

  return (
    <Box
      style={{
        padding: "20px",
      }}
    >
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Stack direction={{ xl: "row", md: "row", sm: "column", xs: "column" }}>
          <Box
            flex={1}
            style={{
              justifyContent: "center",
              alignItems: "start",
              display: "flex",
            }}
          >
            <Stack direction="column" spacing={2}>
              <Box
                sx={{
                  justifyContent: "center",
                  alignItems: "start",
                  display: "flex",
                }}
              >
                {preview && (
                  <img
                    src={preview}
                    alt=""
                    width={150}
                    height={150}
                    style={{ marginTop: 30 }}
                  />
                )}
              </Box>
              <Box
                style={{
                  display: "flex",
                  width: 300,
                  height: 300,
                  backgroundColor: "lightgray",
                }}
              >
                <Avatar
                  width={300}
                  height={300}
                  onClose={onClose}
                  onCrop={onCrop}
                  src={null}
                  color="primary"
                  label="Choose avatar"
                  hidden
                />
              </Box>
            </Stack>
          </Box>
          <Box pb={2} flex={1}>
            <TextField
              label="First Name"
              value={firstName}
              fullWidth
              margin="normal"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              value={lastName}
              margin="normal"
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Nick Name"
              value={nickName}
              margin="normal"
              fullWidth
              onChange={(e) => setNickName(e.target.value)}
            />
            <Box style={{ marginTop: 20 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Birth"
                  value={value}
                  openTo="year"
                  inputFormat="DD/MM/YYYY"
                  views={["year", "month", "day"]}
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
            <FormControl fullWidth style={{ marginTop: 20 }}>
              <InputLabel id="demo-select-small">Gender</InputLabel>
              <Select value={gender} onChange={handleChange} label="Gender">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Male"}>{t("Male")}</MenuItem>
                <MenuItem value={"Female"}>{t("Female")}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Phone Number"
              value={phoneNumber}
              margin="normal"
              fullWidth
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              margin="normal"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box
              sx={{
                justifyContent: "center",
                display: "flex",
                marginTop: 2,
              }}
            >
              <Button type="submit" variant="contained">
                {t("update")}
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default EditForm;
