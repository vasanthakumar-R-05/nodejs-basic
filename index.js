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
 * git push:::::::::::::::::::::::
step 1:create a repository in git
step 2: install git base
step 3: copy the repository link
step 4: create a git base file 
          using commad is "git clone repository link"
step 5: add the program files into  the git base file
step 6:click the file path bar and open "cmd"
step 7:type cmd code is "code ."
step 8:then it open the vs code 
step 9: open git terminal type
{
1.git add .
2.git commit -m "update operation name"
3.git push 
}
 */

/**
 * Database - Expense Trackergit
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
        const port=process.env.PORT || 10000
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

// app.post('/add-user', async function(request, response) {
//     try {
//         await User.create({
//             "emailID": request.body.email,
//             "password": request.body.password,
//             "user_name": request.body.name
//         })
//         response.status(201).json({
//             "status" : "success",
//             "message" : "entry successfully added"
//         })
//     } catch(error) {
//         response.status(500).json({
//             "status" : "failure",
//             "message" : "entry not created",
//             "error" : error
//         })
//     }
// })


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
app.post('/add-user',async function(req,res){
    try{
        const user=await User.find({"email":req.body.email});
        if(user.length===0)
        {
            User.create({
             "email":req.body.email,
            "password":req.body.pass,
            "username":req.body.uname
            })
            res.status(200).json({
            "status":"success",
            "message":"new user created"
            })
        }
        else{
            res.status(409).json({
                "status":"fail",
                "message":"y mail already exisi"
            })
        }
    }
    catch(error){
        res.status(500).json({
            "status":"fail",
            "message":"user not created",
            "error":error
        })
    }
})
app.post('/valid-user',async function(req,res){
    try{
        const user=await User.find({"email":req.body.email,"password":req.body.pass});
        if(user.length===0)
        {
           
            res.status(401).json({
            "status":"fail",
            "message":"create a new user"
            })
        }
        else{
            res.status(200).json({
                "status":"success",
                "message":"user exisit"
            })
        }
    }
    catch(error){
        res.status(500).json({
            "status":"fail",
            "message":"authentication failed",
            "error":error
        })
    }
})