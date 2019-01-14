import * as express from 'express';
import { Application } from "express";
import { initApi } from './api/api';
import { retrieveUserIdFromRequest } from './api/middlewares/get-user.middleware';
import { initSocket } from './api/socket/socket-manager';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = require('express')();
const server = require('http').Server(app);
export const io = require('socket.io')(server);

/* const app: Application = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); */

//io.set('origins', '*');
/* const http = require('http');
const app:Application = express();
const server = http.createServer(app);

const io = require('socket.io').listen(server); */

const PORT = 5000;

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(retrieveUserIdFromRequest);

initApi(app);

server.listen(PORT, () => {
	console.log(`Server is now running on port ${PORT} ...`);
});

initSocket();

export default app;