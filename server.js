import config from "./config";
import express from "express";
import apiRouter from "./api";

const server = express();

server.set("view engine", "ejs");

import serverRender from "./serverRender";

server.get(["/", "/contest/:contestId"], (req, res) => {
  serverRender(req.params.contestId)
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
