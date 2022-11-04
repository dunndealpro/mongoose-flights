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
        console.log('Flight id:  ', flight._id) //check to see Flight.findById is working
        Ticket.find({}, function(err, tickets) {
            console.log('Ticket.find check: ', tickets) // check to see if Ticket.find is working

            const dt = flight.departs;
            let arrivesDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            arrivesDate += `-${(dt.getDate()+1).toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;

            res.render('flights/show', { title: 'Flight Detail', flight, arrivesDate, tickets, });

            console.log('huh', tickets)
        })
    });
}

// function show(req, res) {
//     Flight.findById(req.params.id)
//         .populate('tickets').exec(function(err, flight) {
//             // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
//             // Native MongoDB approach 
//             Ticket.find({ _id: { $nin: flight.tickets } },
//                 function(err, tickets) {
//                     const dt = flight.departs;

//                     let arrivesDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
//                     arrivesDate += `-${(dt.getDate()+1).toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
//                     res.render('flights/show', { title: 'Flight Detail', flight, arrivesDate, tickets });
//                     console.log('huh', tickets)
//                 }
//             );
//         });
// }


function deleteFlight(req, res) {
    flight.deleteOne(req.params.id)
    res.redirect('/flights/index')
}

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
    res.render('flights/new', { title: 'Add Flight', departsDate });
    // res.render('flights/new');

}

function create(req, res) {
    req.body.airline = req.body.airline;
    const flight = new Flight(req.body);

    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        console.log('Created:  ', flight);
        res.redirect(`/flights/${flight._id}`);
    })
}

function index(req, res) {
    todayDate = new Date()

    Flight.find({}, function(err, flights) {
        if (err) return res.redirect('/');
        // res.render('flights/index');
        res.render('flights/index', { title: 'All Flights', flights });
        // console.log(flights)
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
            flights.forEach(function(f) {
                Flight.updateOne({ _id: f._id }, { $set: { textColor: 'red', } })
                console.log(f._id)
                console.log(f.textColor)
            })
            console.log(flights);
        })
}

// function findOldFlights(req, res) {
//     todayDate = new Date()
//     Flight.find({
//             departs: {
//                 $lt: todayDate
//             }
//         },
//         console.log(flights)
//     }
// }


// function findOldFlights(req, res) {
//     todayDate = new Date()
//     Flight.find({
//         departs: {
//             $lt: todayDate
//         }
//     }, function(err, expireColor) {
//         console.log("rerd")
//         this.textColor = 'red'

//     })
// }