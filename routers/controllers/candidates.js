const express = require("express");
const Candidate = require("./../../db/models/candidates");
const Request = require("./../../db/models/requests");
const User = require("./../../db/models/user");

const getConfirmedCandidates = async (req, res) => {
  const { reqId, userId } = req.body;

  const filter = { reqId };
  await Candidate.findOne(filter)
    .then((result) => {
      const users = result.users;
      const user = users.filter((element) => {
        if (element.userId == userId) {
          return element;
        }
      });
      user[0].confirmedStatus = true;
      Candidate.findOneAndUpdate(
        filter,
        { users: [...users] },
        { new: true }
      ).then((result) => {
        res.json(result);
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

//to get the info of candidates who confirmed A specific request on the requester page
const getRequestCandidates = async (req, res) => {
    const reqId = req.body.reqId;
    let confCands;
    //get the users who confirmed from the candidates.users Object
    await Candidate.findOne({ reqId })
      .then((result) => {
        confCands = result.users.filter((element) => {
          if (element.confirmedStatus == true) {
            return element;
          }
        });
      })
      .catch((err) => {
        res.send(err);
      });
    let confCandsIds = [];
    confCands.forEach((element) => {
      confCandsIds.push(element.userId);
    });
  
    User.find(
      { $or: [{ _id: [...confCandsIds] }] },
      "fullName bloodType phoneNumber -_id"
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  };
  
  
  module.exports = { getConfirmedCandidates, getRequestCandidates };
  
