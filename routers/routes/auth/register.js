const express = require('express');

const { createNewUser,updateUser } = require('./../../controllers/auth/register');

const registerRouter = express.Router();

registerRouter.post("/register", createNewUser);
registerRouter.put("/updateUser", updateUser);
module.exports = registerRouter;
