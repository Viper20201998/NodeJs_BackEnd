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
                res.redirect('/categories')
				//res.json(result);
			})
			.catch((err) => {
				res.json(err);
			});
	},
	show: function (req, res) {
		Category.findByPk(req.params.id).then(function (categories) {
			res.render('categories/show', { categories });
		});
	},
	edit: function (req, res) {
		Category.findByPk(req.params.id).then(function (categories) {
			res.render('categories/edit', { categories });
		});
	},
	update: function (req, res) {
		Category.update(
			{ title: req.body.title, color: req.body.color },
			{
				where: {
					id: req.params.id,
				},
			}
		).then(function (response) {
			res.redirect('/categories');
			//res.json(response);
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
