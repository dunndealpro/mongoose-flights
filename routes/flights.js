var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');

router.get('/new', flightsCtrl.new)

/* GET users listing. */
router.post('/', flightsCtrl.create)

router.get('/index', flightsCtrl.index)

module.exports = router;