//fetch the data from the api
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./src/components/App";
import axios from "axios";
import config from "./config";

const getApiUrl = formId => {
  if (formId) {
    return config.serverUrl + "/api/forms/" + formId;
  }
  return config.serverUrl + "/api/forms";
};
const getInitData = (formId, apiData) => {
  if (formId) {
    return {
      currentFormId: apiData.id,
      forms: {
        [apiData.id]: apiData
      }
    };
  }
  return {
    forms: apiData.forms
  };
};

const serverRender = formId =>
  axios.get(getApiUrl(formId)).then(resp => {
    const initData = getInitData(formId, resp.data);
    return {
      initMarkup: ReactDOMServer.renderToString(<App initData={initData} />),
      initData
    };
  });

export default serverRender;
