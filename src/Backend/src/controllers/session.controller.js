const Session = require("../models/session");

const sessionCtrl = {};

sessionCtrl.getSessions = async (req, res, next) => {
  const sessions = await Session.find();
  res.json(sessions);
};

sessionCtrl.createSession = async (req, res, next) => {
  const session = new Session({
    idprocess:req.body.idprocess,
    idpatient:req.body.idpatient,
    idpsichologist:req.body.idpsichologist,
    start:req.body.start,
    end:req.body.end,
    price:req.body.price,
    chat:req.body.chat
  });
  await session.save();
  res.json({ status: "Session created" });
};

sessionCtrl.getSession = async (req, res, next) => {
  const { id } = req.params;
  const session = await Session.findById(id);
  res.json(session);
};

sessionCtrl.editSession = async (req, res, next) => {
  const { id } = req.params;
  await Session.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "Session Updated" });
};

sessionCtrl.deleteSession = async (req, res, next) => {
  await Session.findByIdAndRemove(req.params.id);
  res.json({ status: "Session Deleted" });
};

module.exports = sessionCtrl;