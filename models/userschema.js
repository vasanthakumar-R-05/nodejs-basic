const mongoose = require('mongoose')



const userDetailsSchema = new mongoose.Schema({
    emailID: {
        type: String
    },
    password: {
        type: String
    },
    user_name: {
        type: String
    }
}, {versionKey: false})

const User = mongoose.model('UserDetails', userDetailsSchema)

module.exports = { User }