import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Router";
import { BrowserRouter } from "react-router-dom";
import "./assert/translation/i18next";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8083";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
