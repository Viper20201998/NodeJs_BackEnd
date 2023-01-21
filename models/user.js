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
	User.login = function (email, password) {
		return User.findOne({
			where: {
				email: email,
			},
		}).then((user) => {
			if (!user) return null;
			return user
				.autenticatePassword(password)
				.then((valid) => (valid ? user : null));
		});
	};

	User.prototype.autenticatePassword = function (password) {
		return new Promise((res, rej) => {
			//retornamos una promesa
			bcrypt.compare(password, this.password_hash, function (err, valid) {
				//bcrypt.compare recibe como parametro 1-password en texto plano, 2-password_hash que esta guadado en la base de datos, 3- una funcion callback
				if (err) return rej(err);
				res(valid);
			});
		});
	};

	User.beforeCreate(function (user, options) {
		return new Promise((res, rej) => {
			if (user.password) {
				bcrypt.hash(user.password, 10, function (error, hash) {
					user.password_hash = hash;
					res();
				});
			}
		});
	});
	return User;
};
