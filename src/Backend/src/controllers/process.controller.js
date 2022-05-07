const Process = require("../models/process");

const processCtrl = {};

processCtrl.getProcesss = async (req, res, next) => {
  const processs = await Process.find();
  res.json(processs);
};

processCtrl.createProcess = async (req, res, next) => {
  const process = new Process({
    idpatient:req.body.idpatient,
    idpsichologist:req.body.idpsichologist,
    count:req.body.start,
  });
  await process.save();
  res.json({ status: "Process created" });
};

processCtrl.getProcess = async (req, res, next) => {
  const { id } = req.params;
  const process = await Process.findById(id);
  res.json(process);
};

processCtrl.editProcess = async (req, res, next) => {
  const { id } = req.params;
  await Process.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Process Updated" });
};

processCtrl.deleteProcess = async (req, res, next) => {
  await Process.findByIdAndRemove(req.params.id);
  res.json({ status: "Process Deleted" });
};

module.exports = processCtrl;