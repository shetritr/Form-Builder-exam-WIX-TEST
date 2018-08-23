//fetch the data from the api
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/components/App";
import axios from "axios";
import config from "./config";

const getApiUrl = contestId => {
  if (contestId) {
    return config.serverUrl + "/api/contests/" + contestId;
  }
  return config.serverUrl + "/api/contests";
};
const getInitData = (contestId, apiData) => {
  if (contestId) {
    return {
      currentContestId: apiData.id,
      contests: {
        [apiData.id]: apiData
      }
    };
  }
  return {
    contests: apiData.contests
  };
};

const serverRender = contestId =>
  axios.get(getApiUrl(contestId)).then(resp => {
    const initData = getInitData(contestId, resp.data);
    return {
      initMarkup: ReactDOMServer.renderToString(<App initData={initData} />),
      initData
    };
  });

export default serverRender;
