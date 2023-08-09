import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { BoxChoose, BtnModal, ModalAdd } from "./styled";

function Create({ setNewG }) {
  const [data, setData] = useState("");
  const [nameConV, setNameConV] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const { t } = useTranslation();

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    axios
      .get(`/findUserFriends/${id}`)
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nameConV !== "" && personName.length < 0) {
      axios
        .post(`/newConv/${id}`, {
          name: nameConV,
        })
        .then(function (response) {
          let a = response.data;
          axios
            .post(`/newMems/${response.data}`, personName)
            .then(function (response) {
              setNewG(false);
              swal("Thành công", "Bạn tạo thành công!", "success").then(() => {
                navigate(`/home/${a}`);
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      swal("Error!", "Please fill group name", "warning");
    }
  };
  

  return (
    <ModalAdd sx={{ left: { xl: "30%", md: "30%", sm: "30%", xs: 60 } }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: 0.5 }}>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box pb={2}>
              <TextField
                label={t("Name Conversation")}
                variant="outlined"
                fullWidth
                className="asd"
                style={{ marginTop: 20 }}
                onChange={(e) => setNameConV(e.target.value)}
              />
            </Box>
            <BoxChoose
              sx={{
                width: { xl: 600, md: 600, sm: 600, xs: 300 },
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {t("Add Member")}
                </InputLabel>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  label="Add member"
                  onChange={handleChange}
                >
                  {Array.from(data).map((name) => (
                    <MenuItem key={name.uid} value={name.uid}>
                      {name.nickName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </BoxChoose>

            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                textAlign: "center",
                width: "100%",
              }}
            >
              <BtnModal
                variant="contained"
                sx={{
                  backgroundColor: "#DD5757",
                  "&:hover": {
                    backgroundColor: "red",
                  },
                }}
                onClick={() => setNewG(false)}
              >
                {t("Exit")}
              </BtnModal>
              <BtnModal type="submit" variant="contained">
                {t("Create")}
              </BtnModal>
            </Box>
          </form>
        </Box>
      </Box>
    </ModalAdd>
  );
}

export default Create;
