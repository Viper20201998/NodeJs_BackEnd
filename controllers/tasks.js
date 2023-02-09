const Task = require('../models').Task;
const User = require('../models').User;

module.exports = {
	index: function (req, res) {
		Task.findAll().then((tasks) => {
			res.render('tasks/index', { tasks: req.user.tasks });
		});
	},
	show: function (req, res) {
		Task.findByPk(req.params.id, {
			include: [
				{
					model: User,
					as: 'user',
				},
				'categories',
			],
		}).then(function (tasks) {
			res.render('tasks/show', { tasks }); //{tasks: tasks} = {tasks}
		});
	},
	edit: function (req, res) {
		Task.findByPk(req.params.id).then(function (tasks) {
			res.render('tasks/edit', { tasks });
		});
	},
	destroy: function (req, res) {
		Task.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (contadorElementosEliminados) {
			res.redirect('/tasks');
		});
	},
	create: function (req, res) {
		Task.create({
			description: req.body.description,
			userId: req.user.id,
		})
			.then((result) => {
				res.json(result);
			})
			.catch((err) => {
				console.log(err);
				res.json(err);
			});
	},
	update: function (req, res) {
		let tasks = Task.findByPk(req.params.id).then((tasks) => {
			tasks.description = req.body.description;
			tasks.save().then(() => {
				let categoryIds = req.body.categories.split(',');
				categoryIds = categoryIds.map((id) => parseInt(id));
				tasks
					.addCategories(categoryIds)
					.then(() => {
						res.redirect('/tasks');
					})
					.catch((err) => {
						console.log(err);
						res.json(err);
					});
			});
		});
	},
	new: function (req, res) {
		res.render('tasks/new'); //solo mostrara el formulario views
	},
};
