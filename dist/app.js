require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const  Routes  = require("./routes/route.js");
const  {createDatabaseConnection}  = require("./data/config/database.js");
const { constants } = require('http2');
const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

createDatabaseConnection();
const app = express();
const PORT = 8000;
const server = http.createServer(app);
app.use(cors({
    origin: "*",
}));
app.use(express.json());
app.use(Routes());
app.use(function (err, req, res, next) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send(err.message);
});
console.log(process.env.PORT)
server.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`);
});
