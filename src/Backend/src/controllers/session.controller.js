const Session = require("../models/session");
const Process = require("../models/process");
const User = require("../models/user");
const sec = require("./sec.controller");
const sessionCtrl = {};

sessionCtrl.getSessions = async (req, res, next) => {
  const sessions = await Session.find();
  var r=[]
  for(var i =0; i<sessions.length;i++){
  var b={
    _id:sessions[i]._id,
    start:sessions[i].start,
    end:sessions[i].end,
    price:sessions[i].price,
    namepsichologist:sessions[i].namepsichologist,
  }
  r.push(b)
  }
  res.json(r);
};

sessionCtrl.createSession = async (req, res, next) => {
  var id = await sec.activeId(req.params['id']);
  if (id != null) {
    if (await sec.isPsychologistID(req.params['id'])) {
      var session = new Session({
        idprocess: req.body.idprocess,
        idpsichologist: id.iduser,
        start: req.body.start,
        end: req.body.end,
        price: req.body.price,
        chat: req.body.chat,
        namepsichologist: id.name
      });
      session=await session.save();
      var us = await User.findById(id.iduser)
      us.idsession.push(session._id)
      await User.findByIdAndUpdate(id.iduser, us, { new: true });
      res.json({ status: "Session created" });
    }else{
      res.json({ status: "Error" });
    }
  }

};
/*
sessionCtrl.createSession = async (req, res, next) => {
  const session = new Session({
    idprocess: req.body.idprocess,
    idpatient: req.body.idpatient,
    idpsichologist: req.body.idpsichologist,
    start: req.body.start,
    end: req.body.end,
    price: req.body.price,
    chat: req.body.chat
  });
  await session.save();
  res.json({ status: "Session created" });
};*/

sessionCtrl.getSession = async (req, res, next) => {
  const { id } = req.params;
  const session = await Session.findById(id);
  var result = session.filter(a=> a.state!="u")
  res.json(result);
};

sessionCtrl.editSession = async (req, res, next) => {
  const { id } = req.params;
  await Session.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  res.json({ status: "Session Updated" });
};

sessionCtrl.deleteSession = async (req, res, next) => {
  await Session.findByIdAndRemove(req.params.id);
  res.json({ status: "Session Deleted" });
};


sessionCtrl.addmensaje = async (a, b) => {
  const session = await Session.findById(a);
  session.chat.push(b)
  await Session.findByIdAndUpdate(id, { chat: session.chat }, { new: true });

}

sessionCtrl.mySessions = async (req, res, next) => {
  const { id } = req.params;
  temp= await sec.activeId(id)
  console.log(temp)
  if (temp!=null){
    let user = await User.findById(temp.iduser)

    const sesion = await Session.find();
    if (user.idsession==null){
      list=[]
   }else{
     list = user.idsession;
   }
   console.log(list)
    var a = [];
    for (var i = 0; i < list.length; i++) {
      var b = sesion.find((x) => { if (list[i] == x.id) { return x } })
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

sessionCtrl.joinsession = async (req, res, next) => {
  const id = req.params['id'];
  const temporal = req.params['temp'];
  var user = await sec.activeId(temporal);
  if (user != null) {
    var session = await Session.findById(id);
    const process = await Process.find();
    var us = await User.findById(user.iduser);
    var us2 = await User.findById(session.idpsichologist);
    session.idpatient = user.iduser;
    var b = process.find((x) => { if (x.idpatient == session.idpatient && x.idpsichologist == session.idpsichologist) { return x } })
    if (b == null) {
      const process = new Process({
        idpatient: session.idpatient,
        idpsichologist: session.idpsichologist,
        count: 0,
        namepatient:session.idpatient,
        namepsichologist:us2.name,
      });
      b = await process.save();
    }


    if (us.idsession.find((x) => { if (x == session._id) { return x } }) == null) {
      us.idsession.push(session._id)
      await Process.findByIdAndUpdate(b._id, { count: b.count + 1 }, { new: true });
    }
    if (us.idprocesses.find((x) => { if (x == b._id) { return x } }) == null) {
      us.idprocesses.push(b._id)
    }
    session.idprocess = b._id;
    session.state="u"
    if (us2.idprocesses.find((x) => { if (x == b._id) { return x } }) == null) {
      us2.idprocesses.push(b._id)
    }
    await User.findByIdAndUpdate(session.idpsichologist, us2, { new: true });
    await User.findByIdAndUpdate(user.iduser, us, { new: true });
    await Session.findByIdAndUpdate(id, session, { new: true });
    res.json({ status: "Todo piola pa" })
  } else { res.json({ status: "No" }) }

}

module.exports = sessionCtrl;