import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Routes } from "./routes/route.js";
import { createDatabaseConnection } from "./data/config/database.js";
import { constants } from 'http2';
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
