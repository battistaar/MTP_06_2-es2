const express = require('express');
const router = express.Router();
const logController = require('./log.controller');

//definizione dele api relative ai todo
router.post('/', logController.create);
router.get('/', logController.find);

module.exports = router;