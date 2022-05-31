const { use } = require("../app");
const Process = require("../models/process");
const User = require("../models/user");
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

  const { id } = req.params;
  temp= await sec.activeId(id)
  if (temp!=null){
    let user = await User.findById(temp.iduser)
    console.log(temp.iduser)
    const process = await Process.find();
    var list=[]
    if (user.idprocesses==null){
       list=[]
    }else{
      list = user.idprocesses;
    }
    var a = [];
    for (var i = 0; i < list.length; i++) {
      var b = process.find((x) => { if (list[i] == x.id) { return x } })
      if (b?.idpatient){
        b.idpatient=null;
      }
      if (b?.idpsichologist){
        b.idpsichologist=null;
      }
      a.push(b)
    }
  }
  else{
    a={
      code:001,
      err:"No es un usuario activo"
    }
  }
  res.json(a);
}

processCtrl.myname= async (req, res, next) => {
  const id = req.params['id'];
  const temporal = req.params['temp'];
  const process = await Process.findById(id);
  var user = await sec.activeId(temporal);
  console.log(user)
  console.log(process)
  if (user != null) {
    
    if (process.idpatient==user.iduser){
      process.namepatient=user.name;
    }
  }
  await Process.findByIdAndUpdate(id,process, {new: true});
  res.json("Si");
}

module.exports = processCtrl;