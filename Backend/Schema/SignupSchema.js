const mongoose = require('mongoose');

const signupSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
    }
})

module.exports = mongoose.model('signups',signupSchema)