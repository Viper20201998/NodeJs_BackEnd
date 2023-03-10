const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

const socketio = require('socket.io');
const client = require('./realtime/client');

const app = express();

const taskRoutes = require('./routes/tasks_routes');
const registrationsRoutes = require('./routes/registration_routes');
const sessionsRoutes = require('./routes/sessions_routes');
const findUserMiddleware = require('./middlewares/find_user'); //middleware personalizado para buscar usuario
const authUser = require('./middlewares/auth_user'); //middleware personalizado para proteger las rutas
const categoriesRoutes = require('./routes/categories_routes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');

let sessionConfig = {
	secret: ['adfkafajdfaldfhahfafh', 'akdfakfadfkalfsflsfafa'],
	saveUninitialized: false,
	resave: false,
};

if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
	sessionConfig['store'] = new (require('connect-pg-simple')(session))();
}

app.use(session(sessionConfig));

app.use(findUserMiddleware);

app.use(authUser);

app.use(taskRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/', function (req, res) {
	res.render('home', { user: req.user });
});

let server = app.listen(process.env.PORT || 3000);
let io = socketio(server);
let sockets = {};

let usersCount = 0;

io.on('connection', function (socket) {
	let userId = socket.request._query.loggeduser;
	if (userId) sockets[userId] = socket;
	console.log(sockets);

	//actualizar usuarios conectados en tiempo real
	usersCount++;
	io.emit('count_updated', { count: usersCount });

	socket.on('new_task', function (data) {
		if (data.userId) {
			let userSocket = sockets[data.userId];
			if (!userSocket) return;

			userSocket.emit('new_task', data);
		}
	});

	socket.on('disconnect', function () {
		Object.keys(sockets).forEach((userId) => {
			let s = sockets[userId];
			if (s && s.id == socket.id) sockets[userId] = null; //le agregamos s && verificamos si existe asi evita el error
		});

		console.log(sockets);

		usersCount--;
		io.emit('count_updated', { count: usersCount });
	});
});
