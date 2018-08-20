import http from "http";

const server = http.createServer();

server.listen(8080);

server.on("request", (req, res) => {
  res.write("hello world" + "\n");
  setTimeout(() => {
    res.write("I can Stream\n");
    res.end();
  }, 5000);
});
