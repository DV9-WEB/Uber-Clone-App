const dotenv = require("dotenv");
const http = require("http");
const app = require("./app.js"); 
dotenv.config()

const PORT = process.env.PORT;

const server = http.createServer(app);
console.log("MongoDB URI:", process.env.DB);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
