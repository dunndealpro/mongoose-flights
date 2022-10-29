const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
};

function newFlight(req, res) {
    res.render('flights/new');
}

function create(req, res) {
    req.body.airline = req.body.airline;
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        console.log(flight);
        res.redirect('/flights/new');
    })
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        if (err) return res.redirect('/');
        res.render('flights/index', { flights });
    });
}