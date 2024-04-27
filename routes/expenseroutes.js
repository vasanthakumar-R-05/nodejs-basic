const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const { addNewExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expensecontrollers')
const securitykey="hello"
function authenticateToken(request, response, next) {
    const authHeader = request.headers.authorization
    const accessToken = authHeader && authHeader.split(' ')[1]
    if(accessToken) {
        jwt.verify(accessToken, securitykey, (error, userDetails) => {
            if(error) {
                response.status(403).json({
                    "status": "failure",
                    "message": "access denied"
                })
            } else {
                next()
            }
        })
    } else {
        response.status(401).json({
            "status": "failure",
            "message": "access denied"
        })
    }
  }
router.post("/new/:userID",authenticateToken,addNewExpense );
router.get("/all/:userID", authenticateToken,getExpense);
router.delete("/delete/:id",authenticateToken,deleteExpense );
router.patch("/update/:id", authenticateToken,updateExpense);
module.exports = router

