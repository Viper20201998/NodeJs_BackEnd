const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const methodOverride = require('method-override');
const session = require('express-session');

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

app.use(
	session({
		secret: ['adfkafajdfaldfhahfafh', 'akdfakfadfkalfsflsfafa'],
		saveUninitialized: false,
		resave: false,
	})
);

app.use(findUserMiddleware);

app.use(authUser);

app.use(taskRoutes);
app.use(registrationsRoutes);
app.use(sessionsRoutes);
app.use(categoriesRoutes);

app.get('/', function (req, res) {
	res.render('home', { user: req.user });
});

app.listen(3000);
