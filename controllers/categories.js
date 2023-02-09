const Category = require('../models').Category;

module.exports = {
	index: function (req, res) {
		Category.findAll().then((categories) => {
			res.render('categories/index', { categories });
		});
	},
	create: function (req, res) {
		let data = {
			title: req.body.title,
			color: req.body.color,
		};
		Category.create(data)
			.then((result) => {
				res.redirect('/categories');
				//res.json(result);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	show: function (req, res) {
		Category.findByPk(req.params.id, {
			include: ['tasks'],
		}).then(function (categories) {
			res.render('categories/show', { categories });
		});
	},
	edit: function (req, res) {
		Category.findByPk(req.params.id).then(function (categories) {
			res.render('categories/edit', { categories });
		});
	},
	update: function (req, res) {
		let categories = Category.findByPk(req.params.id).then((categories) => {
			categories.title = req.body.title;
			categories.save().then(() => {
				let taskIds = req.body.tasks.split(',');
				taskIds = taskIds.map((id) => parseInt(id));
				categories
					.addTasks(taskIds)
					.then(() => {
						res.redirect('/categories');
					})
					.catch((err) => {
						console.log(err);
						res.json(err);
					});
			});
		});
	},
	destroy: function (req, res) {
		Category.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (contadorElementosEliminados) {
			res.redirect('/categories');
		});
	},
	new: function (req, res) {
		res.render('categories/new');
	},
};
