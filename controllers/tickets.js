const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addTicket
};


function create(req, res) {
    const newTicket = new Ticket(req.body)
    console.log('new ticket: ', newTicket)
    newTicket.save()
    Flight.findById(newTicket.flight, function(err, flights) {
        console.log('flight: ', flights)
        console.log(newTicket._id)

        flights.tickets.push(newTicket._id)
            // res.redirect(`/flights/${flights._id}`);
        flights.save(function(err) {
            res.redirect(`/flights/${flights._id}`);
        })
    })
}

// function addTicket(req, res) {

//     Flight.findById(req.params.id, function(err, flight) {
//         flight.tickets.push(req.body.ticketID)
//         flight.save(function(err) {
//             res.redirect(`/flights/${flight._id}`);
//         })
//     })
// }


function newTicket(req, res) {
    console.log('am i going nutso')
    Flight.find({}, function(err, flights) {
        res.render('tickets/new', {
            title: "Add Ticket",
            flights,
        });
    })
}

function addTicket(req, res) {
    console.log('am i going ticketo')
    console.log(req.body)
    Flight.findById(req.body, function(err, flights) {
        console.log(flights)
        res.render('tickets/newFromFlight', {
            title: "Add Ticket",
            flights

        });
    })
}