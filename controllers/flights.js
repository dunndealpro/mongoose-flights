const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    delete: deleteFlight,
    findOldFlights,
    show,
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: flight._id }, function(err, tickets) {
            const dt = flight.departs;
            let arrivesDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            arrivesDate += `-${(dt.getDate()+1).toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
            res.render('flights/show', { title: 'Flight Detail', flight, arrivesDate, tickets, });
        })
    }).sort({ "flight.destinations.arrival": 1 })
}

function deleteFlight(req, res) {
    flight.deleteOne(req.params.id)
    res.redirect('/flights/index')
}

function newFlight(req, res) {
    const newFlight = new Flight();
    const dt = newFlight.departs;
    let departsDate = `${dt.getFullYear()+1}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    findOldFlights()
    res.render('flights/new', { title: 'Add Flight', departsDate });
}

function create(req, res) {
    req.body.airline = req.body.airline;
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        res.redirect(`/flights/${flight._id}`);
    })
    findOldFlights()
}

function index(req, res) {
    todayDate = new Date()
    Flight.find({}, function(err, flights) {
        if (err) return res.redirect('/');
        res.render('flights/index', { title: 'All Flights', flights });
    }).sort({ "departs": 1 });
    findOldFlights()
}

function findOldFlights(req, res) {
    todayDate = new Date
    Flight.find({
            departs: {
                $lt: todayDate
            }
        },
        function(err, flights) {
            if (err) return res.redirect('/');
            console.log('Old flights', flights)
            flights.forEach(function(f) {
                // Flight.updateOne({ _id: f._id }, { $set: { "textColor": 'red', } })
                f.textColor = 'red'
                f.save()
                console.log('oldflight', f._id)
                console.log(f.textColor)
            })
            console.log(flights);
        })
}