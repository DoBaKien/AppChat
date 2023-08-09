import { Avatar, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { Chap } from "./styled";
import Ava from "../../assert/1.jpg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
function ListGroup({ group, id }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [use, setUser] = useState("");
  useEffect(() => {
    axios
      .get(`/loadConvRoleOwner/${group.cid}`)
      .then(function (response) {
        setUser(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [group.cid]);
  const handleLeave = () => {
    swal({
      title: "Are you sure?",
      text: "RLeaving group will also delete all that group's message. Do you want to continue?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/leaveGroup/${id}/${group.cid}`)
          .then(function (response) {
            swal("Success", "You have leave success", "success");
          });
      }
    });
  };

  const deleteGr = () => {
    swal({
      title: "Are you sure?",
      text: "Remove all members and delete the group? This CANNOT be undone",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios.delete(`/deleteGroup/${group.cid}`).then(function (response) {
          swal("Success", "You have delete success", "success");
        });
      }
    });
  };

  const ype = () => {
    if (use.uid === localStorage.getItem("id")) {
      return (
        <>
          <Box sx={{ marginTop: 1 }}>
            <div className="nametypeChat">Leader</div>
          </Box>
          <Button
            onClick={() => deleteGr()}
            variant="contained"
            sx={{
              marginTop: 2,
              backgroundColor: "#DD5757",
              "&:hover": {
                transition: "0.3s",
                backgroundColor: "#ff4e37",
              },
            }}
          >
            {t("Delete Group")}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Box sx={{ marginTop: 1 }}>
            <div className="nametypeChat">Member</div>
          </Box>
          <Button
            variant="contained"
            onClick={() => handleLeave()}
            sx={{
              marginTop: 2,
              backgroundColor: "#DD5757",
              "&:hover": {
                transition: "0.3s",
                backgroundColor: "#ff4e37",
              },
            }}
          >
            {t("Leave group")}
          </Button>
        </>
      );
    }
  };
  return (
    <Grid item xs={15} sm={10} md={3} xl={2}>
      <Chap elevation={10}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => {
            navigate(`/home/${group.cid}`);
          }}
        >
          <Avatar
            alt="Avatar"
            src={Ava}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
        </Box>
        <div className="nameChat">{group.name}</div>
        {ype()}
      </Chap>
    </Grid>
  );
}

export default ListGroup;
