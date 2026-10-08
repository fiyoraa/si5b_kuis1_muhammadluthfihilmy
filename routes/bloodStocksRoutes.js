const express = require('express');
const bloodStocksController = require('../controllers/bloodStocksController');
const cekApiKey = require('../middlewares/cekApiKey');

const router = express.Router();

router.get('/', bloodStocksController.getAll);
router.get('/:id', bloodStocksController.getById);
router.post('/', cekApiKey, bloodStocksController.create);
router.put('/:id', cekApiKey, bloodStocksController.update);
router.delete('/:id', cekApiKey, bloodStocksController.remove);

module.exports = router;
