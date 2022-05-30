const Process = require("../models/process");
const sec = require("./sec.controller");

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

processCtrl.myProcess= async (req, res, next) => {
  const process = await Process.find();
  const list = req.body.process;
  var a = [];
  for (var i = 0; i < list.length; i++) {
    var b = process.find((x) => { if (list[i] == x.id) { return x } })
    b.idpatient=null;
    b.idpsichologist=null;
    a.push(b)
  }
  res.json(a);
}

processCtrl.myname= async (req, res, next) => {
  const id = req.params['id'];
  const temporal = req.params['temp'];
  const process = await Process.findById(id);
  var user = await sec.activeId(temporal);
  if (user != null) {
    if (process.idpatient==temporal.iduser){
      process.namepatient=user.name;
    }
  }
  await Process.findByIdAndUpdate(id,process, {new: true});
  res.json("Si");
}

module.exports = processCtrl;