const usersModel = require("./../../../db/models/user");

const createNewUser = (req, res) => {
  const {
    fullName,
    email,
    password,
    age,
    address,
    bloodType,
    location,
    image,
    phoneNumber,
  } = req.body;

  const user = new usersModel({
    fullName,
    email,
    password,
    age,
    address,
    bloodType,
    location,
    image:
      "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg",
    phoneNumber,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.send(err);
    });
};
const updateUser = async (req, res) => {
  const { fullName, email, address, phoneNumber, bloodType, image, _id } =
    req.body;
  usersModel
    .findOneAndUpdate(
      { _id: _id },
      {
        fullName: fullName,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        image: image,
        bloodType: bloodType,
      },
      { new: true }
    )
    .then((result) => {
      res.json("update done");
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  createNewUser,
  updateUser,
};
