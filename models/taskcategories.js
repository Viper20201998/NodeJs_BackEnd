'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TaskCategories extends Model {
		/**
     * Helper method for defining associations.
     * This meTask.update(
			{ description: req.body.description },
			{
				where: {
					id: req.params.id,
				},
			}
		).then(function (response) {
			res.redirect('/tasks/' + req.params.id);
		});
thod is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
		static associate(models) {
			// define association here
		}
	}
	TaskCategories.init(
		{
			taskId: DataTypes.INTEGER,
			categoryId: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'TaskCategories',
		}
	);
	return TaskCategories;
};
