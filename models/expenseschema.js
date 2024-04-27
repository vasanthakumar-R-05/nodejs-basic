const mongoose = require('mongoose')

const expenseDetailsSchema = new mongoose.Schema({
    amount: {
        type: Number
    },
    category: {
        type: String 
    },
    date: {
        type: String
    },
    userID:{
        type: String
    }
}, {versionKey: false})

const Expense = mongoose.model('ExpenseDetails', expenseDetailsSchema)

module.exports = { Expense }