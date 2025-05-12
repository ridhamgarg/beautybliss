const mongoose = require('mongoose');
const contactusSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const Contactus = mongoose.model('contactus', contactusSchema);

module.exports = Contactus;