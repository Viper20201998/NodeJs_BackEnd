const Task = require('../models').Task;

module.exports = {
	index: function (req, res) {
		Task.findAll().then((tasks) => {
			res.render('tasks/index', { tasks: tasks });
		});
	},
	show: function (req, res) {
		Task.findByPk(req.params.id).then(function (tasks) {
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
		Task.update(
			{ description: req.body.description },
			{
				where: {
					id: req.params.id,
				},
			}
		).then(function (response) {
			res.redirect('/tasks/' + req.params.id);
		});
	},
	new: function (req, res) {
		res.render('tasks/new'); //solo mostrara el formulario views
	},
};
