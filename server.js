import config from "./config";
import express from "express";
import apiRouter from "./api";
import bodyParser from "body-parser";

const server = express();

server.use(bodyParser.json());

server.set("view engine", "ejs");

import serverRender from "./serverRender";

server.get(["/", "/form/:formId"], (req, res) => {
  serverRender(req.params.formId)
    .then(({ initMarkup, initData }) => {
      res.render("index", { initMarkup, initData });
    })
    .catch(console.error);
});

server.use("/api", apiRouter);

server.use(express.static("public"));

server.listen(config.port, config.host, () => {
  console.info("Express listening on port ", config.port);
});
