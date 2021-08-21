const express = require("express");
const { getConfirmedCandidates, getRequestCandidates } = require("./../controllers/candidates");

const CandidatesRouter = express.Router()

CandidatesRouter.post("/getconfirmed" , getConfirmedCandidates );
CandidatesRouter.post("/getrequestcandidates" , getRequestCandidates);

module.exports= CandidatesRouter