const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String
            // enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
    },

    arrival: {
        type: Date
    },
}, {
    timestamps: true

})

const flightSchema = new Schema({
        airline: {
            type: String,
            // enum: ['American', 'Southwest', 'United']
        },

        airport: {
            type: String,
            // enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
        },

        flightNo: {
            type: Number,
            required: true,
            min: 10,
            max: 9999,
        },

        departs: {
            type: Date,
            default: function() {
                return new Date()
            },
        },

        textColor: {
            type: String,
            default: 'black'
        },

        destinations: [destinationSchema],

        tickets: [{ type: Schema.Types.ObjectId, ref: 'Flight' }]


        // tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
    }, {
        timestamps: true
    }

)

//Compile the schema into a model and export it
module.exports = mongoose.model('Flight', flightSchema)