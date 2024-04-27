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

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const expenseRoutes = require('./routes/expenseroutes.js')
const userRoutes = require('./routes/userroutes.js')
require('dotenv').config({path:'config.env'})
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/expense', expenseRoutes)
app.use('/user', userRoutes)

async function connectToDb() {
  try {
    await mongoose.connect(
      process.env.DB
    );
    console.log("DB connection established :)");
    const port = process.env.PORT || 20000;
    app.listen(port, function () {
      console.log(`Listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
    console.log("Couldn't establish DB connection :(");
  }
}
connectToDb();