/**
 * Functionalities of the application
 * End points
 * Express application
 * DB connection
 * Schema definition and creating a model
 */

/**
 * CRUD operations
 * adding a new expense -> /add-expense (post)
 * view existing ones -> /get-expenses (get)
 * edit existing entries -> /update-expense (patch)
 * deleting entries -> /delete-expense (delete)
 * 
 * adding a new user
 * validating existing user
 * 
 * monthly analysis
 */

/**
 * Database - Expense Tracker
 * Collections
 *      i) ExpenseDetails
 *          - amount (number)
 *          - category (string)
 *          - date (string)
 *      ii) UserDetails
 *          - username
 *          - emailID
 *          - password
 */

const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors=require('cors')
const { Expense, User } = require('./schema.js')

const app = express()
app.use(bodyParser.json())
 app.use(cors());
async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://vasanth_node:vasanthakumar@cluster0.zoimsbd.mongodb.net/demo?retryWrites=true&w=majority&appName=Cluster0')
        console.log("DB connection established :)")
        const port=process.env.PORT || 8000
        app.listen(port, function() {
            console.log(`Listening on ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish DB connection :(')
    }
}
connectToDb()

app.post('/add-expense', async function(request, response) {
    try {
        await Expense.create({
            "amount": request.body.amount,
            "category": request.body.category,
            "date": request.body.date
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry successfully added"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})

app.post('/add-user', async function(request, response) {
    try {
        await User.create({
            "emailID": request.body.email,
            "password": request.body.password,
            "user_name": request.body.name
        })
        response.status(201).json({
            "status" : "success",
            "message" : "entry successfully added"
        })
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : error
        })
    }
})


app.get('/get-items',async function(req,res){
    try{
        const expense=await Expense.find();
        res.status(200).json(expense);
    }catch(error){
        res.status(500).json({
            "statu":"fail",
            "message":"not retrive",
            "error":error
        })
    }
})
app.get('/get-user',async function(req,res){
        const user=await User.find();
        res.status(200).json(user);
})
app.delete('/delete-expense/:id',async function(req,res){
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            "status":"success",
            "message":"entry deletes"
        })
    }catch(error){
        res.status(500).json({
            "status":"fail",
            "error":error
        })
    }
})
app.patch('/update-expense/:id',async function(req,res){
    try{
        await Expense.findByIdAndUpdate(req.params.id ,{
            "amount": req.body.amount,
            "category": req.body.category,
            "date": req.body.date
        })
        res.status(200).json({
            "status":"pass",
            "message":"updated successfull"
        })
    }catch(error){
        res.status(500).json({
            "status":"fail",
            "error":error
        })
    }
})