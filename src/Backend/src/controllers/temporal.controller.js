const Temporal = require("../models/temporal");

const temporalCtrl = {};

temporalCtrl.getTemporals = async (req, res, next) => {
  const temporals = await Temporal.find();
  res.json(temporals);
};

temporalCtrl.createTemporal = async (req, res, next) => {
  const temporal = new Temporal({
    name: req.body. name,
    email: req.body.email ,
    type: req.body.type,
    status: req.body.status,
    iduser:req.body.iduser
  });
  await temporal.save();
  res.json({ status: "Temporal created" });
};

temporalCtrl.getTemporal = async (req, res, next) => {
  const { id } = req.params;
  const temporal = await Temporal.findById(id);
  res.json(temporal);
};

temporalCtrl.editTemporal = async (req, res, next) => {
  const { id } = req.params;
  await Temporal.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Temporal Updated" });
};

temporalCtrl.deleteTemporal = async (req, res, next) => {
  await Temporal.findByIdAndRemove(req.params.id);
  res.json({ status: "Temporal Deleted" });
};

temporalCtrl.confirm = async (req, res, next) => {
  const temporals = await Temporal.find();
  var us= temporals;

  const temporal = new Temporal({
    email: req.body.email ,
    password: req.body.password,
  });

  var x =us.find(element=> element.email == temporal.email &&  element.password == temporal.password)

  res.json(x);
};

module.exports = temporalCtrl;