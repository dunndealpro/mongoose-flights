var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights');
const ticketsCtrl = require('../controllers/tickets');

router.get('/new', flightsCtrl.new)

/* GET users listing. */
router.post('/', flightsCtrl.create)

router.get('/', flightsCtrl.index)

router.delete('/:id', flightsCtrl.delete)

router.get('/:id', flightsCtrl.show)

router.post('/flights/:id/tickets/new', ticketsCtrl.addTicket);


module.exports = router;