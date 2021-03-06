const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uniqueId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users',userSchema)