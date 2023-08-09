import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material";
import React, { useState } from "react";
import Mess from "./screens/Chat/Mess";
import ListFriend from "./screens/ListFriend/ListFriend";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import Profile from "./screens/Profile/Profile";
import EditProfile from "./screens/EditProfile/EditProfile";
import Video from "./screens/Video/Video";
import io from "socket.io-client";
import Group from "./screens/Group/Group";
import FriendRq from "./screens/FriendRq/FriendRq";
import FriendSent from "./screens/FriendSent/FriendSent";
import AddFirend from "./screens/AddFriend/AddFirend";
import NotFound from "./screens/NotFound/NotFound";
import ChanglePw from "./screens/ChanglePw/ChanglePw";

function Router() {
  let socket = io.connect("https://chat-app-provip.herokuapp.com/");

  const [user, setUser] = useState("");
  if (localStorage.getItem("lng") === null) {
    localStorage.setItem("lng", "en");
  }
  if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "light");
  }

  const [mode, setMode] = useState(localStorage.getItem("mode"));

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="*" element={<NotFound mode={mode} />} />
        <Route
          path="/"
          element={<Login mode={mode} socket={socket} setUser={setUser} />}
        />

        <Route
          path="/home/:id"
          element={<Mess setMode={setMode} mode={mode} socket={socket} />}
        />

        <Route
          path="/friend"
          element={<ListFriend setMode={setMode} mode={mode} socket={socket} />}
        />
        <Route
          path="/friend/rq"
          element={<FriendRq setMode={setMode} mode={mode} socket={socket} />}
        />
        <Route
          path="/friend/sent"
          element={<FriendSent setMode={setMode} mode={mode} socket={socket} />}
        />
        <Route
          path="/friend/add"
          element={<AddFirend setMode={setMode} mode={mode} socket={socket} />}
        />
        <Route
          path="/group"
          element={<Group setMode={setMode} mode={mode} socket={socket} />}
        />
        <Route
          path="/register"
          element={<Register mode={mode} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/profile/:idbase64"
          element={<Profile setMode={setMode} mode={mode} />}
        />
        <Route
          path="/:idbase64/edit/"
          element={<EditProfile setMode={setMode} mode={mode} />}
        />

        <Route path="/video" exact element={<Video />} />

        <Route
          path="/ChanglePassword"
          element={<ChanglePw mode={mode} setMode={setMode} user={user} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
