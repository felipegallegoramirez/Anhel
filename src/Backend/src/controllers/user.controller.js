const User = require("../models/user");
const Temporal = require("../models/temporal");

const userCtrl = {};

userCtrl.getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

userCtrl.createUser = async (req, res, next) => {
  const user = new User({
    name: req.body. name,
    phonenumber: req.body.phonenumber ,
    email: req.body.email ,
    password: req.body.password,
    strikes: req.body.strikes,
    type: req.body.type,
    status: req.body.status,
    idprocesses: req.body.idprocesses,
    idsession: req.body.idsession,
    idpublications: req.body.idpublications,
  });
  await user.save();
  res.json({ status: "User created" });
};

userCtrl.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

userCtrl.editUser = async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "User Updated" });
};

userCtrl.deleteUser = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ status: "User Deleted" });
};

userCtrl.confirm = async (req, res, next) => {
  const users = await User.find();
  var us= users;

  const user = new User({
    email: req.body.email ,
    password: req.body.password,
  });

  var x =us.find(element=> element.email == user.email &&  element.password == user.password)

  const temporal = new Temporal({
    name: x.name,
    email: x.email ,
    type: x.type,
    status: x.status,
    iduser:x._id
  });
  await temporal.save();
  res.json(temporal);
};

module.exports = userCtrl;