const express = require("express");
const Request = require("./../../db/models/requests");
const Hospital = require("./../../db/models/hospitals");
const User = require("./../../db/models/user");
const Candidate = require("./../../db/models/candidates");

const getUserRequests = async (req, res) => {
  const userId = req.body.userId;
  try {
    const arrOfRequests = await Request.find({ userId }).populate(
      "hospitalId",
      "name -_id"
    );
    res.status(200).json(arrOfRequests);
  } catch (err) {
    throw err;
  }
};

const updateUserRequests = async (req, res) => {
  const { reqId, hospital, bloodType } = req.body;

  Request.findOneAndUpdate(
    { _id: reqId },
    { bloodType: bloodType, hospital: hospital },
    { new: true }
  )
    .then((result1) => {
      res.json("update done");
    })
    .catch((err) => {
      res.json(err);
    });
};

const deleteUserRequests = async (req, res) => {
  const reqId = req.body.reqId;

  Request.deleteOne({ _id: reqId })
    .then((result1) => {
      res.json({
        success: true,
        message: `Success Delete request with id => ${reqId}`,
      });
    })
    .catch((err) => {
      res.status(404);
      res.json("request not found");
    });
};

const getMatchedRequests = (req, res) => {
  let cond;
  const id = req.body.id;
  const bloodType = req.body.bloodType;
  console.log(id);

  if (bloodType == "O-") {
    cond = {
      $or: [
        { bloodType: "A+" },
        { bloodType: "AB+" },
        { bloodType: "A-" },
        { bloodType: "AB-" },
        { bloodType: "B+" },
        { bloodType: "B-" },
        { bloodType: "O-" },
        { bloodType: "O+" },
      ],
    };
  } else if (bloodType == "O+") {
    cond = {
      $or: [
        { bloodType: "A+" },
        { bloodType: "AB+" },
        { bloodType: "B+" },
        { bloodType: "O+" },
      ],
    };
  } else if (bloodType == "A+") {
    cond = { $or: [{ bloodType: "A+" }, { bloodType: "AB+" }] };
  } else if (bloodType == "A-") {
    cond = {
      $or: [
        { bloodType: "A+" },
        { bloodType: "AB+" },
        { bloodType: "A-" },
        { bloodType: "AB-" },
      ],
    };
  } else if (bloodType == "B+") {
    cond = { $or: [{ bloodType: "B+" }, { bloodType: "AB+" }] };
  } else if (bloodType == "B-") {
    cond = {
      $or: [
        { bloodType: "B+" },
        { bloodType: "AB+" },
        { bloodType: "B-" },
        { bloodType: "AB-" },
      ],
    };
  } else if (bloodType == "AB+") {
    cond = { $or: [{ bloodType: "AB+" }] };
  } else if (bloodType == "AB-") {
    cond = { $or: [{ bloodType: "AB-" }, { bloodType: "AB+" }] };
  }

  Request.find(cond)
    .populate("userId", "fullName _id")
    .populate("hospitalId", "-_id")
    .then((result) => {
      Candidate.find({}).then((ree) => {
        let cands = ree.filter((cand) => {
          let a = cand.users.filter((user) => {
            return !user.confirmedStatus && user.userId == id;
          });
          return a.length > 0;
        });

        if(cands.length <= 0){
          res.json([])
          return
        }
        
        cands = cands.map((c) => {
          return c.reqId;
        });
        // console.log(cands);
        // console.log(result);

        result = result.filter((elem) => {

          let f =false
          // console.log(cands.includes(elem._id),cands[0].equals(elem._id));
          cands.forEach(element => {
            if(element.equals(elem._id)) {
              f =true;
              return
            }
          });
          return f
        });
        res.json(result);
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

const createRequest = async (req, res, next) => {
  let requestStatus = true;

  const { userId, bloodType, hospital } = req.body;

  const hospitalId = await Hospital.findOne({ name: hospital })
    .then((result) => {
      return result._id;
    })
    .catch((err) => {
      res.send(err);
    });

  //use list value as hospitalId
  let cond;
  if (bloodType == "A+") {
    cond = {
      $or: [
        { bloodType: "A+" },
        { bloodType: "A-" },
        { bloodType: "O-" },
        { bloodType: "O+" },
      ],
    };
  } else if (bloodType == "O+") {
    cond = { $or: [{ bloodType: "O-" }, { bloodType: "O+" }] };
  } else if (bloodType == "B+") {
    cond = {
      $or: [
        { bloodType: "B+" },
        { bloodType: "B-" },
        { bloodType: "O+" },
        { bloodType: "O-" },
      ],
    };
  } else if (bloodType == "AB+") {
    cond = {
      $or: [
        { bloodType: "A+" },
        { bloodType: "AB+" },
        { bloodType: "A-" },
        { bloodType: "AB-" },
        { bloodType: "B+" },
        { bloodType: "B-" },
        { bloodType: "O-" },
        { bloodType: "O+" },
      ],
    };
  } else if (bloodType == "A-") {
    cond = { $or: [{ bloodType: "A-" }, { bloodType: "O-" }] };
  } else if (bloodType == "O-") {
    cond = { bloodType: "O-" };
  } else if (bloodType == "B-") {
    cond = { $or: [{ bloodType: "B-" }, { bloodType: "O-" }] };
  } else if (bloodType == "AB-") {
    cond = {
      $or: [
        { bloodType: "AB-" },
        { bloodType: "A-" },
        { bloodType: "B-" },
        { bloodType: "O-" },
      ],
    };
  }

  const candidatesUsers = await User.find(cond)
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.send(err);
    });

  const candidatesArray = candidatesUsers.map((element) => {
    return { userId: element._id, confirmedStatus: false };
  });
  console.log(candidatesArray);
  const request = new Request({ userId, bloodType, hospitalId, requestStatus });

  const newRequest = await request
    .save()
    .then((result) => {
      res.json(result);
      return result;
    })
    .catch((err) => {
      res.send(err);
    });

  const candidates = await new Candidate({
    reqId: newRequest._id,
    users: candidatesArray,
  });

  const newCandidates = await candidates
    .save()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      res.send(err);
    });
  console.log(newCandidates);
};

module.exports = {
  createRequest,
  getMatchedRequests,
  getUserRequests,
  updateUserRequests,
  deleteUserRequests,
};
