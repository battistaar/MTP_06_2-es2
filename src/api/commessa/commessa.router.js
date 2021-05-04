const express = require('express');
const router = express.Router();
const commessaController = require('./commessa.controller');
//definizione dele api relative ai todo

router.get('/:codice',commessaController.checkCodice, commessaController.getLastState);
router.get('/', commessaController.list);
router.get('/:codice/logs',commessaController.checkCodice, commessaController.getLogs);

module.exports = router;