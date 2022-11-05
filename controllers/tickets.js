const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addTicket
};

function create(req, res) {
    const newTicket = new Ticket(req.body)
    newTicket.save()
    Flight.findById(newTicket.flight, function(err, flights) {
        flights.save(function(err) {
            res.redirect(`/flights/${flights._id}`);
        })
    })
}

function newTicket(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('tickets/new', {
            title: "Add Ticket",
            flights,
        });
    })
}

function addTicket(req, res) {
    Flight.findById(req.params.id, function(err, flights) {
        res.render('tickets/newFromFlight', {
            title: "Add Ticket",
            flights
        });
    })
}