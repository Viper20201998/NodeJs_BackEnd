const express = require('express');
const SessionsController = require('../controllers/sessions');

let router = express.Router();

router
	.route('/sessions')
	.get(SessionsController.new)
	.post(SessionsController.create);

module.exports = router;
