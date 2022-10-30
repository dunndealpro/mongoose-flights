const Flight = require('../models/flight');

module.exports = {
    new: newFlight,
    create,
    index,
};

function newFlight(req, res) {
    // res.render('flights/new');
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    console.log('dt')
    console.log(dt)
        // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()+1}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    console.log('depart date: ', departsDate)
    res.render('flights/new', { departsDate });
    // res.render('flights/new');

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
        // res.render('flights/index');
        res.render('flights/index', { flights });
    });
}