'use strict';
const bcrypt = require('bcrypt');

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			password_hash: DataTypes.STRING,
			password: DataTypes.VIRTUAL,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
