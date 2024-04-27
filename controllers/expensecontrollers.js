
const {Expense} = require('../models/expenseschema.js')
async function addNewExpense(request, response) {
    try {
  
      await Expense.create({
        amount: request.body.amount,
        category: request.body.category,
        date: request.body.date,
        userID:request.params.userID
      });
      response.status(201).json({
        "status": "success",
        "message": "entry successfully added"
      });
    } catch (error) {
      response.status(500).json({
        "status": "failure",
        "message": "entry not created",
        "error": error,
      });
    }
}

async function getExpense(req, res) {
    try {
      const expense = await Expense.find({"userID":req.params.userID});
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({
        "status": "fail",
        "message": "not retrive",
        "error": error,
      });
    }
}

async function deleteExpense(req, res) {
    // try {
    //   const expense =await Expense.findByIdAndDelete(req.params.id);
    //   res.status(200).json({
        
    //     "status": "success",
    //     "message": "entry deletes",
    //   });
    // } catch (error) {
    //   res.status(500).json({
    //     "status": "fail",
    //     "error": error,
    //   });
    // }
    try {
      const expense = await Expense.findByIdAndDelete(req.params.id);
      if (!expense) {
          return res.status(404).json({
              status: "fail",
              message: "Expense not found"
          });
      }
      res.status(200).json({
          status: "success",
          message: "Entry deleted",
          data: null // You might choose to send the deleted expense data here if needed
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          status: "fail",
          error: "Internal Server Error"
      });
  }
}

async function updateExpense(req, res) {
    try {
      await Expense.findByIdAndUpdate(req.params.id,{
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date,
        userID: req.body.userID
      });
      res.status(200).json({
        "status": "pass",
        "message": "updated successfull",
      });
    } catch (error) {
      res.status(500).json({
        "status": "fail",
        "error": error,
      });
    }
}

module.exports = { addNewExpense, getExpense, deleteExpense, updateExpense }