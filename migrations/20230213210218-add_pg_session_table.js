'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.createTable('session', {
			sid: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
			sess: {
				type: Sequelize.JSON,
			},
			expire: {
				allowNull: false,
				type: 'TIMESTAMP',
			},
		});
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.dropTable('session');
	},
};
