const env = process.env;

export default {
  port: env.port || 3030,
  host: env.host || "localhost",
  get serverUrl() {
    return "http://" + this.host + ":" + this.port;
  }
};
