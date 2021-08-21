const express = require("express");
const {login, loginEmail } = require("./../../controllers/auth/login")

const loginRouter = express.Router()

loginRouter.post("/" , login )
loginRouter.post("/email" , loginEmail )


module.exports=loginRouter
