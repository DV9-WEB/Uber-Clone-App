const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 4000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
