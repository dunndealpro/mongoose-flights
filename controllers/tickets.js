const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    // addToFlight
};


function create(req, res) {
    const newTicket = new Ticket(req.body)
        // const seat = req.body.seat;
        // req.body.seat = seat
    console.log('seat')
    console.log(newTicket)

    newTicket.save(function(err) {
            if (err) return res.redirect('/tickets/new')
            console.log('newticket')
            console.log(newTicket);
            res.redirect('/flights')
        })
        // addToFlight(req, res)
}

// addToFlight(req, res)



function newTicket(req, res) {
    console.log('am i going nutso')
    Flight.find({}, function(err, flights) {

        res.render('tickets/new', {
            title: "Add Ticket",
            flights,

        });
    })
}