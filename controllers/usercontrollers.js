const {User} = require('../models/userschema')
const jwt = require('jsonwebtoken')
const secretKey = 'hello'
function generateToken(userDetails) {
    return jwt.sign(userDetails, secretKey)
}
async function  createUser(req, res) {
  try {
      console.log(req.body.email );
      
      const user = await User.find({ emailID: req.body.email });
      if (user.length === 0) {
        const user = await User.create({
          emailID: req.body.email,
          password: req.body.pass,  
          user_name: req.body.uname
        });
        const userDetails = {
          userName: user.userName,
          emailId: user.emailID,
          userID: user._id.toString(),
        };
        const accessToken = generateToken(userDetails);
        res.status(201).json({
          "status": "success",
          "message": "new user created",
          "accesstoken": accessToken,
          "user":userDetails
        });
      } else {
        res.status(409).json({
          "status": "fail",
         " message": "y mail already exisi",
        });
      }
    } catch (error) {
      res.status(500).json({
        "status": "fail",
        "message": "user not created",
        "error": error,
      });
    }
  }

  async function validateUser(req, res) {
    try {
      const user = await User.find({
        emailID: req.body.email,
        password: req.body.pass,
      });
      if (user.length === 0) {
        res.status(401).json({
          "status": "fail",
          "message": "create a new user",
        });
      } else {
        const userDetails = {
          userName: user[0].userName,
          emailId: user[0].emailID,
          userID: user[0]._id.toString(),
        };
        const accessToken = generateToken(userDetails);
        res.status(200).json({
          "status": "success",
          "message": "user exisit",
          "accesstoken": accessToken,
          "user":userDetails
        });
      }
    } catch (error) {
      res.status(500).json({
        "status": "fail",
        "message": "authentication failed",
        "error": error,
      });
    }
  }

  module.exports = { createUser, validateUser }