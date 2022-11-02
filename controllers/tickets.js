const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addToFlight
};

function addToFlight(req, res) {
    console.log('test')
    Flight.findById(req.params.id, function(err, flight) {
        flight.tickets.push(req.body)
        console.log("HUH")
        console.log(req.body.ticketId)
        flight.save(function(err) {
            res.redirect(`/flights/${flight._id}`)
        })
    })
}


function create(req, res) {
    const newTicket = new Ticket(req.body)
    const seat = req.body.seat;
    req.body.seat = seat
    console.log('seat')
    console.log(req.body)
    newTicket.save(function(err) {
        if (err) return res.redirect('/tickets/new')
        console.log('newticket')
        console.log(newTicket);
        res.redirect('/flights')
    })

}


function newTicket(req, res) {
    console.log('am i going nutso')
    Flight.find({}, function(err, flights) {

        res.render('tickets/new', {
            title: "Add Ticket",
            flights,

        });
    })
}