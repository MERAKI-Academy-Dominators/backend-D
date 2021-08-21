const express = require("express");
const {createRequest , getMatchedRequests, getUserRequests , updateUserRequests , deleteUserRequests } = require("./../controllers/requests")


const requestRouter = express.Router()

requestRouter.post("/create" , createRequest )
requestRouter.post("/matched" , getMatchedRequests )
requestRouter.post("/myRequests" , getUserRequests )
requestRouter.put("/update" , updateUserRequests )
requestRouter.delete("/delete" , deleteUserRequests )



module.exports= requestRouter