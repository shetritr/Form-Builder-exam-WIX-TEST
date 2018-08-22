//fetch the data from the api
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/components/App";
import axios from "axios";
import config from "./config";

const serverRender = () =>
  axios.get(config.serverUrl + "/api/contests").then(resp => {
    return {
      initMarkup: ReactDOMServer.renderToString(
        <App init={resp.data.contests} />
      ),
      initData: resp.data
    };
  });

export default serverRender;
