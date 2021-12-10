import React from "react";
import ReactDOM from "react-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

import theme from "./theme";
import Main from "./Main";
import tasks from "./tasks";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <RecoilNexus />
        <Main />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

tasks();
