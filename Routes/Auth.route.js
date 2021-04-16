const express = require("express");
const router = express.Router();
const createError = require('http-errors')
const User = require('../Models/User.model')
const {authSchema} = require('../helpers/validation_schema')
const { singAccessToken } = require('../helpers/jwt_helper')

router.post("/register", async (req, res, next) => {
  console.log(req.body)
  try {
    // const { email, password} = req.body
    // if(!email || !password) throw createError.BadRequest()
    const result = await authSchema.validateAsync(req.body)
    console.log(result)


    const doesExist = await User.findOne({email:result.email})
    if(doesExist) throw createError.Conflict(`${result.email} is alreay been register`)

    const user = new User(result)
    const  saveUser = await user.save()
    const accessToken = await singAccessToken(saveUser.id)
    res.send(accessToken)

    res.send(saveUser)
  } catch (error) {
    if(error.isJoi === true) error.status = 422
    next(error)
  }
});

router.post("/login", async (req, res, next) => {
  res.send("login route");
});

router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh-token route");
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

module.exports = router;